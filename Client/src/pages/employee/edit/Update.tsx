import { useEffect, useReducer, useState } from "react";
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

interface UpdatePros {
    appointmentID: string;
    appointment: DB_Appointment;
}

export default function Update(props: UpdatePros) {
    const form = useForm("Update", MasterForm);
    const [tab, setTab] = useState(tabs[0]);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);
    const [openForms, setOpenForms] = useState<Array<string>>([]);
    const [openFormDisplayed, setOpenFormDisplayed] = useState("");

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
            setOpenFormDisplayed(updatedOpenForms[formIndex + 1]);
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
        <div className="flex flex-col grow">
            <Alert
                alert={alert}
            />
            <div className="grow grid grid-cols-[auto_2rem_min-content] grid-rows-[3.5rem_3.5rem_37.59px_38.59px_auto] overflow-y-hidden">
                <div className="col-start-1 row-start-1 row-span-2 border-t border-t-gray-300 border-x border-x-gray-300 bg-white py-4 px-4 flex justify-between items-center gap-1 border-b border-b-gray-300">
                    <div className="w-full">
                        <div className="flex w-full gap-2 items-center justify-between mb-1">
                            <h5 className="text-xl font-medium flex">Appointment</h5>
                            <CloseButton
                                close={() => null}
                            />
                        </div>
                        <p className="tracking-wide text-xs font-medium">{props.appointmentID}</p>
                        <p className="tracking-wide text-xs font-medium">No Changes Made</p>
                    </div>
                </div>
                <div className="row-start-3 row-span-1 col-start-1 col-span-1 border-x border-x-gray-300 bg-white">
                    <Tabs
                        tab={tab}
                        tabs={tabs}
                        onTabClick={setTab}
                    />
                </div>
                <div className="col-start-2 col-span-1 row-start-1 row-span-5 bg-white"></div>
                <h6 className="col-start-1 row-start-4 row-span-1 border-t border-t-gray-300 border-x border-x-gray-300 w-full p-4 py-2 font-medium text-04 bg-gray-50 tracking-wide h-min">{tab} {tab[tab.length - 1] === "s" ? "" : "Information"}</h6>
                {!!openForms.length &&
                    <div className="border-l border-l-gray-300 border-t border-t-gray-300 bg-gray-50 col-start-3 col-span-1 row-start-1 row-span-1 flex items-end border-b border-b-gray-300 border-r border-r-gray-300">
                        {openForms.map((form, i) => (
                            <div key={i} onClick={() =>{console.log(1); setOpenFormDisplayed(form)}} className={clsx("min-w-[37.59px] border-t border-t-gray-300 h-[37.59px] flex gap-4 items-center justify-between px-4 pr-4 bg-gray-100 border-t border-t-gray-300 border-r border-b- border-b-gray-300 border-r-gray-300 !border-l-0 rounded-tr-lg-", form === openFormDisplayed && "bg-white relative after:w-full after:h-[1px] after:absolute after:bg-white after:left-0 after:bottom-[-1px] z-50")}>
                                {form !== openFormDisplayed && <span className={clsx("tracking-wide text-02 text-gray-400 font-medium", form === openFormDisplayed && "!text-black")}>{form}</span>}
                                {/* {form === openFormDisplayed && <CloseButton close={() => closeOpenForm(form)}/>} */}
                                {form !== openFormDisplayed &&
                                    <div onClick={(event) => {event.stopPropagation(); console.log(2); closeOpenForm(form)}} className={clsx("p-[2px] bg-transparent cursor-pointer rounded stroke-gray-400 hover:bg-gray-200 hover:stroke-black", form === openFormDisplayed && "stroke-black")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-[10px] stroke-inherit">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }
                {tab === tabs[0] && appointment && 
                    <ContactManager
                        parentForm={form}
                        appointment={appointment}
                        onSaveUpdates={saveContact}
                    />
                }
                {tab === tabs[1] && appointment &&
                    <VehicleManager
                        parentForm={form}
                        appointment={appointment}
                        onSaveUpdates={saveVehicle}
                    />
                }
                {tab === tabs[2] && appointment && 
                    <CostManager
                        parentForm={form}
                        cost={toString(appointment.Cost)}
                        onSaveUpdates={saveCost}
                    />
                }
                {(tab === tabs[3] || openFormDisplayed === "Create Payment" || openFormDisplayed === "Update Payment") && appointment && 
                    <PaymentManager
                        parentForm={form}
                        paymentList={appointment.Payments}
                        onSaveUpdates={savePayment}
                        tabOpen={tab === tabs[3]}
                        openForm={openForm}
                        closeForm={closeOpenForm}
                        openFormDisplayed={openFormDisplayed}
                        openForms={openForms}
                    />
                }
                {tab === tabs[4] && appointment && 
                    <DiagnosisManager
                        parentForm={form}
                        diagnosisList={appointment.Diagnoses}
                        onSaveUpdates={saveDiagnoses}
                    />
                }
                {tab === tabs[5] && appointment && 
                    <PartManager
                        parentForm={form}
                        partList={appointment.Parts}
                        onSaveUpdates={saveParts}
                    />
                }
                {tab === tabs[6] && appointment && 
                    <RepairManager
                        parentForm={form}
                        repairList={appointment.Repairs}
                        onSaveUpdates={saveRepairs}
                    />
                }
                {tab === tabs[7] && appointment && 
                    <ServiceManager
                        parentForm={form}
                        serviceList={appointment.Services}
                        onSaveUpdates={saveServices}
                    />
                }
                {tab === tabs[8] && appointment && 
                    <NoteManager
                        parent={form}
                        noteList={appointment.Notes}
                        onSaveUpdates={saveNotes}
                        appointmentID={props.appointmentID}
                    />
                }
            </div>
        </div>
    )
}