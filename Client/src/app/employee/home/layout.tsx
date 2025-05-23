"use client";
import AuthenticatedEmployee from "@/services/DB/Employee/AuthenticatedEmployee";
import { navigate } from "@/utils/navigate";
import { PAGE_EMPLOYEE_LOGIN } from '@/utils/constants';
import { useEffect, createContext, useState } from "react";
import { Employee as DB_Employee } from "waltronics-types";

export const EmployeeContext = createContext({});

export default function Page({children}: Readonly<{children: React.ReactNode}>) {
    const [employee, setEmployee] = useState<DB_Employee>();
    const [authenticated, setAuthenticated] = useState<boolean>();
 
    useEffect(() => {
        const load = async () => {
            const employee = await AuthenticatedEmployee();
            setAuthenticated(!!employee);
            if (employee)
                setEmployee(employee);
        }
        load();
    }, []);

    useEffect(() => {
        if (authenticated !== undefined && !authenticated)
            navigate(PAGE_EMPLOYEE_LOGIN);
    }, [authenticated]);

    return (
        <div>
            {authenticated &&
                <EmployeeContext value={{employee}}>
                    {children}
                </EmployeeContext>
            }
        </div>
    );
}