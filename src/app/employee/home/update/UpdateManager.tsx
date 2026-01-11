import alertReducer, { AlertActionType, startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import SelectAppointment from "@/services/db/Appointment/SelectAppointment";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Appointment as DB_Appointment } from "waltronics-types";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import useItemsManager from "../../../../features/ItemManager/useItemsManager";
import { DefineRepair, Repair, Repairs } from "@/app/employee/home/update/repair/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import { MasterForm, PART, PAYMENT, REPAIR } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { UpdateAppointmentRepairs } from "@/services/db/Appointment/UpdateAppointmentRepairs";
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { Part as DB_AppointmentPart } from "waltronics-types";
import RepairsManager from "./repair/RepairsManager";
import { DefinePart, Part, Parts } from "@/app/employee/home/update/part/_DEF";
import { UpdateAppointmentParts } from "@/services/db/Appointment/UpdateAppointmentParts";
import PartsManager from "./part/PartsManager";
import { DefineDiagnosis, Diagnoses, Diagnosis } from "@/app/employee/home/update/diagnosis/_DEF";
import { CONTACT, DIAGNOSIS, NOTE, SERVICE, VEHICLE } from "./_DEF";
import DiagnosesManager from "./diagnosis/DiagnosesManager";
import { UpdateAppointmentDiagnoses } from "@/services/db/Appointment/UpdateAppointmentDiagnoses";
import { DefineService, Services } from "@/app/employee/home/update/service/_DEF";
import { UpdateAppointmentServices } from "@/services/db/Appointment/UpdateAppointmentServices";
import ServicesManager from "./service/ServicesManager";
import useServicesManager from "./service/useServicesManager";
import usePaymentsManager from "./payment/usePaymentsManager";
import { DefinePayment, Payments } from "./payment/_DEF";
import { UpdateAppointmentPayments } from "@/services/db/Appointment/UpdateAppointmentPayments";
import { Cost, CostUpdates } from "@/app/employee/home/update/payment/_DEF";
import { UpdateAppointmentCost } from "@/services/db/Appointment/UpdateAppointmentCost";
import { toString } from "@/utils/convert";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import PaymentsManager from "./payment/PaymentsManager";
import { buildNoteUpdate, DefineNote } from "@/app/employee/home/update/note/_DEF";
import { Note as DB_AppointmentNote} from "waltronics-types";
import { Note, Notes } from "@/app/employee/home/update/note/_DEF";
import { UpdateEmployeeNotes } from "@/services/db/Employee/UpdateEmployeeNotes";
import NotesManager from "./note/NotesManager";
import { ContactUpdates } from "@/app/employee/home/update/contact/_DEF";
import { VehicleUpdates } from "@/app/employee/home/update/vehicle/_DEF";
import { UpdateAppointmentContact } from "@/services/db/Appointment/UpdateAppointmentContact";
import { UpdateAppointmentVehicle } from "@/services/db/Appointment/UpdateAppointmentVehicle";
import ContactManager from "./contact/ContactManager";
import VehicleManager from "./vehicle/VehicleManager";
import Alert from "@/features/Alert/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import useInterval from "@/features/Alert/useInterval";
import useTabsManager, {  } from "@/features/TabManager/useTabsManager";
import Header from "@/shared/appointment/Header";
import Tabs from "@/shared/appointment/Tabs";
import Forms from "./Forms";


interface UpdateManagerProps {
    appointmentID: string;
    appointment: DB_Appointment;
    close: () => void;
}

export default function UpdateManager<BaseItem, Item, Items>(props: UpdateManagerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateManagerForm = useForm("Update", MasterForm);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);
    const [changesMade, setChangesMade] = useState<{[k: string]: boolean}>({});
    // These are the static tabs that a user can click to
    // interact with different parts of an appointment.
    // I'm calling them "parts" so as to not confuse it with
    // the other tabs.
    const [partID, setPartID] = useState(CONTACT);
    const [parts] = useState([[CONTACT, "General"], [VEHICLE, "Vehicle"], [PAYMENT, "Finances"], [DIAGNOSIS, "Diagnoses"], [PART, "Parts"], [REPAIR, "Repairs"], [SERVICE, "Services"], [NOTE, "Notes"]]);
    // These are the dynamic tabs that a user opens and closes
    // to mutate an appointment's information. Its functionality
    // is stored in a hook since it's used elsewhere.
    const tabsManager = useTabsManager();


    useEffect(() => {
        if (searchParams) {
            const tab = searchParams.get("tab") || "";
            setPartID(tab || CONTACT);
        }
    }, []);


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
        setPartID(tab);
        const URL = `/employee/home/update?appointmentID=${props.appointmentID}&tab=${tab}`;
        router.replace(URL);
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
        }));
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
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
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
        handleChangesMade
    });

    
    return (
        <div className="flex flex-col grow">
            <Alert
                alert={alert}
            />
            <div 
                className="flex flex-col gap-x-4 grow"
            >
                <Header
                    close={props.close}
                    goToView={true}
                    appointment={props.appointment}
                    appointmentID={props.appointmentID}
                />
                <Tabs
                    tab={partID}
                    tabs={parts}
                    changesMade={changesMade}
                    onClick={handleTabChange}
                />
                <div className={partID != CONTACT ? "hidden" : "flex grow"}>
                    <ContactManager
                        updateManagerForm={updateManagerForm}
                        appointment={appointment}
                        onSaveUpdates={saveContactUpdates}
                        setChangesMade={handleChangesMade}
                    />
                </div>
                <div className={partID != VEHICLE ? "hidden" : "flex grow"}>
                    <VehicleManager
                        updateManagerForm={updateManagerForm}
                        appointment={appointment}
                        onSaveUpdates={saveVehicleUpdates}
                        setChangesMade={handleChangesMade}
                    />
                </div>
                {partID == REPAIR &&
                    <RepairsManager
                        repairsManager={repairsManager}
                    />
                }
                {partID == PART &&
                    <PartsManager
                        partsManager={partsManager}
                    />
                }
                {partID == DIAGNOSIS &&
                    <DiagnosesManager
                        diagnosesManager={diagnosesManager}
                    />
                }
                {partID == SERVICE &&
                    <ServicesManager
                        servicesManager={servicesManager}
                    />
                }
                {partID == PAYMENT &&
                    <PaymentsManager
                        paymentsManager={paymentsManager}
                    />
                }
                {partID == NOTE &&
                    <NotesManager
                        notesManager={notesManager}
                    />
                }
            </div>
            {tabsManager.tabs && tabsManager.currentTab &&
                <Forms
                    tabsManager={tabsManager}
                    repairsManager={repairsManager}
                    partsManager={partsManager}
                    diagnosesManager={diagnosesManager}
                    servicesManager={servicesManager}
                    paymentsManager={paymentsManager}
                    notesManager={notesManager}
                />
            }
        </div>
    )
}