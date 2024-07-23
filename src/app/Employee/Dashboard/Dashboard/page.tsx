"use client";
import { useState, useEffect } from "react";
import { goTo } from "@/lib/Navigation/Redirect";
import { AuthenticateEmployeeSession, GetAllAppointments, GetEmployee } from "@/lib/Database/Export";
import { QuickAppointment } from "@/lib/Database/Appointment/Appointment";
import { getSessionID } from "@/lib/Authorize/Authorize";
import { Employee } from "@/lib/Database/Employee/Employee";

export default function Dashboard() {
    const [employee, setEmployee] = useState<Employee>();
    const [appointments, setAppointments] = useState<Array<QuickAppointment>>([]);

    useEffect(() => {
        const authorize = async () => {
            const SessionID = await getSessionID();
            if (!SessionID) {
                goTo('/Employee/Login');
                return;
            }
            
            const EmployeeID = await AuthenticateEmployeeSession({SessionID});
            if (!EmployeeID) {
                goTo('/Employee/Login');
                return;
            }

            setEmployee(await GetEmployee({SessionID}));
        }
        authorize();            
    }, []);

    useEffect(() => {
        const loadAppointments = async () => {
            if (!employee)
                return;

            // "A TOP OR FETCH clause contains an invalid value"
            const appointments = await GetAllAppointments({SessionID: await getSessionID()});
            if (!appointments)
                return;
            
            setAppointments(appointments);
        }
        loadAppointments();
    }, [employee]);

    return (
        <>
            Hello...
            {JSON.stringify(appointments)}
        </>
    )
}