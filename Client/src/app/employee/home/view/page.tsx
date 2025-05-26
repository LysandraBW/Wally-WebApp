"use client";
import { useContext, useEffect, useState } from "react";
import View from "@/pages/employee/view/View";
import { useRouter, useSearchParams } from "next/navigation";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/TextField";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import HashIcon from "@/component/Icon/Hash";
import Button from "@/component/Form/Button/Button";
import clsx from "clsx";
import { AppointmentTag } from "@/views/Layout/Employee/BreadCrumb";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";
import LoadAppointment from "@/features/LoadAppointment/LoadAppointment";
import { Appointment as DB_Appointment } from "waltronics-types";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { z } from "zod";
import { AnimatePresence } from "motion/react";
import { EmployeeContext } from "../layout";

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
            if (searchParams) {
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
            form.resetForm();
        }
        load();
    }, []);

    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("View Appointment");
    }, [employeeContext]);

    const loadAppointment = async () => {
        if (!form.getState())
            return;
        const ID = form.getInput("id").data;

        const appointment = await SelectAppointment({appointmentID: ID});
        console.log(appointment);
        // Appointment Does Not Exist
        if (!appointment || !appointment.FName) {
            setAppointmentNotFound(true);
            return;
        }

        const URL = "/employee/home/view?appointmentID=" + ID;
        router.replace(URL);
        setAppointmentID(ID);
        setAppointment(appointment);
        form.resetForm();
    }
    
    return (
        <div className="flex flex-col overflow-x-clip grow">
            <div className="p-8 pt-5 pb-8 flex flex-col grow">
                <h5 className={clsx("font-medium pb-5")}>View Appointment</h5>
                <div className="flex flex-col bg-white w-full h-full grow">
                    <AnimatePresence>
                        {(appointment && appointmentID) &&
                            <View
                                appointment={appointment}
                                appointmentID={appointmentID}
                                close={() => {
                                    setAppointment(undefined);
                                    setAppointmentID("");
                                    router.replace("/employee/home/view");
                                }}
                            />
                        }
                    </AnimatePresence>
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