'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllEmployees, GetAppointment, GetEmployee } from "@/lib/Database/Export";
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
import { DB_Employee, DB_GeneralEmployee } from "@/lib/Database/Types";
import { submitCostForm, submitGeneralForm, submitNotesForm, submitServicesForm, submitVehicleForm } from "@/process/Employee/Update/Submit";

let ran = false;

export default function Update() {
    const searchParams = useSearchParams();
    const [employee, setEmployee] = useState<DB_Employee>();
    const [employees, setEmployees] = useState<Array<DB_GeneralEmployee>>([]);
    const [handler, setHandler] = useState<HandlerStructure>(Handler);
    const [controller, setController] = useState<ControllerStructure>();
    
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
                                onSave: () => submitGeneralForm(controller.ref.General, controller.cur.General),
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
                                onSave: () => submitVehicleForm(controller.ref.Vehicle, controller.cur.Vehicle),
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
                                onSave: () => submitServicesForm(controller.ref.Services, controller.cur.Services),
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
                                onSave: () => {
                                    submitCostForm(controller.ref.Cost, controller.cur.Cost);
                                },
                                onReset: () => resetHandler('Cost')
                            }
                        ]}
                    />
                    {controller && controller.cur && controller.cur.Notes && (
                        <NoteForm
                            form={{
                                Notes: controller.cur.Notes.Notes,
                                EmployeeID: employee && employee.EmployeeID || '',
                                Employees: employees
                            }}
                            changeHandler={changeHandler}
                            onSave={() => submitNotesForm(controller.ref.Notes, controller.cur.Notes)}
                        />
                    )}
                </div>
            }
        </div>
    )
}