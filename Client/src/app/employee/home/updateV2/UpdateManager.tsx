import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { useEffect, useReducer, useState } from "react";
import { Appointment as DB_Appointment } from "waltronics-types";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import useItemsManager from "./useItemsManager";
import { DefineRepair, Repair, Repairs } from "@/pages/employee/edit/service/repair/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import { MasterForm, PART, PAYMENT, REPAIR, tabs } from "@/pages/employee/edit/_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { UpdateAppointmentRepairs } from "@/services/DB/Appointment/UpdateAppointmentRepairs";
import RepairManager from "./repair/RepairManager";
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { Part as DB_AppointmentPart } from "waltronics-types";
import { Service as DB_AppointmentService } from "waltronics-types";
import RepairsManager from "./repair/RepairsManager";
import { DefinePart, Part, Parts } from "@/pages/employee/edit/service/part/_DEF";
import { UpdateAppointmentParts } from "@/services/DB/Appointment/UpdateAppointmentParts";
import PartsManager from "./part/PartsManager";
import PartManager from "./part/PartManager";
import { DefineDiagnosis, Diagnoses, Diagnosis } from "@/pages/employee/edit/service/diagnosis/_DEF";
import { DIAGNOSIS, NOTE, SERVICE } from "./_DEF";
import DiagnosisManager from "./diagnosis/DiagnosisManager";
import DiagnosesManager from "./diagnosis/DiagnosesManager";
import { UpdateAppointmentDiagnoses } from "@/services/DB/Appointment/UpdateAppointmentDiagnoses";
import { DefineService, Service, Services } from "@/pages/employee/edit/service/service/_DEF";
import { UpdateAppointmentServices } from "@/services/DB/Appointment/UpdateAppointmentServices";
import ServiceManager from "./service/ServiceManager";
import ServicesManager from "./service/ServicesManager";
import useServicesManager from "./service/useServicesManager";
import usePaymentsManager from "./payment/usePaymentsManager";
import { DefinePayment, Payments } from "@/pages/employee/edit/finance/payment/_DEF";
import { UpdateAppointmentPayments } from "@/services/DB/Appointment/UpdateAppointmentPayments";
import { Cost, CostUpdates } from "@/pages/employee/edit/finance/cost/_DEF";
import { UpdateAppointmentCost } from "@/services/DB/Appointment/UpdateAppointmentCost";
import { toString } from "@/utils/convert";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import PaymentManager from "./payment/PaymentManager";
import PaymentsManager from "./payment/PaymentsManager";
import { buildNoteUpdate, DefineNote } from "@/pages/employee/edit/note/_DEF";
import { Note as DB_AppointmentNote} from "waltronics-types";
import { Note, Notes } from "@/pages/employee/edit/note/_DEF";
import { UpdateEmployeeNotes } from "@/services/DB/Employee/UpdateEmployeeNotes";
import NoteManager from "./note/NoteManager";
import NotesManager from "./note/NotesManager";
import { ContactUpdates } from "@/pages/employee/edit/contact/_DEF";
import { VehicleUpdates } from "@/pages/employee/edit/vehicle/_DEF";
import { UpdateAppointmentContact } from "@/services/DB/Appointment/UpdateAppointmentContact";
import { UpdateAppointmentVehicle } from "@/services/DB/Appointment/UpdateAppointmentVehicle";
import ContactManager from "./contact/ContactManager";
import VehicleManager from "./vehicle/VehicleManager";
import Alert from "@/features/Alert/Alert";


interface UpdateManagerProps {
    appointmentID: string;
    appointment: DB_Appointment;
    close: () => void;
}

interface ItemManagerForm<BaseItem, Item, Items> {
    itemsManagerKey: string;
    itemID: string;
    mutation: "Create"|"Update";
}

export default function UpdateManager<BaseItem, Item, Items>(props: UpdateManagerProps) {
    const updateManagerForm = useForm("Update", MasterForm);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);
    const [tab, setTab] = useState("General");
    const [itemManagerForms, setItemManagerForms] = useState<Array<ItemManagerForm<BaseItem, Item, Items>>>([]);
    const [currentItemManagerForm, setCurrentItemManagerForm] = useState<ItemManagerForm<BaseItem, Item, Items>|null>();
    const [currentItemManagerHeader, setCurrentItemManagerHeader] = useState("");
    const [currentItemManagerCanDelete, setCurrentItemManagerCanDelete] = useState(false);

    
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


    // useEffect(() => {
    //     console.log("useEffect[itemManagerForms]");
    //     console.log("\titemManagerForms: ", itemManagerForms);
    // }, [itemManagerForms]);


    const refreshAppointment = async () => {
        const appointmentID = props.appointmentID;
        const appointment = await SelectAppointment({appointmentID});
        console.log("refreshAppointment");
        console.log("\tappointment: ", appointment);
        setAppointment(appointment);
    }

    
    const openForm = (itemsManagerKey: string, itemID: string, mutation: "Create"|"Update") => {
        // console.log("openForm");
        // console.log("\titemsManagerKey: ", itemsManagerKey);
        // console.log("\titemID: ", itemID);
        // console.log("\tmutation: ", mutation);
        // console.log("\titemManagerForms: ", itemManagerForms);
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


    const alertMessage = (good: boolean) => {
        console.log("alertMessage");
        const key = randomKey();
        console.log("\tgood: ", good);
        if (good) {
            const dispatch = saveTDispatch(key, alertDispatch);
            alertDispatch(dispatch);
            refreshAppointment();
        }
        else {
            const dispatch = saveFDispatch(key, alertDispatch)
            alertDispatch(dispatch);
        }
    }


    const saveContactUpdates = async (updates: ContactUpdates) => {
        const output = await UpdateAppointmentContact(props.appointmentID, updates);
        alertMessage(output);
    }
    

    const saveVehicleUpdates = async (updates: VehicleUpdates) => {
        const output = await UpdateAppointmentVehicle(props.appointmentID, updates);
        alertMessage(output);
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
            alertMessage(output);
        },
        openForm: openForm,
        closeForm: closeForm
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
            alertMessage(output);
        },
        openForm,
        closeForm
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
            alertMessage(output);
        },
        openForm,
        closeForm
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
            alertMessage(output);
        },
        openForm,
        closeForm
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
            alertMessage(output);
        },
        saveCostUpdates: async (oldItem: Cost, newItem: Cost) => {
            const updates = {
                Cost: updatedValue(oldItem.Cost, newItem.Cost)
            } as CostUpdates;
            const output = await UpdateAppointmentCost(props.appointmentID, updates);
            alertMessage(output);
        },
        openForm,
        closeForm
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
            alertMessage(output);
        },
        openForm,
        closeForm
    });


    return (
        <div>
            <Alert
                alert={alert}
            />
            {tabs &&
                tabs.map((tab, i) => (
                    <div key={i} onClick={() => setTab(tab)}>
                        {tab}
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
                <>
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
                </>
            }
            {tab == "General" &&
                <ContactManager
                    updateManagerForm={updateManagerForm}
                    appointment={appointment}
                    onSaveUpdates={saveContactUpdates}
                />
            }
            {tab == "Vehicle" &&
                <VehicleManager
                    updateManagerForm={updateManagerForm}
                    appointment={appointment}
                    onSaveUpdates={saveVehicleUpdates}
                />
            }
            {tab == "Repairs" &&
                <RepairsManager
                    repairsManager={repairsManager}
                />
            }
            {tab == "Parts" &&
                <PartsManager
                    partsManager={partsManager}
                />
            }
            {tab == "Diagnoses" &&
                <DiagnosesManager
                    diagnosesManager={diagnosesManager}
                />
            }
            {tab == "Services" &&
                <ServicesManager
                    servicesManager={servicesManager}
                />
            }
            {tab == "Finances" &&
                <PaymentsManager
                    paymentsManager={paymentsManager}
                />
            }
            {tab == "Notes" &&
                <NotesManager
                    notesManager={notesManager}
                />
            }
        </div>
    )
}