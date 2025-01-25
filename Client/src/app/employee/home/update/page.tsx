"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Update from "@/pages/employee/edit/Update";
import authenticatedSession from "@/utils/authenticatedSession";
import useForm from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import { AppointmentTag } from "@/views/Layout/Employee/BreadCrumb";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";
import LoadAppointment from "@/features/LoadAppointment/LoadAppointment";

export default function Page() {
    const form = useForm("ID");
    const router = useRouter();
    const searchParams = useSearchParams();
    const [sessionID, setSessionID] = useState("");
    const [appointmentID, setAppointmentID] = useState("");

    useEffect(() => {
        const load = async () => {
            const sessionID = await authenticatedSession();
            setSessionID(sessionID);

            // Loading Appointment, if Any
            if (searchParams) {
                const appointmentID = searchParams.get("ApptID") || "";
                setAppointmentID(appointmentID);
            }

            // Preparing Input for Manual Appointment ID
            const test = z.object({id: z.string().length(36)});
            form.resetForm(makeForm({id: ""}, test));
        }
        load();
    }, []);

    const loadManualAppointment = () => {
        if (!form.getState())
            return;
        const ID = form.getInput("id").data;
        const URL = "/employee/home/update?ApptID=" + ID;
        router.replace(URL);
        setAppointmentID(ID);
    }
    
    return (
        <div>
            <EmployeeLayout
                page={Pages.Update}
                path={!appointmentID ? 
                    [
                        ["/employee/home/dashboard", "Dashboard"], 
                        ["/employee/home/update", "Update"]
                    ] : 
                    [
                        ["/employee/home/dashboard", "Dashboard"], 
                        ["/employee/home/update", "Update"], 
                        [`/employee/home/view?ApptID=${appointmentID}`, (
                            <AppointmentTag id={appointmentID}/>
                        )]
                    ]
                }
                        
            >
                {sessionID && appointmentID &&
                    <Update
                        sessionID={sessionID}
                        appointmentID={appointmentID}
                    />
                }
                {sessionID && !appointmentID &&
                    <LoadAppointment
                        head="Update Appointment"
                        form={form}
                        loadAppointment={loadManualAppointment}
                    />
                }
            </EmployeeLayout>
        </div>
    )
}