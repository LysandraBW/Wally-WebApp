'use client';
import { useState, useEffect, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { Delete, GetAllEmployees, GetAppointment, GetEmployee, UpdateLabel } from "@/database/Export";
import Tabbed from "@/components/Form/Tabbed/Tabbed";
import GeneralForm from "@/views/Employee/Dashboard/Update/GeneralForm";
import VehicleForm from "@/views/Employee/Dashboard/Update/VehicleForm";
import ServiceForm from "@/views/Employee/Dashboard/Update/ServiceForm/ServiceForm";
import PaymentForm from "@/views/Employee/Dashboard/Update/PaymentForm/PaymentForm";
import NoteForm from "@/views/Employee/Dashboard/Update/NoteForm/NoteForm";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { goTo, goToDashboard, goToEmployeeLogin } from "@/lib/Navigation/Redirect";
import useInterval from "@/reducer/Alert/Timer";
import { Context, ContextStructure } from "@/process/Employee/Update/Context";
import Search from "@/views/Employee/Dashboard/Update/Search";
import AlertReducer, { AlertActionType, InitialAlert } from "@/reducer/Alert/Reducer";
import { UpdateForm } from "@/process/Employee/Update/Form/Initialize";
import { FormPart, UpdateFormStructure } from "@/process/Employee/Update/Form/UpdateForm";
import { submitGeneralForm } from "@/process/Employee/Update/Form/Form/General/Submit";
import { submitVehicleForm } from "@/process/Employee/Update/Form/Form/Vehicle/Submit";
import { submitPaymentForm } from "@/process/Employee/Update/Form/Form/Payment/Submit";
import { submitNoteForm } from "@/process/Employee/Update/Form/Form/Note/Submit";
import { submitServiceForm } from "@/process/Employee/Update/Form/Form/Service/Submit";
import { createContext } from "react";

let ran = false;
export const PageContext = createContext(Context);

export default function Update() {
    const searchParams = useSearchParams();
    const [context, setContext] = useState<ContextStructure>(Context);
    const [updateForm, setUpdateForm] = useState<UpdateFormStructure>();
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);

    useEffect(() => {
        const load = async () => {
            const SessionID = await getSessionID();
            if (!SessionID) {
                goToEmployeeLogin();
                return;
            }

            // Loading Context
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
                // If the appointment is found,
                // we can continue loading.
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
        // We reload the appointment and the update form
        // when the contextual appointment ID has changed.
        const load = async () => {
            // No Apt. ID or Loading Paused
            if (!context.Appointment.AppointmentID || context.Paused) {
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
            setUpdateForm(await UpdateForm(appointment));
        }
        if (context.Appointment.AppointmentID)
            load();
    }, [context.Appointment.AppointmentID]);

    useEffect(() => {
        if (!updateForm)
            return;

        // I think we can remove the 'Loading' state.
        setContext({
            ...context, 
            Loading: false, 
            Loaded: true
        });
    }, [updateForm]);

    useInterval(() => {
        alertDispatch({
            type: AlertActionType.RefreshMessages
        });
    }, 1000*1);

    const updateFormHandler = (formPart: FormPart, name: string, value: any) => {
        if (!updateForm)
            return;

        // Updating the Entire Form Part
        if (!name) {
            setUpdateForm({
                ...updateForm,
                current: {
                    ...updateForm.current,
                    [`${formPart}`]: value
                }
            });

        }
        // Updating a Section of a Form Part
        else {
            setUpdateForm({
                ...updateForm,
                current: {
                    ...updateForm.current,
                    [`${formPart}`]: {
                        ...updateForm.current[`${formPart}`],
                        [`${name}`]: {
                            value
                        }
                    }
                }
            });
        }
    }

    const resetFormHandler = (formPart: FormPart) => {
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

    const deleteAppointment = async () => {
        const output = await Delete({
            SessionID: context.Employee.SessionID,
            AppointmentID: context.Appointment.AppointmentID
        });
        
        if (!output)
            throw 'Couldn\'t Delete Appointment';

        await goToDashboard();
    }

    const updateAppointmentLabel = async (labelName: string) => {
        const output = await UpdateLabel({
            SessionID: context.Employee.SessionID,
            AppointmentID: context.Appointment.AppointmentID,
            LabelID: context.Appointment.Labels[`${labelName}`].LabelID
        });

        if (!output)
            throw 'Update Appointment Label Error';

        setContext({
            ...context, 
            Appointment: {
                ...context.Appointment,
                Labels: {                    
                    ...context.Appointment.Labels,
                    [`${labelName}`]: {
                        ...context.Appointment.Labels[`${labelName}`],
                        Value: 1 - context.Appointment.Labels[`${labelName}`].Value
                    }
                }
            }
        });
    }

    const saveGeneralForm = async () => {
        if (!updateForm)
            return;
        const output = await submitGeneralForm(
            updateForm.reference.General, 
            updateForm.current.General
        );                                    
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: '',
                messageType: 'Default'
            }
        });
    }

    const saveVehicleForm = async () => {
        if (!updateForm)
            return;
        const output = await submitVehicleForm(
            updateForm.reference.Vehicle, 
            updateForm.current.Vehicle
        );                                    
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: '',
                messageType: 'Default'
            }
        });
    }

    const saveServiceForm = async () => {
        if (!updateForm)
            return;
        const output = await submitServiceForm(
            updateForm.reference.Service, 
            updateForm.current.Service
        );                                    
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: '',
                messageType: 'Default'
            }
        });
    }

    const savePaymentForm = async () => {
        if (!updateForm)
            return;
        const output = await submitPaymentForm(
            updateForm.reference.Payment, 
            updateForm.current.Payment
        );                                    
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: '',
                messageType: 'Default'
            }
        })
    }

    const saveNoteForm = async () => {
        if (!updateForm)
            return;
        const output = await submitNoteForm(
            updateForm.reference.Note, 
            updateForm.current.Note
        );                                    
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: '',
                messageType: 'Default'
            }
        });
    }

    return (
        <PageContext.Provider value={context}>
            <div>
                {/* Displaying Confirmation */}
                {alert.confirmation && alert.confirmation}

                {/* Displaying Messages */}
                {alert.messages.map(([message], i) => <div key={i}>{message}</div>)}

                {context.Paused && 
                    <Search
                        onSearch={() => {}}
                    />
                }
                {context.Loaded && updateForm &&
                    <div>
                        <div onClick={async () => goToDashboard()}>
                            Back to Dashboard
                        </div>
                        <div onClick={async () => deleteAppointment()}>
                            Delete Appointment
                        </div>
                        <div onClick={async () => updateAppointmentLabel('Flag')}>
                            {!!context.Appointment.Labels.Flag.Value ? 'Flagged' : 'Not Flagged'}
                        </div>
                        <div onClick={async () => updateAppointmentLabel('Star')}>
                            {!!context.Appointment.Labels.Star.Value ? 'Starred' : 'Not Starred'}
                        </div>
                        <Tabbed
                            parts={[
                                {
                                    part: 
                                    (
                                        <GeneralForm
                                            form={updateForm.current.General}
                                            changeHandler={updateFormHandler}
                                        />
                                    ),
                                    partHeader: 'General',
                                    onSave: async () => await saveGeneralForm(),
                                    onReset: () => resetFormHandler('General')
                                },
                                {
                                    part: 
                                    (
                                        <VehicleForm
                                            form={updateForm.current.Vehicle}
                                            changeHandler={updateFormHandler}
                                        />
                                    ),
                                    partHeader: 'Vehicle',
                                    onSave: async () => await saveVehicleForm(),
                                    onReset: () => resetFormHandler('Vehicle')
                                },
                                {
                                    part: 
                                    (
                                        <ServiceForm
                                            form={updateForm.current.Service}
                                            changeHandler={updateFormHandler}
                                        />
                                    ),
                                    partHeader: 'Service',
                                    onSave: async () => await saveServiceForm(),
                                    onReset: () => resetFormHandler('Service')
                                },
                                {
                                    part:
                                    (
                                        <PaymentForm
                                            form={updateForm.current.Payment}
                                            changeHandler={updateFormHandler}
                                        />
                                    ),
                                    partHeader: 'Payment',
                                    onSave: async () => await savePaymentForm(),
                                    onReset: () => resetFormHandler('Payment')
                                }
                            ]}
                        />
                        {context.Loaded && updateForm &&
                            <NoteForm
                                form={updateForm.current.Note}
                                changeHandler={updateFormHandler}
                                onSave={async () => await saveNoteForm()}
                            />
                        }
                    </div>
                }
            </div>
        </PageContext.Provider>
    )
}