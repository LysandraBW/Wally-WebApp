'use client';
import { useState, useEffect, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllEmployees, GetAppointment, GetEmployee } from "@/database/Export";
import { getSessionID } from "@/lib/Storage/Storage";
import useInterval from "@/hook/Alert/Timer";
import AlertReducer, { AlertActionType, InitialAlert } from "@/hook/Alert/Reducer";
import { createContext } from "react";
import { DefaultPageContext, PageContextStructure } from "@/process/Employee/Update/Context";
import { goToEmployeeLogin } from "@/lib/Navigation/Navigation";
import SearchAppointment from "@/views/Employee/Dashboard/Update/Action/Search";
import BackToDashboard from "@/components/Button/Text/Dash";
import DeleteAppointment from "@/views/Employee/Dashboard/Update/Action/Button/Delete";
import UpdateAppointmentLabel from "@/views/Employee/Dashboard/Update/Action/Label";
import FormTabs from "@/views/Employee/Dashboard/Update/Action/Tabs";
import Form from "@/views/Employee/Dashboard/Update/Form/Form";
import NoteManager from "@/views/Employee/Dashboard/Update/Form/NoteForm/NoteManager";

let ran = false;
export const PageContext = createContext(DefaultPageContext);

export default function Update() {
    const [context, setContext] = useState(DefaultPageContext);
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);
    const [currentForm, setCurrentForm] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const load = async () => {
            const SessionID = await getSessionID();
            if (!SessionID) {
                goToEmployeeLogin();
                return;
            }

            // Loading Employees (and Context)
            const Employee = await GetEmployee({SessionID});
            const Employees = await GetAllEmployees({SessionID});

            if (!Employee || !Employees.length)
                throw 'Employee(s) Error';

            const loadedContext: PageContextStructure = {
                ...context,
                Employees,
                Employee: {
                    SessionID,
                    Employee
                }
            }

            // Getting Appointment ID
            const AppointmentID = searchParams.get('AptID');
            if (AppointmentID) {
                loadedContext.Appointment = {
                    Appointment: null,
                    AppointmentID,
                    Labels: {}
                }
                // If there's an Apt ID, continue loading
                loadedContext.Paused = false;
            }

            setContext(loadedContext);
        }
        if (ran)
            return;
        load();
        ran = true;
    }, []);

    useEffect(() => {
        const load = async () => {
            // No Apt ID or Employee ID or Loading Paused
            if (!context.Appointment.AppointmentID || !context.Employee.Employee.EmployeeID || context.Paused)
                return;

            const appointment = await GetAppointment({
                SessionID: context.Employee.SessionID, 
                AppointmentID: context.Appointment.AppointmentID
            });

            if (!appointment) {
                setContext({...context, Paused: true});
                throw 'Appointment Not Found Error';
            }
            
            setContext({
                ...context,
                Appointment: {
                    Appointment: appointment,
                    AppointmentID: appointment.AppointmentID,
                    Labels: appointment.Labels
                }
            });
        }
        if (context.Appointment.AppointmentID)
            load();
    }, [context.Appointment.AppointmentID]);

    useInterval(() => {
        alertDispatch({
            type: AlertActionType.RefreshMessages
        });
    }, 1000*1);

    return (
        <PageContext.Provider value={context}>
            <div>
                {alert.confirmation && alert.confirmation}
                {alert.messages.map(([message], i) => (
                    <div key={i}>{message}</div>
                ))}
                {context.Paused && context.Loaded &&
                    <SearchAppointment
                        onSearch={() => {}}
                    />
                }
                {context.Loaded &&
                    <div>
                        <BackToDashboard/>
                        <DeleteAppointment/>
                        <UpdateAppointmentLabel
                            updateContext={(context) => setContext(context)}
                        />
                        <FormTabs
                            currentForm={currentForm}
                            updateCurrentForm={setCurrentForm}
                        />
                        {!!context.Appointment.Appointment &&     
                            <Form
                                currentForm={currentForm}
                                appointment={context.Appointment.Appointment}
                            />
                        }
                        {!!context.Employee.Employee.EmployeeID && !!context.Appointment.Appointment &&  
                            <NoteManager
                                employeeId={context.Employee.Employee.EmployeeID}
                                appointment={context.Appointment.Appointment}
                            />
                        }
                    </div>
                }
            </div>
        </PageContext.Provider>
    )
}