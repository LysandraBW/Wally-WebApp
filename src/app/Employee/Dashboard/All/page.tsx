"use client";
import { authorizeEmployee } from "@/lib/Authorize/Employee";
import { FullAppointment } from "@/lib/Database/Appointment/Appointment";
import { useState, useEffect } from "react";
import { goTo } from "@/lib/Navigation/Redirect";
import { GetAllAppointments } from "@/lib/Database/Export";
import { fetchPool, poolEmployee } from "@/lib/Database/Pool";
import { User } from "@/lib/Database/User";
import Dashboard from "@/views/Employee/Dashboard/Dashboard/Dashboard";

export default function All() {
    const [employee, setEmployee] = useState<{
        EmployeeID: number;
        FName: string;
        LName: string;
        Email: string;
    }>();

    const [appointments, setAppointments] = useState<Array<FullAppointment>>([]);

    useEffect(() => {
        const authorize = async () => {
            console.log('HERE');
            const employee = await authorizeEmployee();

            // Unauthorized JWT Token
            if (!employee) {
                goTo('/Employee/Login');
                return;
            }

            console.log(employee);
            // Authorized JWT Token
            setEmployee(employee);
        }
        authorize();            
    }, []);

    useEffect(() => {
        const loadAppointments = async () => {
            if (!employee || !employee.EmployeeID)
                return;

            await poolEmployee(employee);

            const appointments = await GetAllAppointments({'EmployeeID': employee.EmployeeID});
            if (!appointments)
                return;
            
            console.log(appointments);
            setAppointments(appointments);
        }
        loadAppointments();
    }, [employee]);

    const forceReload = async () => {
        const loadAppointments = async () => {
            if (!employee || !employee.EmployeeID)
                return;

            const appointments = await GetAllAppointments({'EmployeeID': employee.EmployeeID});
            if (!appointments)
                return;
            
            console.log(appointments);
            setAppointments(appointments);
        }
        await loadAppointments();
    }

    return (
        <>
            <Dashboard 
                employeeID={employee?.EmployeeID||-1} 
                appointments={appointments}
                forceReload={forceReload}    
            />
        </>
    )
}