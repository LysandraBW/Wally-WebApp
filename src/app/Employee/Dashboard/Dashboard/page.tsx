"use client";
import { useState, useEffect } from "react";
import { goTo } from "@/lib/Navigation/Redirect";
import { AuthenticateEmployeeSession, GetAllAppointments, GetEmployee } from "@/lib/Database/Export";
import { QuickAppointment } from "@/lib/Database/Appointment/Appointment";
import { getToken } from "@/lib/Authorize/Authorize";
import { Employee } from "@/lib/Database/Employee/Employee";

export default function Dashboard() {
    const [employee, setEmployee] = useState<Employee>();
    const [appointments, setAppointments] = useState<Array<QuickAppointment>>([]);

    useEffect(() => {
        const authorize = async () => {
            const sessionID = await getToken();
            if (!sessionID) {
                goTo('/Employee/Login');
                return;
            }
            
            const employeeID = await AuthenticateEmployeeSession({
                SessionID: sessionID
            });

            if (!employeeID) {
                goTo('/Employee/Login');
                return;
            }

            const employee = await GetEmployee({SessionID: sessionID});
            setEmployee(employee);
        }
        authorize();            
    }, []);

    useEffect(() => {
        const loadAppointments = async () => {
            if (!employee)
                return;

            const appointments = await GetAllAppointments({
                SessionID: employee.SessionID
            });

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