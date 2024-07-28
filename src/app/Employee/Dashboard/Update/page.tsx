'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Delete, GetAllEmployees, GetAppointment, GetEmployee, UpdateLabel } from "@/lib/Database/Export";
import Tabbed from "@/components/Form/Tabbed/Tabbed";
import General from "@/views/Employee/Dashboard/Update/GeneralForm";
import Vehicle from "@/views/Employee/Dashboard/Update/VehicleForm";
import Service from "@/views/Employee/Dashboard/Update/ServiceForm/ServiceForm";
import Payment from "@/views/Employee/Dashboard/Update/PaymentForm/PaymentForm";
import NoteForm from "@/views/Employee/Dashboard/Update/NoteForm/NoteForm";
import { ControllerStructure, Handler, HandlerStructure, Parts } from "@/process/Employee/Update/Form";
import { Controller } from "@/process/Employee/Update/Helper";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { goTo } from "@/lib/Navigation/Redirect";
import { DB_AppointmentLabel, DB_AppointmentLabels, DB_Employee, DB_GeneralEmployee } from "@/lib/Database/Types";
import { submitCostForm, submitGeneralForm, submitNotesForm, submitServicesForm, submitVehicleForm } from "@/process/Employee/Update/Submit";
import { sortAppointmentLabels } from "@/lib/Database/Appointment/Label/Helper";
import useInterval from "@/lib/Hook/Timer";
import Message from "@/components/Pop-Up/Message/Message";

let ran = false;

export default function Update() {
    const searchParams = useSearchParams();
    const [employee, setEmployee] = useState<DB_Employee>();
    const [employees, setEmployees] = useState<Array<DB_GeneralEmployee>>([]);
    const [labels, setLabels] = useState<DB_AppointmentLabels>({});
    const [handler, setHandler] = useState<HandlerStructure>(Handler);
    const [controller, setController] = useState<ControllerStructure>();
    const [messages, setMessages] = useState<Array<[React.ReactNode, number]>>([]);
    
    useEffect(() => {
        const load = async () => {
            const SessionID = await getSessionID();
            if (!SessionID) {
                goTo('/Employee/Login');
                return;
            }

            const employee = await GetEmployee({SessionID});
            const employees = await GetAllEmployees({SessionID});
            if (employee && employees.length >= 1) {
                setEmployee(employee);
                setEmployees(employees);
            }

            const appID = searchParams.get('AppID');
            if (appID)
                setHandler({...handler, appID, loading: true});
        }
        if (ran)
            return;
        load();
        ran = true;
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
                setLabels(sortAppointmentLabels(app.Labels));
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
        controller && controller.cur && console.log(controller);
    }, [controller?.cur]);

    useInterval(() => {
        const msgs = [...messages].filter(msg => {
            const elapsedTime = Date.now() - msg[1];
            return elapsedTime < 10*1000;
        });
        setMessages(msgs);
    }, 1000*1);

    const addMessage = async (msg: string, state: number = 0) => {
        const message = (
            <Message
                state={state}
                message={msg}
                close={() => {
                    setMessages(messages.filter(m => m[0] !== message));
                }}
            />
        );

        setMessages([[message, Date.now()], ...messages]);
    }

    const changeHandler = (part: Parts, name: string, value: any, agg?: boolean) => {
        if (!controller)
            return;

        // Set Multiple Values at Once
        if (agg) {
            setController({
                ...controller,
                cur: {
                    ...controller.cur,
                    [`${part}`]: {
                        ...controller.cur[`${part}`],
                        ...value,
                    }
                }
            });
            return;
        }
        // Set a Single Value
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
                    <div onClick={async () => goTo('/Employee/Dashboard/Dashboard')}>
                        Back to Dashboard
                    </div>
                    <div onClick={async () => {
                        const output = await Delete({
                            SessionID: await getSessionID(),
                            AppointmentID: handler.appID
                        });
                        if (!output)
                            throw 'Error';
                        await goTo('/Employee/Dashboard/Dashboard');
                    }}>
                        Delete Appointment
                    </div>
                    <div
                        onClick={async () => {
                            const output = await UpdateLabel({
                                SessionID: await getSessionID(),
                                AppointmentID: handler.appID,
                                LabelID: labels.Flag.LabelID
                            });
                            if (!output)
                                throw 'Error';
                            setLabels({...labels, Flag: {...labels.Flag, Value: 1 - labels.Flag.Value}});
                        }}
                    >
                        {!!labels.Flag.Value ? 'Flagged' : 'Not Flagged'}
                    </div>
                    <div
                        onClick={async () => {
                            const output = await UpdateLabel({
                                SessionID: await getSessionID(),
                                AppointmentID: handler.appID,
                                LabelID: labels.Flag.LabelID
                            });
                            if (!output)
                                throw 'Error';
                            setLabels({...labels, Star: {...labels.Star, Value: 1 - labels.Star.Value}});
                        }}
                    >
                        {!!labels.Star.Value ? 'Starred' : 'Not Starred'}
                    </div>
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
                                onSave: async () => {
                                    const output = await submitGeneralForm(controller.ref.General, controller.cur.General);
                                    if (!output)
                                        addMessage('Couldn\'t Save General, Try Again', -1);
                                    else
                                        addMessage('Saved General');
                                },
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
                                onSave: async () => {
                                    const output = await submitVehicleForm(controller.ref.Vehicle, controller.cur.Vehicle);
                                    if (!output)
                                        addMessage('Couldn\'t Save Vehicles, Try Again', -1);
                                    else
                                        addMessage('Saved Vehicles');
                                },
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
                                onSave: async () => {
                                    const output = await submitServicesForm(controller.ref.Services, controller.cur.Services);
                                    if (!output)
                                        addMessage('Couldn\'t Save Services, Try Again', -1);
                                    else
                                        addMessage('Saved Services');
                                },
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
                                onSave: async () => {
                                    const output = await submitCostForm(controller.ref.Cost, controller.cur.Cost);
                                    if (!output)
                                        addMessage('Couldn\'t Save Payments, Try Again', -1);
                                    else
                                        addMessage('Saved Payments');
                                },
                                onReset: () => resetHandler('Cost')
                            }
                        ]}
                    />
                    {/* Can't Remember Why There's So Much Guards */}
                    {controller && controller.cur && controller.cur.Notes && (
                        <NoteForm
                            form={{
                                Notes: controller.cur.Notes.Notes,
                                EmployeeID: employee && employee.EmployeeID || '',
                                Employees: employees
                            }}
                            changeHandler={changeHandler}
                            onSave={async () => {
                                const output = await submitNotesForm(controller.ref.Notes, controller.cur.Notes);
                                if (!output)
                                    addMessage('Couldn\'t Save Notes, Try Again', -1);
                                else
                                    addMessage('Saved Notes');
                            }}
                        />
                    )}
                </div>
            }
        </div>
    )
}