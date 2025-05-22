"use client";
import AuthenticatedEmployee from "@/services/DB/Employee/AuthenticatedEmployee";
import { navigate, PAGE_EMPLOYEE_LOGIN } from "@/utils/navigate";
import { useEffect, createContext, useState } from "react";
import { Employee as DB_Employee } from "waltronics-types";

export const EmployeeContext = createContext({});

export default function Page({children}: Readonly<{children: React.ReactNode}>) {
    const [employee, setEmployee] = useState<DB_Employee>();

    useEffect(() => {
        const load = async () => {
            const employee = await AuthenticatedEmployee();
            console.log("Employee: " + employee);
            if (!employee) {
                navigate(PAGE_EMPLOYEE_LOGIN);
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