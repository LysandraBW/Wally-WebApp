"use client";
import { authorizeEmployee } from "@/lib/Authorize/Employee";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { useState, useEffect } from "react";
import { goTo } from "@/lib/Navigation/Redirect";
import { GetAllAppointments } from "@/lib/Database/Export";

export default function All() {
    const [employee, setEmployee] = useState<{
        EmployeeID: number;
        FName: string;
        LName: string;
        Email: string;
    }>();

    const [appointments, setAppointments] = useState<Array<Appointment>>([]);

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
        // const loadAppointments = async () => {
        //     if (!employee || !employee.EmployeeID)
        //         return;

        //     const appointments = await GetAllAppointments({'EmployeeID': employee.EmployeeID});
        //     if (!appointments)
        //         return;
            
        //     setAppointments(appointments);
        // }
        // loadAppointments();
    }, [employee?.EmployeeID])

    return (
        <>Employee Dashboard</>
    )
}