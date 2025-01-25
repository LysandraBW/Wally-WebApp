"use client";
import Events from "@/pages/employee/events/Events";
import authenticatedSession from "@/utils/authenticatedSession";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";
import { useEffect, useState } from "react";

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
        <div>
            <EmployeeLayout
                page={Pages.Events}
                path={[
                    ["/employee/home/dashboard", "Dashboard"], 
                    ["/employee/home/events", "Events"]
                ]}
            >
                {sessionID &&
                    <Events
                        sessionID={sessionID}
                    />
                }
            </EmployeeLayout>
        </div>
    )
}