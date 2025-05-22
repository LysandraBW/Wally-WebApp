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

interface UpdatePros {
    sessionID: string;
    appointmentID: string;
}

export default function Update(props: UpdatePros) {
    const form = useForm("Update", MasterForm);
    const [tab, setTab] = useState(tabs[0]);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [appointment, setAppointment] = useState<DB_Appointment>();

    useEffect(() => {
        reloadAppointment();
    }, []);

    const reloadAppointment = async () => {
        const appointment = await SelectAppointment({
            sessionID: props.sessionID,
            appointmentID: props.appointmentID
        });
        console.log(appointment);
        setAppointment(appointment);
    }

    const alertOutput = (successful: boolean) => {
        if (successful) {
            alertDispatch(saveTDispatch(randomKey(), alertDispatch));
            reloadAppointment();
        }
        else {
            alertDispatch(saveFDispatch(randomKey(), alertDispatch));
        }
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
        <div className="">
            <Alert
                alert={alert}
            />
            <h6 className="w-full border-b p-4 font-medium">{tab}</h6>
            <div className="bg-white px-1 py-1 border-b border-b-gray-200">
                <Tabs
                    tab={tab}
                    tabs={tabs}
                    onTabClick={setTab}
                />
            </div>
            <div>
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
                {tab === tabs[3] && appointment && 
                    <PaymentManager
                        parentForm={form}
                        paymentList={appointment.Payments}
                        onSaveUpdates={savePayment}
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