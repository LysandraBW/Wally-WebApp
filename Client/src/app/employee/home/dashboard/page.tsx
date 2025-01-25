"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/pages/employee/dashboard/Dashboard";
import authenticatedSession from "@/utils/authenticatedSession";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";

export default function Page() {
    const [sessionID, setSessionID] = useState("");
    
    useEffect(() => {
        const load = async () => {
            const sessionID = await authenticatedSession();
            setSessionID(sessionID);
        }
        load();
    }, []);

    return (
        <div className="">
            {sessionID &&
                <EmployeeLayout
                    page={Pages.Dashboard}
                    path={[[
                        "/employee/home/dashboard", "Dashboard"
                    ]]}
                >
                    <Dashboard
                        sessionID={sessionID}
                    />
                </EmployeeLayout>
            }
        </div>
    )
}