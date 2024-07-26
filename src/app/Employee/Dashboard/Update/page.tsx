'use client';
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { GetAppointment } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Authorize/Authorize";
import { NoteSharee } from "@/lib/Database/Appointment/SharedNote/Select";
import { appToForm, Form, Parts } from "@/lib/Form/Employee/Update/Form";
import Tabbed from "@/components/Form/Tabbed/Tabbed";
import General from "@/views/Employee/Dashboard/Update/GeneralForm";
import Vehicle from "@/views/Employee/Dashboard/Update/VehicleForm";
import Service from "@/views/Employee/Dashboard/Update/ServiceForm/ServiceForm";
import Payment from "@/views/Employee/Dashboard/Update/PaymentForm/PaymentForm";
import NoteForm from "@/views/Employee/Dashboard/Update/NoteForm/NoteForm";

interface App {
    ref: Form;
    update: Form;
}

let ran = false;

export default function Update() {
    // For Initializing
    const searchParams = useSearchParams();
    const [appID, setAppID] = useState<{[k: string]: any}>({
        appID: '',
        searchAppID: '',
        loading: false,
        loaded: false
    });

    // After Initialization
    const [app, setApp] = useState<App>();
    
    useEffect(() => {
        if (ran)
            return;
        ran = true;
   
        const sAppID = searchParams.get('AppID');
        if (sAppID)
            setAppID({...appID, appID: sAppID, loading: true});
    }, []);

    useEffect(() => {
        const loadApp = async () => {
            if (appID.appID) {
                const app = await GetAppointment({
                    SessionID: await getSessionID(), 
                    AppointmentID: appID.appID
                });

                if (!app) {
                    setAppID({...appID, loading: false, loaded: true});
                    setApp(undefined);
                    throw 'App Error';
                }

                const form = await appToForm(app);
                setApp({
                    ref: form, 
                    update: form
                });
            }
            else {
                setAppID({...appID, loading: false, loaded: true});
                setApp(undefined);
            }
        }
        if (appID.appID)
            loadApp();
    }, [appID.appID]);

    useEffect(() => {
        if (app)
            setAppID({...appID, loading: false, loaded: true});
    }, [app]);

    useEffect(() => {
        app && app.update && console.log(app.update);
    }, [app?.update]);

    const changeHandler = (part: Parts, name: string, value: any) => {
        if (!app)
            return;

        console.log(value);

        setApp({
            ...app,
            update: {
                ...app.update,
                [`${part}`]: {
                    ...app.update[`${part}`],
                    [`${name}`]: value
                }
            }
        });
    }

    const resetHandler = (part: Parts) => {
        if (!app)
            return;

        setApp({
            ...app,
            update: {
                ...app.update,
                [`${part}`]: app.ref[`${part}`]
            }
        });
    }

    return (
        <div>
            {appID.loaded && !app && 
                <div>
                    <h1>Start by Finding an Appointment</h1>
                    <div>
                        <input name='appID' onChange={(event) => setAppID({...appID, searchAppID: event.target.value})}/>
                        <button onClick={() => setAppID({...appID, appID: appID.searchAppID})}>
                            Go
                        </button>
                    </div>
                </div>
            }
            {appID.loaded && app &&
                <div>
                    <Tabbed
                        parts={[
                            {
                                part: (
                                    <General
                                        form={app.update.General}
                                        changeHandler={changeHandler}
                                    />
                                ),
                                partHeader: 'General',
                                onSave: () => 1,
                                onReset: () => resetHandler('General')
                            },
                            {
                                part: (
                                    <Vehicle
                                        form={app.update.Vehicle}
                                        changeHandler={changeHandler}
                                    />
                                ),
                                partHeader: 'Vehicle',
                                onSave: () => 1,
                                onReset: () => resetHandler('Vehicle')
                            },
                            {
                                part: (
                                    <Service
                                        form={app.update.Services}
                                        changeHandler={changeHandler}
                                    />
                                ),
                                partHeader: 'Service',
                                onSave: () => 1,
                                onReset: () => resetHandler('Services')
                            },
                            {
                                part: (
                                    <Payment
                                        form={app.update.Cost}
                                        changeHandler={changeHandler}
                                    />
                                ),
                                partHeader: 'Payment',
                                onSave: () => 1,
                                onReset: () => resetHandler('Cost')
                            }
                        ]}
                    />
                    <NoteForm
                        form={app.update.Notes}
                        changeHandler={changeHandler}
                    />
                </div>
            }
        </div>
    )
}