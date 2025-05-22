"use client";
import { useEffect, useState } from "react";
import View from "@/pages/employee/view/View";
import { useRouter, useSearchParams } from "next/navigation";
import AuthenticatedEmployee from "@/services/DB/Procedure/Employee/AuthenticatedEmployee";
import useForm from "@/features/Form/useForm/useForm";
import TextField from "@/component/Form/Text/TextField";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import HashIcon from "@/component/Icon/Hash";
import Button from "@/component/Form/Button/Button";
import clsx from "clsx";
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
            const sessionID = await AuthenticatedEmployee();
            setSessionID(sessionID);

            if (searchParams) {
                const appointmentID = searchParams.get("ApptID") || "";
                setAppointmentID(appointmentID);
            }
            form.resetForm();
        }
        load();
    }, []);

    const loadManualAppointment = () => {
        if (!form.getState())
            return;
        const ID = form.getInput("id").data;
        const URL = "/employee/home/view?ApptID=" + ID;
        router.replace(URL);
        setAppointmentID(ID);
    }
    
    return (
        <div>
            <EmployeeLayout
                page={Pages.View}
                path={!appointmentID ? 
                    [
                        ["/employee/home/dashboard", "Dashboard"], 
                        ["/employee/home/view", "View"]
                    ] : 
                    [
                        ["/employee/home/dashboard", "Dashboard"], 
                        ["/employee/home/view", "View"], 
                        [`/employee/home/view?ApptID=${appointmentID}`, (
                                <AppointmentTag id={appointmentID}/>
                        )]
                    ]
            }
                        
            >
                {sessionID && appointmentID &&
                <View
                    sessionID={sessionID}
                    appointmentID={appointmentID}
                />
                }
                {sessionID && !appointmentID &&
                    <LoadAppointment
                        head="View Appointment"
                        form={form}
                        loadAppointment={loadManualAppointment}
                    />
                }
            </EmployeeLayout>
        </div>
    )
}