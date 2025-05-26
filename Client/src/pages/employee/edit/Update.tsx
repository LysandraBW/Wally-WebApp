import { createContext, useEffect, useReducer, useState } from "react";
import NoteManager from "./note/NoteManager";
import DiagnosisManager from "./service/diagnosis/DiagnosisManager";
import PartManager from "./service/part/PartManager";
import RepairManager from "./service/repair/RepairManager";
import ServiceManager from "./service/service/ServiceManager";
import { MasterForm, tabs } from "./_DEF";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { ContactUpdates } from "./contact/_DEF";
import { VehicleUpdates } from "./vehicle/_DEF";
import { CostUpdates } from "./finance/cost/_DEF";
import { PaymentUpdates } from "./finance/payment/_DEF";
import { DiagnosisUpdates } from "./service/diagnosis/_DEF";
import { RepairUpdates } from "./service/repair/_DEF";
import { ServiceUpdates } from "./service/service/_DEF";
import { NoteUpdates } from "./note/_DEF";
import { PartUpdates } from "./service/part/_DEF";
import ContactManager from "./contact/ContactManager";
import VehicleManager from "./vehicle/VehicleManager";
import CostManager from "./finance/cost/CostManager";
import { toString } from "@/utils/convert";
import PaymentManager from "./finance/payment/PaymentManager";
import Tabs from "@/component/Tabs/Tabs";
import { UpdateAppointmentContact } from "@/services/DB/Appointment/UpdateAppointmentContact";
import { UpdateAppointmentParts } from "@/services/DB/Appointment/UpdateAppointmentParts";
import { UpdateAppointmentServices } from "@/services/DB/Appointment/UpdateAppointmentServices";
import { UpdateAppointmentRepairs } from "@/services/DB/Appointment/UpdateAppointmentRepairs";
import { UpdateAppointmentDiagnoses } from "@/services/DB/Appointment/UpdateAppointmentDiagnoses";
import { UpdateAppointmentPayments } from "@/services/DB/Appointment/UpdateAppointmentPayments";
import { UpdateAppointmentCost } from "@/services/DB/Appointment/UpdateAppointmentCost";
import { UpdateAppointmentVehicle } from "@/services/DB/Appointment/UpdateAppointmentVehicle";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import saveTDispatch from "../../../features/Alert/saveTDispatch";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "../../../features/Alert/saveFDispatch";
import Alert from "@/features/Alert/Alert";
import useForm from "@/features/Form/useForm/useForm";
import { Appointment as DB_Appointment } from "waltronics-types";
import { UpdateEmployeeNotes } from "@/services/DB/Employee/UpdateEmployeeNotes";
import CloseButton from "@/component/Button/CloseButton";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

interface UpdatePros {
    appointmentID: string;
    appointment: DB_Appointment;
    close: () => void;
}

export const UpdateManagerContext = createContext<{changesMade: {[k: string]: boolean}, setChangesMade: (key: string, value: boolean) => void}>({changesMade: {}, setChangesMade: (key: string, value: boolean) => {return}});

export default function UpdateManager(props: UpdatePros) {
    const form = useForm("Update", MasterForm);
    const [tab, setTab] = useState(tabs[0]);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);
    const [openForms, setOpenForms] = useState<Array<string>>([]);
    const [openFormDisplayed, setOpenFormDisplayed] = useState("");
    const [changesMade, setChangesMade] = useState<{[k: string]: boolean}>({});    

    useEffect(() => {
        console.log(openForms, openFormDisplayed);
    }, [openForms, openFormDisplayed]);

    const loadAppointment = async () => {
        const appointment = await SelectAppointment({
            appointmentID: props.appointmentID
        });
        console.log(appointment);
        setAppointment(appointment);
    }

    const alertOutput = (successful: boolean) => {
        if (successful) {
            alertDispatch(saveTDispatch(randomKey(), alertDispatch));
            loadAppointment();
        }
        else {
            alertDispatch(saveFDispatch(randomKey(), alertDispatch));
        }
    }

    const openForm = (form: string) => {
        if (openForms.findIndex(f => f === form) !== -1)
            return;
        setOpenForms(openForms => [...openForms, form]);
        setOpenFormDisplayed(form);
    }

    const closeOpenForm = (form: string) => {
        console.log("Closing Form: ", form);
        const formIndex = openForms.findIndex(f => f === form);
        if (formIndex === -1)
            return;
        console.log("Can Close", formIndex);
        let updatedOpenForms = [...openForms];
        updatedOpenForms.splice(formIndex, 1);
        console.log("Updated Open Forms: ", updatedOpenForms);
        if (updatedOpenForms.length === 0)
            setOpenFormDisplayed("");
        else if (updatedOpenForms.length === 1)
            setOpenFormDisplayed(updatedOpenForms[0]);
        else
            setOpenFormDisplayed(updatedOpenForms[formIndex - 1]);
        setOpenForms(updatedOpenForms);
    }

    const saveContact = async (updates: ContactUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentContact(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveVehicle = async (updates: VehicleUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentVehicle(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveCost = async (updates: CostUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentCost(props.appointmentID, updates);
        alertOutput(output);
    }

    const savePayment = async (updates: PaymentUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentPayments(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveDiagnoses = async (updates: DiagnosisUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentDiagnoses(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveRepairs = async (updates: RepairUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentRepairs(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveServices = async (updates: ServiceUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentServices(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveParts = async (updates: PartUpdates) => {
        console.log(updates);
        const output = await UpdateAppointmentParts(props.appointmentID, updates);
        alertOutput(output);
    }

    const saveNotes = async (updates: NoteUpdates) => {
        console.log(updates);
        const output = await UpdateEmployeeNotes(updates);
        alertOutput(output);
    }

    return (
        <UpdateManagerContext.Provider value={{changesMade, setChangesMade: (key: string, value: boolean) => setChangesMade(changesMade => ({...changesMade, [`${key}`]: value}))}}>
            <motion.div className="flex flex-col grow">
                <Alert
                    alert={alert}
                />
                <div className="grow grid grid-cols-[auto_min-content_min-content] grid-rows-[37.59px_4.5rem_37.59px_38.59px_auto] overflow-x-hidden">
                    <div className="col-start-1 row-start-1 row-span-2 border-t border-t-gray-300 border-x border-x-gray-300 bg-white py-4 px-4 flex justify-between items-center gap-1 border-b border-b-gray-300">
                        <div className="w-full">
                            <div className="flex w-full gap-2 items-center justify-between mb-1">
                                <h5 className="text-xl font-medium flex">Appointment</h5>
                                <CloseButton
                                    close={props.close}
                                />
                            </div>
                            <p className="tracking-wide text-xs font-medium">{props.appointmentID}</p>
                            <p className="tracking-wide text-xs font-medium">{Object.values(changesMade).includes(true) ? "Unsaved Changes" : "No Changes Made"}</p>
                        </div>
                    </div>
                    <div className="row-start-3 row-span-1 col-start-1 col-span-1 border-x border-x-gray-300 bg-white">
                        <Tabs
                            tab={tab}
                            tabs={tabs}
                            onTabClick={setTab}
                        />
                    </div>
                    {!!openForms.length && <div className="col-start-2 col-span-1 row-start-1 row-span-5 bg-white"><div className="w-[2rem]"></div></div>}
                    <h6 className="col-start-1 row-start-4 row-span-1 border-t border-t-gray-300 border-x border-x-gray-300 w-full p-4 py-2 font-medium text-04 bg-gray-100 tracking-wide h-min">Showing {tab} {tab[tab.length - 1] === "s" ? "" : "Information"}</h6>
                    <AnimatePresence>
                        {!!openForms.length &&
                            <motion.div 
                                initial={{width: "0px", opacity: 0}}
                                animate={{width: "400px", opacity: 1}}
                                exit={{width: "0px", opacity: 0}}
                                key="FormTabs"
                                className="overflow-hidden w-[400px] relative bg-gray-50- col-start-3 col-span-1 row-start-1 row-span-1 flex"
                            >
                                {openForms.map((form, i) => (
                                    <div key={i} onClick={() =>{console.log(1); setOpenFormDisplayed(form)}} className={clsx("h-full first:border-l border-l-gray-300 overflow-hidden hover:bg-gray-100 cursor-pointer group border-t border-t-gray-300 flex gap-4 items-center justify-between px-4 pr-2 bg-gray-50 border-t border-t-gray-300 border-r border-r-gray-300 rounded-tr-lg-", form === openFormDisplayed && "cursor-auto !pr-4 !border-r-blue-500- !border-t-blue-500- !border-b-blue-500- !bg-white relative  z-50")}>
                                        {<span className={clsx("tracking-wide text-02 text-gray-400 font-medium whitespace-nowrap group-hover:text-gray-600", form === openFormDisplayed && "!text-black drop-shadow-sm-")}>{form}</span>}
                                        {form !== openFormDisplayed &&
                                            <div onClick={(event) => {event.preventDefault(); event.stopPropagation(); console.log(2); closeOpenForm(form)}} className={clsx("p-[2px] bg-transparent cursor-pointer rounded stroke-gray-400 hover:bg-gray-200 hover:stroke-black", form === openFormDisplayed && "stroke-black")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-[10px] stroke-inherit">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </motion.div>
                        }
                    </AnimatePresence>
                    {appointment && 
                        <ContactManager
                            parentForm={form}
                            appointment={appointment}
                            onSaveUpdates={saveContact}
                            tabOpen={tab === tabs[0]}
                        />
                    }
                    {appointment &&
                        <VehicleManager
                            parentForm={form}
                            appointment={appointment}
                            onSaveUpdates={saveVehicle}
                            tabOpen={tab === tabs[1]}
                        />
                    }
                    {(tab === tabs[2] || openForms.includes("Add Payment") || openForms.includes("Edit Payment")) && appointment && 
                        <PaymentManager
                            cost={toString(appointment.Cost)}
                            onSaveCostUpdates={saveCost}
                            parentForm={form}
                            paymentList={appointment.Payments}
                            onSavePaymentUpdates={savePayment}
                            tabOpen={tab === tabs[2]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                    {(tab === tabs[3] || openForms.includes("Add Diagnosis") || openForms.includes("Edit Diagnosis")) && appointment && 
                        <DiagnosisManager
                            parentForm={form}
                            diagnosisList={appointment.Diagnoses}
                            onSaveUpdates={saveDiagnoses}
                            tabOpen={tab === tabs[3]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                    {(tab === tabs[4] || openForms.includes("Add Part") || openForms.includes("Edit Part")) && appointment && 
                        <PartManager
                            parentForm={form}
                            partList={appointment.Parts}
                            onSaveUpdates={saveParts}
                            tabOpen={tab === tabs[4]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                    {(tab === tabs[5] || openForms.includes("Add Repair") || openForms.includes("Edit Repair")) && appointment && 
                        <RepairManager
                            parentForm={form}
                            repairList={appointment.Repairs}
                            onSaveUpdates={saveRepairs}
                            tabOpen={tab === tabs[5]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                    {(tab === tabs[6] || openForms.includes("Add Service") || openForms.includes("Edit Service")) && appointment && 
                        <ServiceManager
                            parentForm={form}
                            serviceList={appointment.Services}
                            onSaveUpdates={saveServices}
                            tabOpen={tab === tabs[6]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                    {(tab === tabs[7] || openForms.includes("Add Note") || openForms.includes("Edit Note")) && appointment && 
                        <NoteManager
                            parent={form}
                            noteList={appointment.Notes}
                            onSaveUpdates={saveNotes}
                            appointmentID={props.appointmentID}
                            tabOpen={tab === tabs[7]}
                            openForm={openForm}
                            closeForm={closeOpenForm}
                            openFormDisplayed={openFormDisplayed}
                            openForms={openForms}
                        />
                    }
                </div>
            </motion.div>
        </UpdateManagerContext.Provider>
    )
}