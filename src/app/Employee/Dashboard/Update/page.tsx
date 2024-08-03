'use client';
import { useState, useEffect, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllEmployees, GetAppointment, GetEmployee } from "@/database/Export";
import NoteForm from "@/views/Employee/Dashboard/Update/Form/NoteForm/NoteForm";
import { getSessionID } from "@/lib/Storage/Storage";
import { goToEmployeeLogin } from "@/lib/Navigation/Redirect";
import useInterval from "@/hook/Alert/Timer";
import { Context, ContextStructure } from "@/process/Employee/Update/Context";
import SearchAppointment from "@/views/Employee/Dashboard/Update/Gadgets/SearchAppointment";
import AlertReducer, { AlertActionType, InitialAlert } from "@/hook/Alert/Reducer";
import { UpdateForm } from "@/process/Employee/Update/Form/Initialize";
import { FormType, UpdateFormStructure } from "@/process/Employee/Update/Form/UpdateForm";
import { submitNoteForm } from "@/process/Employee/Update/Form/Form/Note/Submit";
import { createContext } from "react";
import { updateMessage } from "@/process/Employee/Update/Form/Helper";
import DeleteAppointment from "@/views/Employee/Dashboard/Update/Delete";
import UpdateAppointmentLabel from "@/views/Employee/Dashboard/Update/UpdateLabel";
import BackToDashboard from "@/components/UI/BackToDashboard";
import FormTabs from "@/views/Employee/Dashboard/Update/FormT";
import ResetForm from "@/views/Employee/Dashboard/Update/Gadgets/ResetForm";
import SaveForm from "@/views/Employee/Dashboard/Update/Gadgets/SaveForm";
import Form from "@/views/Employee/Dashboard/Update/Form";

let ran = false;
export const PageContext = createContext(Context);

export default function Update() {
    const [context, setContext] = useState(Context);
    const [updateForm, setUpdateForm] = useState<UpdateFormStructure>();
    const [formStates, setFormStates] = useState<{[formPart: string]: boolean}>({});
    const [currentForm, setCurrentForm] = useState<FormType>('General');

    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);
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

            const loadedContext: ContextStructure = {
                ...context,
                Employee: {
                    SessionID,
                    Employee,
                    Employees
                }
            }

            // Getting Appointment ID
            const AppointmentID = searchParams.get('AptID');
            if (AppointmentID) {
                loadedContext.Appointment = {
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
            if (!context.Appointment.AppointmentID || !context.Employee.Employee.EmployeeID || context.Paused) {
                setUpdateForm(undefined);
                return;
            }

            const appointment = await GetAppointment({
                SessionID: context.Employee.SessionID, 
                AppointmentID: context.Appointment.AppointmentID
            });

            if (!appointment) {
                setUpdateForm(undefined);
                setContext({...context, Paused: true});
                throw 'Appointment Not Found Error';
            }
            
            setContext({
                ...context,
                Appointment: {
                    AppointmentID: appointment.AppointmentID,
                    Labels: appointment.Labels
                }
            });

            setUpdateForm(await UpdateForm(context.Employee.Employee.EmployeeID, appointment));
        }
        if (context.Appointment.AppointmentID)
            load();
    }, [context.Appointment.AppointmentID]);

    useEffect(() => {
        if (!updateForm)
            return;
        setContext({
            ...context, 
            Loaded: true
        });
    }, [updateForm]);

    useInterval(() => {
        alertDispatch({
            type: AlertActionType.RefreshMessages
        });
    }, 1000*1);

    const loadUpdateForm = async () => {
        // No Apt. ID or Employee ID or Loading Paused
        if (!context.Appointment.AppointmentID || !context.Employee.Employee.EmployeeID || context.Paused) {
            setUpdateForm(undefined);
            return;
        }

        const appointment = await GetAppointment({
            SessionID: context.Employee.SessionID, 
            AppointmentID: context.Appointment.AppointmentID
        });

        if (!appointment) {
            setUpdateForm(undefined);
            setContext({...context, Paused: true});
            throw 'Appointment Not Found Error';
        }
        
        setContext({
            ...context,
            Appointment: {
                AppointmentID: appointment.AppointmentID,
                Labels: appointment.Labels
            }
        });

        // Context Loading is Finished Here
        setUpdateForm(await UpdateForm(context.Employee.Employee.EmployeeID, appointment));
    }

    const updateFormHandler = (formPart: FormType, name: string, value: any) => {
        if (!updateForm)
            return;

        let updatedValue = {};
        if (!name)
            updatedValue = {...updateForm.current[`${formPart}`], ...value}
        else
            updatedValue = {...updateForm.current[`${formPart}`], [`${name}`]: value}
        
        setUpdateForm({
            ...updateForm,
            current: {
                ...updateForm.current,
                [`${formPart}`]: updatedValue
            }
        });
    }

    const resetFormHandler = (formPart: FormType) => {
        if (!updateForm)
            return;

        setUpdateForm({
            ...updateForm,
            current: {
                ...updateForm.current,
                [`${formPart}`]: updateForm.reference[`${formPart}`]
            }
        });
    }

    const addMessage = (message: string, output: boolean) => {
        alertDispatch({
            type: AlertActionType.AddMessage,
            addMessage: {
                message,
                messageType: output ? 'Default' : 'Error'
            }
        });
    }

    const saveForm = async <T,> (formPart: FormType, submitForm: (a: T, b: T) => Promise<boolean>) => {
        if (!formStates[`${formPart}`] || !updateForm) {
            addMessage(`Could Not Save ${formPart}`, false);
            return;
        }
    
        const current = updateForm.current[`${formPart}`] as unknown;
        const reference = updateForm.reference[`${formPart}`] as unknown;

        const output = await submitForm(reference as T, current as T);
        if (output)
            await loadUpdateForm();         
        addMessage(updateMessage(formPart, output), output);
    }

    return (
        <PageContext.Provider value={context}>
            <div>
                {alert.confirmation && alert.confirmation}
                {alert.messages.map(([message], i) => (
                    <div key={i}>{message}</div>
                ))}
                {context.Paused && 
                    <SearchAppointment
                        onSearch={() => {}}
                    />
                }
                {context.Loaded && updateForm &&
                    <div>
                        <BackToDashboard/>
                        <DeleteAppointment/>
                        <UpdateAppointmentLabel
                            updateContext={setContext}
                        />
                        <FormTabs
                            currentForm={currentForm}
                            updateCurrentForm={setCurrentForm}
                        />
                        <Form
                            currentForm={currentForm}
                            form={updateForm.current[`${currentForm}`]}
                            changeHandler={updateFormHandler}
                            updateFormState={(state) => setFormStates({...formStates, [`${currentForm}`]: state})}
                        />
                        <SaveForm
                            currentForm={currentForm}
                            onSave={async (submitFunction) => await saveForm(currentForm, submitFunction)}
                        />
                        <ResetForm
                            onReset={() => resetFormHandler(currentForm)}
                        />
                        <NoteForm
                            form={updateForm.current.Note}
                            changeHandler={updateFormHandler}
                            onSave={async () => await saveForm('Note', submitNoteForm)}
                            updateFormState={(state) => setFormStates({...formStates, Note: state})}
                        />
                    </div>
                }
            </div>
        </PageContext.Provider>
    )
}