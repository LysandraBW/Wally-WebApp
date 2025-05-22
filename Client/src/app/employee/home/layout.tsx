"use client";
import { DB_Employee } from "@/services/DB/Interface/Employee";
import AuthenticatedEmployee from "@/services/DB/Procedure/Employee/AuthenticatedEmployee";
import { goToEmployeeLogin } from "@/utils/redirect/goToEmployeeLogin";
import { useEffect, createContext, useState } from "react";

export const EmployeeContext = createContext({});

export default function Page({children}: Readonly<{children: React.ReactNode}>) {
    const [employee, setEmployee] = useState<DB_Employee>();

    useEffect(() => {
        const load = async () => {
            const employee = await AuthenticatedEmployee();
            console.log("Employee: " + employee);
            if (!employee) {
                goToEmployeeLogin();
                return;
            }
            setEmployee(employee);
        }
        load();
    }, []);

    return (
        <div className="bg-red-500">
            <EmployeeContext value={{employee}}>
                {children}
            </EmployeeContext>
        </div>
    );
}