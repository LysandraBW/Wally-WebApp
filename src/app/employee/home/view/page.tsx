"use client";
import { useContext, useEffect, useState } from "react";
import View from "@/app/employee/home/view/View";
import { useRouter, useSearchParams } from "next/navigation";
import useForm from "@/features/Form/useForm/useForm";
import LoadAppointment from "@/shared/appointment/LoadAppointment";
import { Appointment as DB_Appointment, isUUIDArray } from "waltronics-types";
import SelectAppointment from "@/services/db/Appointment/SelectAppointment";
import { AnimatePresence } from "motion/react";
import { EmployeeContext } from "../layout";
import z from "zod";
import makeForm from "@/features/Form/useForm/makeForm";
import { BarLoader, MoonLoader } from "react-spinners";

export default function Page() {
    const form = useForm("ID");
    const router = useRouter();
    const searchParams = useSearchParams();
    const [appointment, setAppointment] = useState<DB_Appointment>();
    const [appointmentNotFound, setAppointmentNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const employeeContext = useContext(EmployeeContext);

    
    useEffect(() => {
        const load = async () => {
            // Loading Appointment, if Any
            if (searchParams && searchParams.get("appointmentID")) {
                const appointmentID = searchParams.get("appointmentID") || "";
                
                let appointment = null;
                if (appointmentID)
                    appointment = await SelectAppointment({appointmentID});
                
                // Appointment Does Exist
                if (appointment && appointment.FName) {
                    setAppointment(() => {
                        setLoading(false);
                        return appointment;
                    });
                }
                // Appointment Does Not Exist
                else {
                    setAppointmentNotFound(() => {
                        setLoading(false);
                        return true;
                    });
                }
            }
            else {
                setLoading(false);
            }

            const test = z.object({id: 
                isUUIDArray
            });
            form.resetForm(makeForm({id: ""}, test));
        }
        load();
    }, []);


    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("View Appointment");
    }, [employeeContext]);


    const loadAppointment = async () => {
        if (!form.getState())
            return;
        
        setLoading(true);
        const ID = form.getInput("id").data[0];
        const appointment = await SelectAppointment({appointmentID: ID});
        
        // Appointment Does Not Exist
        if (!appointment || !appointment.FName) {
            setAppointmentNotFound(true);
            return;
        }

        const URL = "/employee/home/view?appointmentID=" + ID;
        router.replace(URL);
        setAppointment(() => {
            setLoading(false);
            return appointment
        });
        form.resetForm();
    }
    

    return (
        <div className="flex flex-col grow w-full h-full">
            <AnimatePresence>
                {(appointment) &&
                    <View
                        appointment={appointment}
                        appointmentID={appointment.AppointmentID}
                        close={() => {
                            setAppointment(undefined);
                            router.replace("/employee/home/view");
                        }}
                    />
                }
            </AnimatePresence>
            {(!appointment || !Object.keys(appointment).length) &&
                <LoadAppointment
                    head="Load Appointment"
                    body="To view an appointment, enter its ID below."
                    form={form}
                    loadAppointment={loadAppointment}
                    appointmentNotFound={appointmentNotFound}
                    setAppointmentNotFound={setAppointmentNotFound}
                />
            }
        </div>
    )
}