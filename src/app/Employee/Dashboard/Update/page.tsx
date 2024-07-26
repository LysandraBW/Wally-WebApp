'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAppointment } from "@/lib/Database/Export";
import Tabbed from "@/components/Form/Tabbed/Tabbed";
import General from "@/views/Employee/Dashboard/Update/GeneralForm";
import Vehicle from "@/views/Employee/Dashboard/Update/VehicleForm";
import Service from "@/views/Employee/Dashboard/Update/ServiceForm/ServiceForm";
import Payment from "@/views/Employee/Dashboard/Update/PaymentForm/PaymentForm";
import NoteForm from "@/views/Employee/Dashboard/Update/NoteForm/NoteForm";
import { Controller, ControllerStructure, Handler, HandlerStructure, Parts } from "@/process/Employee/Update/Form";
import { getSessionID } from "@/lib/Cookies/Cookies";

let ran = false;

export default function Update() {
    const searchParams = useSearchParams();
    const [handler, setHandler] = useState<HandlerStructure>(Handler);
    const [controller, setController] = useState<ControllerStructure>();
    
    useEffect(() => {
        if (ran)
            return;
        ran = true;
   
        const sAppID = searchParams.get('AppID');
        if (sAppID)
            setHandler({...handler, appID: sAppID, loading: true});
    }, []);

    useEffect(() => {
        const loadApp = async () => {
            if (handler.appID) {
                const app = await GetAppointment({
                    SessionID: await getSessionID(), 
                    AppointmentID: handler.appID
                });

                if (!app) {
                    setHandler({...handler, loading: false, loaded: true});
                    setController(undefined);
                    throw 'App Error';
                }

                setController(await Controller(app));
            }
            else {
                setHandler({...handler, loading: false, loaded: true});
                setController(undefined);
            }
        }
        if (handler.appID)
            loadApp();
    }, [handler.appID]);

    useEffect(() => {
        if (controller)
            setHandler({...handler, loading: false, loaded: true});
    }, [controller]);

    useEffect(() => {
        controller && controller.cur && console.log(controller.cur);
    }, [controller?.cur]);

    const changeHandler = (part: Parts, name: string, value: any) => {
        if (!controller)
            return;

        console.log(value);

        setController({
            ...controller,
            cur: {
                ...controller.cur,
                [`${part}`]: {
                    ...controller.cur[`${part}`],
                    [`${name}`]: value
                }
            }
        });
    }

    const resetHandler = (part: Parts) => {
        if (!controller)
            return;

        setController({
            ...controller,
            cur: {
                ...controller.cur,
                [`${part}`]: controller.ref[`${part}`]
            }
        });
    }

    return (
        <div>
            {handler.loaded && !controller && 
                <div>
                    <h1>Start by Finding an Appointment</h1>
                    <div>
                        <input name='appID' onChange={(event) => setHandler({...handler, searchAppID: event.target.value})}/>
                        <button onClick={() => setHandler({...handler, appID: handler.searchAppID})}>
                            Go
                        </button>
                    </div>
                </div>
            }
            {handler.loaded && controller &&
                <div>
                    <Tabbed
                        parts={[
                            {
                                part: (
                                    <General
                                        form={controller.cur.General}
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
                                        form={controller.cur.Vehicle}
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
                                        form={controller.cur.Services}
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
                                        form={controller.cur.Cost}
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
                        form={{
                            ...controller.cur.Notes,
                            EmployeeID: '',
                            Employees: []
                        }}
                        changeHandler={changeHandler}
                    />
                </div>
            }
        </div>
    )
}