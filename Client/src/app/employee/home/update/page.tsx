"use client";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useForm from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import { Appointment as DB_Appointment } from "waltronics-types";
import LoadAppointment from "@/pages/loadAppointment/LoadAppointment";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { EmployeeContext } from "../layout";
import clsx from "clsx";
import UpdateManager from "./UpdateManager";

export default function Page() {
    const form = useForm("ID");
    const router = useRouter();
    const searchParams = useSearchParams();
    const [appointment, setAppointment] = useState<DB_Appointment>();
    const [appointmentID, setAppointmentID] = useState("");
    const [appointmentNotFound, setAppointmentNotFound] = useState(false);
    const employeeContext = useContext(EmployeeContext);

    useEffect(() => {
        const load = async () => {
            // Loading Appointment, if Any
            if (searchParams && searchParams.get("appointmentID")) {
                const appointmentID = searchParams.get("appointmentID") || "";
                const appointment = await SelectAppointment({appointmentID});
                
                // Appointment Does Exist
                if (appointment && appointment.FName) {
                    setAppointment(appointment);
                    setAppointmentID(appointmentID);
                }
                // Appointment Does Not Exist
                else {
                    setAppointmentNotFound(true);
                }
            }

            // Preparing Input for Manual Appointment ID
            const test = z.object({id: z.string({"message": "Must be a string."}).length(36, {"message": "This is an invalid appointment ID."})});
            form.resetForm(makeForm({id: ""}, test));
        }
        load();
    }, []);

    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Edit Appointment");
    }, [employeeContext]);

    const loadAppointment = async () => {
        if (!form.getState())
            return;
        
        const ID = form.getInput("id").data;
        const appointment = await SelectAppointment({appointmentID: ID});
        
        // Appointment Does Not Exist
        if (!appointment || !appointment.FName) {
            setAppointmentNotFound(true);
            return;
        }

        const URL = "/employee/home/update?appointmentID=" + ID;
        router.replace(URL);
        setAppointmentID(ID);
        setAppointment(appointment);
    }
    
    return (
        <div className="flex flex-col grow">
            <div className="p-4 flex flex-col grow">
                <div className="flex flex-col w-full h-full grow">
                    {(appointment && appointmentID) &&
                        <UpdateManager
                            appointment={appointment}
                            appointmentID={appointmentID}
                            close={() => {
                                setAppointment(undefined);
                                setAppointmentID("");
                                router.replace("/employee/home/update");
                            }}
                        />
                    }
                    {!appointmentID &&
                        <LoadAppointment
                            head="Load Appointment"
                            paragraph="To update an appointment, enter its ID below."
                            form={form}
                            loadAppointment={loadAppointment}
                            appointmentNotFound={appointmentNotFound}
                            setAppointmentNotFound={setAppointmentNotFound}
                        />
                    }
                </div>
            </div>
        </div>
    )
}