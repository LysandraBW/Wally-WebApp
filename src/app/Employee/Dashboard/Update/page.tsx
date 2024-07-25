'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { GetAppointment } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Authorize/Authorize";

export default function Update() {
    const searchParams = useSearchParams();
    const [appID, setAppID] = useState('');
    const [app, setApp] = useState<Appointment>();
    const [searchAppID, setSearchAppID] = useState('');
    
    useEffect(() => {
        const appID = searchParams.get('AppID');
        if (appID)
            setAppID(appID);
    }, []);

    useEffect(() => {
        const loadApp = async () => {
            if (appID) {
                const app = await GetAppointment({SessionID: await getSessionID(), AppointmentID: appID});
                if (!app)
                    throw 'App Error';
                setApp(app);
            }
        }
        loadApp();
    }, [appID]);

    return (
        <div>
            {!appID && 
                <div>
                    <h1>Start by Finding an Appointment</h1>
                    <div>
                        <input name='appID' onChange={(event) => setSearchAppID(event.target.value)}/>
                        <button onClick={() => setAppID(searchAppID)}>
                            Go
                        </button>
                    </div>
                </div>
            }
            {appID && app &&
                <div>
                    {JSON.stringify(app)}    
                </div>
            }
        </div>
    )
}