import alertReducer, { AlertActionType, startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Appointment as DB_Appointment } from "waltronics-types";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import useItemsManager from "../../../../features/ItemManager/useItemsManager";
import { DefineRepair, Repair, Repairs } from "@/app/employee/home/update/repair/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import { MasterForm, PART, PAYMENT, REPAIR } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { UpdateAppointmentRepairs } from "@/services/DB/Appointment/UpdateAppointmentRepairs";
import RepairManager from "./repair/RepairManager";
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { Part as DB_AppointmentPart } from "waltronics-types";
import RepairsManager from "./repair/RepairsManager";
import { DefinePart, Part, Parts } from "@/app/employee/home/update/part/_DEF";
import { UpdateAppointmentParts } from "@/services/DB/Appointment/UpdateAppointmentParts";
import PartsManager from "./part/PartsManager";
import PartManager from "./part/PartManager";
import { DefineDiagnosis, Diagnoses, Diagnosis } from "@/app/employee/home/update/diagnosis/_DEF";
import { CONTACT, DIAGNOSIS, NOTE, SERVICE, VEHICLE } from "./_DEF";
import DiagnosisManager from "./diagnosis/DiagnosisManager";
import DiagnosesManager from "./diagnosis/DiagnosesManager";
import { UpdateAppointmentDiagnoses } from "@/services/DB/Appointment/UpdateAppointmentDiagnoses";
import { DefineService, Services } from "@/app/employee/home/update/service/_DEF";
import { UpdateAppointmentServices } from "@/services/DB/Appointment/UpdateAppointmentServices";
import ServiceManager from "./service/ServiceManager";
import ServicesManager from "./service/ServicesManager";
import useServicesManager from "./service/useServicesManager";
import usePaymentsManager from "./payment/usePaymentsManager";
import { DefinePayment, Payments } from "./payment/_DEF";
import { UpdateAppointmentPayments } from "@/services/DB/Appointment/UpdateAppointmentPayments";
import { Cost, CostUpdates } from "@/app/employee/home/update/payment/_DEF";
import { UpdateAppointmentCost } from "@/services/DB/Appointment/UpdateAppointmentCost";
import { toString } from "@/utils/convert";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import PaymentManager from "./payment/PaymentManager";
import PaymentsManager from "./payment/PaymentsManager";
import { buildNoteUpdate, DefineNote } from "@/app/employee/home/update/note/_DEF";
import { Note as DB_AppointmentNote} from "waltronics-types";
import { Note, Notes } from "@/app/employee/home/update/note/_DEF";
import { UpdateEmployeeNotes } from "@/services/DB/Employee/UpdateEmployeeNotes";
import NoteManager from "./note/NoteManager";
import NotesManager from "./note/NotesManager";
import { ContactUpdates } from "@/app/employee/home/update/contact/_DEF";
import { VehicleUpdates } from "@/app/employee/home/update/vehicle/_DEF";
import { UpdateAppointmentContact } from "@/services/DB/Appointment/UpdateAppointmentContact";
import { UpdateAppointmentVehicle } from "@/services/DB/Appointment/UpdateAppointmentVehicle";
import ContactManager from "./contact/ContactManager";
import VehicleManager from "./vehicle/VehicleManager";
import Alert from "@/features/Alert/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import useInterval from "@/features/Alert/useInterval";


interface UpdateManagerProps {
    appointmentID: string;
    appointment: DB_Appointment;
    close: () => void;
}

export interface ItemManagerForm<BaseItem, Item, Items> {
    itemsManagerKey: string;
    itemID: string;
    mutation: "Create"|"Update";
}

export default function UpdateManager<BaseItem, Item, Items>(props: UpdateManagerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateManagerForm = useForm("Update", MasterForm);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);
    const [tab, setTab] = useState(CONTACT);
    const [tabs] = useState([[CONTACT, "General"], [VEHICLE, "Vehicle"], [PAYMENT, "Finances"], [DIAGNOSIS, "Diagnoses"], [PART, "Parts"], [REPAIR, "Repairs"], [SERVICE, "Services"], [NOTE, "Notes"]]);
    const [itemManagerForms, setItemManagerForms] = useState<Array<ItemManagerForm<BaseItem, Item, Items>>>([]);
    const [currentItemManagerForm, setCurrentItemManagerForm] = useState<ItemManagerForm<BaseItem, Item, Items>|null>();
    const [currentItemManagerHeader, setCurrentItemManagerHeader] = useState("");
    const [currentItemManagerCanDelete, setCurrentItemManagerCanDelete] = useState(false);
    const [changesMade, setChangesMade] = useState<{[k: string]: boolean}>({});

    
    useEffect(() => {
        if (searchParams) {
            const tab = searchParams.get("tab") || "";
            setTab(tab || CONTACT);
        }
    }, []);


    useEffect(() => {
        if (!currentItemManagerForm) {
            setCurrentItemManagerHeader("");
            return;
        }

        let item: string = currentItemManagerForm.itemsManagerKey;
        let action: string = currentItemManagerForm.mutation === "Update" ? "Update" : "Create"
        let itemID: string = currentItemManagerForm.itemID;
        itemID = parseInt(itemID) < 0 ? "(New)" : "#" + itemID;
        
        const formTabName = `${action} ${item} ${itemID}`;
        setCurrentItemManagerHeader(formTabName);
        setCurrentItemManagerCanDelete(currentItemManagerForm.mutation === "Update");

    }, [currentItemManagerForm]);


    useInterval(() => {
        // Every second, the alerts will be refreshed,
        // so that older alerts will be removed after
        // a certain amount of time has passed.
        alertDispatch({type: AlertActionType.Refresh});
    }, 1000*1);


    const refreshAppointment = async () => {
        const appointmentID = props.appointmentID;
        const appointment = await SelectAppointment({appointmentID});
        setAppointment(appointment);
    }

    
    const handleTabChange = async (tab: string) => {
        setTab(tab);
        const URL = `/employee/home/update?appointmentID=${props.appointmentID}&tab=${tab}`;
        router.replace(URL);
    }


    const openForm = (itemsManagerKey: string, itemID: string, mutation: "Create"|"Update") => {
        const form: ItemManagerForm<BaseItem, Item, Items> = {itemsManagerKey, itemID, mutation};
        setItemManagerForms([...itemManagerForms, form]);
        setCurrentItemManagerForm(form);
    }


    const closeForm = (itemsManagerKey: string, itemID: string) => {
        const formIndex = itemManagerForms.findIndex(f => f.itemsManagerKey == itemsManagerKey && f.itemID == itemID);
        if (formIndex === -1)
            return;
        
        const updatedFormInfos = [...itemManagerForms];
        updatedFormInfos.splice(formIndex, 1);
        setItemManagerForms(updatedFormInfos);
        
        if (updatedFormInfos.length === 0)
            setCurrentItemManagerForm(null);
        if (updatedFormInfos.length === 1)
            setCurrentItemManagerForm(updatedFormInfos[0]);
        if (updatedFormInfos.length > 1)
            setCurrentItemManagerForm(updatedFormInfos[formIndex-1]);  
    }


    const alertMessage = async (good: boolean) => {
        const key = randomKey();
        if (good) {
            const dispatch = saveTDispatch(key, alertDispatch);
            alertDispatch(dispatch);
            await refreshAppointment();
        }
        else {
            const dispatch = saveFDispatch(key, alertDispatch)
            alertDispatch(dispatch);
        }
    }


    const handleChangesMade = useCallback((itemManagerKey: string, changeMade: boolean) => {
        setChangesMade(changesMade => ({
            ...changesMade,
            [`${itemManagerKey}`]: changeMade
        }))
    }, []);
    

    const saveContactUpdates = async (updates: ContactUpdates) => {
        const output = await UpdateAppointmentContact(props.appointmentID, updates);
        await alertMessage(output);
    }
    

    const saveVehicleUpdates = async (updates: VehicleUpdates) => {
        const output = await UpdateAppointmentVehicle(props.appointmentID, updates);
        await alertMessage(output);
    }
    

    const repairsManager = useItemsManager<DB_AppointmentRepair, Repair, Repairs>({
        item: new DefineRepair(),
        itemList: appointment.Repairs,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: REPAIR,
        saveAuto: false,
        saveUpdates: async (oldItems: Repairs, newItems: Repairs) => {
            const itemID = "RepairID";
            const mutateKeys = ["Repair"];
            const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
            const output = await UpdateAppointmentRepairs(props.appointmentID, updates);
            await alertMessage(output);
        },
        openForm: openForm,
        closeForm: closeForm,
        handleChangesMade
    });


    const partsManager = useItemsManager<DB_AppointmentPart, Part, Parts>({
        item: new DefinePart(),
        itemList: appointment.Parts,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: PART,
        saveAuto: false,
        saveUpdates: async (oldItems: Parts, newItems: Parts) => {
            const itemID = "PartID";
            const mutateKeys = ["PartName", "PartNumber", "Quantity", "UnitCost"];
            const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
            const output = await UpdateAppointmentParts(props.appointmentID, updates);
            await alertMessage(output);
        },
        openForm,
        closeForm,
        handleChangesMade
    });


    const diagnosesManager = useItemsManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>({
        item: new DefineDiagnosis(),
        itemList: appointment.Diagnoses,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: DIAGNOSIS,
        saveAuto: false,
        saveUpdates: async (oldItems: Diagnoses, newItems: Diagnoses) => {
            const itemID = "DiagnosisID";
            const mutateKeys = ["Code", "Message"];
            const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
            const output = await UpdateAppointmentDiagnoses(props.appointmentID, updates);
            await alertMessage(output);
        },
        openForm,
        closeForm,
        handleChangesMade
    });


    const servicesManager = useServicesManager({
        item: new DefineService(),
        itemList: appointment.Services,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: SERVICE,
        saveAuto: false,
        saveUpdates: async (oldItems: Services, newItems: Services) => {
            const itemID = "AppointmentServiceID";
            const deleteKey = "AppointmentServiceID";
            const mutateKeys = ["Service", "Division", "Class"];
            const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, deleteKey);
            const output = await UpdateAppointmentServices(props.appointmentID, updates);
            await alertMessage(output);
        },
        openForm,
        closeForm,
        handleChangesMade
    });


    const paymentsManager = usePaymentsManager({
        item: new DefinePayment(),
        itemList: appointment.Payments,
        cost: toString(appointment.Cost),
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: PAYMENT,
        keyForUpdateManagerForm2: PAYMENT + "-COST",
        saveAuto: false,
        saveUpdates: async (oldItems: Payments, newItems: Payments) => {
            const itemID = "PaymentID";
            const updateKeys = ["Payment"];
            const insertKeys = ["Payment", "Name", "Type", "CCN", "EXP"];
            const updates = buildUpdate(oldItems, newItems, itemID, updateKeys, insertKeys, itemID);
            const output = await UpdateAppointmentPayments(props.appointmentID, updates);
            await alertMessage(output);
        },
        saveCostUpdates: async (oldItem: Cost, newItem: Cost) => {
            const updates = {
                Cost: updatedValue(oldItem.Cost, newItem.Cost)
            } as CostUpdates;
            const output = await UpdateAppointmentCost(props.appointmentID, updates);
            await alertMessage(output);
        },
        openForm,
        closeForm,
        handleChangesMade
    });


    const notesManager = useItemsManager<DB_AppointmentNote, Note, Notes>({
        item: new DefineNote(),
        itemList: appointment.Notes,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: NOTE,
        saveAuto: false,
        saveUpdates: async (oldItems: Notes, newItems: Notes) => {
            const updates = buildNoteUpdate(props.appointmentID, oldItems, newItems);
            const output = await UpdateEmployeeNotes(updates);
            await alertMessage(output);
        },
        openForm,
        closeForm,
        handleChangesMade
    });


    return (
        <div>
            <Alert
                alert={alert}
            />
            {tabs &&
                tabs.map(([tabID, tab], i) => (
                    <div key={i} onClick={() => handleTabChange(tabID)}>
                        {tab}
                        {(changesMade[tabID] && changesMade[tabID]) &&
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        }
                    </div>
                ))
            }
            {itemManagerForms &&
                itemManagerForms.map((form, i) => (
                    <div key={i} onClick={() => setCurrentItemManagerForm(form)}>
                       {form.itemsManagerKey} {form.itemID}
                    </div>
                ))
            }
            {itemManagerForms && currentItemManagerForm &&
                <AnimatePresence>
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        className=""
                    >
                        {currentItemManagerForm.itemsManagerKey === REPAIR &&
                            <RepairManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={repairsManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                        {currentItemManagerForm.itemsManagerKey === PART &&
                            <PartManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={partsManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                        {currentItemManagerForm.itemsManagerKey === DIAGNOSIS &&
                            <DiagnosisManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={diagnosesManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                        {currentItemManagerForm.itemsManagerKey === SERVICE &&
                            <ServiceManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={servicesManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                        {currentItemManagerForm.itemsManagerKey === PAYMENT &&
                            <PaymentManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={paymentsManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                        {currentItemManagerForm.itemsManagerKey === NOTE &&
                            <NoteManager
                                itemID={currentItemManagerForm.itemID}
                                itemsManager={notesManager as any}
                                header={currentItemManagerHeader}
                                canDelete={currentItemManagerCanDelete}
                            />
                        }
                    </motion.div>
                </AnimatePresence>
            }
            <div>
                {tab == CONTACT &&
                    <ContactManager
                        updateManagerForm={updateManagerForm}
                        appointment={appointment}
                        onSaveUpdates={saveContactUpdates}
                        setChangesMade={handleChangesMade}
                    />
                }
                {tab == VEHICLE &&
                    <VehicleManager
                        updateManagerForm={updateManagerForm}
                        appointment={appointment}
                        onSaveUpdates={saveVehicleUpdates}
                        setChangesMade={handleChangesMade}
                    />
                }
                {tab == REPAIR &&
                    <RepairsManager
                        repairsManager={repairsManager}
                    />
                }
                {tab == PART &&
                    <PartsManager
                        partsManager={partsManager}
                    />
                }
                {tab == DIAGNOSIS &&
                    <DiagnosesManager
                        diagnosesManager={diagnosesManager}
                    />
                }
                {tab == SERVICE &&
                    <ServicesManager
                        servicesManager={servicesManager}
                    />
                }
                {tab == PAYMENT &&
                    <PaymentsManager
                        paymentsManager={paymentsManager}
                    />
                }
                {tab == NOTE &&
                    <NotesManager
                        notesManager={notesManager}
                    />
                }
            </div>
        </div>
    )
}