import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { goToUpdateApt } from "@/lib/Navigation/Redirect";
import { UpdateEvent as UpdateEventData } from "@/process/Employee/Calendar/Form/Form";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useContext, useEffect, useReducer, useState } from "react";
import { hasValue, validDate } from "@/validation/Validation";
import { every } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { Regexes } from "@/lib/Inspector/Inspectors";

interface UpdateEventProps {
    event: UpdateEventData;
    onClose:  () => void;
    onDelete: () => void;
    onUpdate: (event: UpdateEventData, updateDatabase?: boolean) => void;
    updateFormError: (state: boolean) => void;
}

export default function UpdateEvent(props: UpdateEventProps) {
    const context = useContext(PageContext);
    const initialEventData = {...props.event};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.event);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formState.state);
    }, [formState.state]);

    useEffect(() => {
        setValues(props.event);
    }, [props.event]);

    useEffect(() => {
        if (isEvent())
            props.onUpdate(values);
    }, [values]);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    const isEventOwner = (employeeID: string = context.Employee.EmployeeID): boolean => {
        return props.event.EmployeeID === employeeID;
    }

    const isEvent = (): boolean => {
        return !!props.event.EventID;
    }

    const getEventOwner = (): DB_GeneralEmployee => {
        for (const employee of context.Employees)
            if (employee.EmployeeID === props.event.EmployeeID)
                return employee;
        throw 'Employee Not Found';
    }

    const getEventOwnerTag = (): React.ReactNode => {
        const eventOwner = getEventOwner();
        return (
            <p>Owned By {eventOwner.FName} {eventOwner.LName}</p>
        );
    }

    const getEventShareesTag = (): React.ReactNode => {
        if (!isEventOwner())
            return <></>;
        return (
            <div>
                <p>Shared With</p>
                <ul>
                    {context.Employees.filter(e => values.Sharees.includes(e.EmployeeID)).map((e, i) => (
                        <li key={i}>
                            {e.FName} {e.LName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <span
                onClick={() => {
                    setEdit(false);
                    if (isEvent())
                        props.onUpdate(values);
                    props.onClose();
                }}
            >
                x
            </span>
            {edit && 
                <Multiple
                    onBlur={() => 1}
                    children={(
                        <div>
                            <div>
                                <input 
                                    value={values.Name} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Name: value});
                                        inspectInput('Name', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Name)
                                            return;
                                        setValues({...values, Name: initialEventData.Name});
                                        inspectInput('Name', initialEventData.Name, hasValue);
                                    }}
                                />
                                {formState.input.Name && !formState.input.Name.state &&
                                    <span>{formState.input.Name.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Summary} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Summary: value});
                                        inspectInput('Summary', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Summary)
                                            return;
                                        setValues({...values, Summary: initialEventData.Summary});
                                        inspectInput('Summary', initialEventData.Summary, hasValue);
                                    }}
                                />
                                {formState.input.Summary && !formState.input.Summary.state &&
                                    <span>{formState.input.Summary.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='datetime-local'
                                    value={values.UpdatedEvent} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, UpdatedEvent: value});
                                        inspectInput('UpdatedEvent', values.UpdatedEvent, validDate);
                                    }}
                                    onBlur={() => {
                                        if (values.UpdatedEvent)
                                            return;
                                        setValues({...values, UpdatedEvent: initialEventData.UpdatedEvent});
                                        inspectInput('UpdatedEvent', initialEventData.UpdatedEvent, validDate);
                                    }}
                                />  
                                {formState.input.UpdatedEvent && !formState.input.UpdatedEvent.state &&
                                    <span>{formState.input.UpdatedEvent.message}</span>
                                }
                            </div>
                            <div>
                                {context.Employees.map((employee, i) => (
                                    <div key={i}>
                                        {context.Employee.EmployeeID !== employee.EmployeeID && 
                                            <Toggle
                                                name='Sharees'
                                                label={`Add ${employee.FName} ${employee.LName}`}
                                                value={values.Sharees.includes(employee.EmployeeID) ? 1 : 0}
                                                error={formState.input.Sharees}
                                                onChange={async (name, value) => {
                                                    const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                                    setValues({...values, Sharees: updatedValue});
                                                    inspectInput('Sharees', updatedValue, async (v) => await every({
                                                        callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
                                                    }).inspect(v));
                                                }}
                                            />
                                        }
                                    </div>
                                ))}
                                {formState.input.Sharees && !formState.input.Sharees.state &&
                                    <span>{formState.input.Sharees.message}</span>
                                }
                            </div>
                            <button 
                                onClick={() => {
                                    if (!formState.state)
                                        return;
                                    setEdit(false);
                                    props.onUpdate(values, true);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    {/* Cannot Update a Non-Owned Event or an Appointment */}
                    <div>
                        <h4>{values.Name}</h4>
                        <p>{values.Summary}</p>
                        <p>{getTimeFromWebDateTime(values.UpdatedEvent)}</p>
                        {isEvent() && 
                            <>        
                                {getEventOwnerTag()}
                                {getEventShareesTag()}
                            </>
                        }
                        {!isEvent() && 
                            <span
                                onClick={() => goToUpdateApt(values.AppointmentID)}
                            >
                                Update Appointment
                            </span>
                        }
                        {isEvent() && isEventOwner() &&
                            <span onClick={() => setEdit(true)}>Edit Event</span>
                        }
                    </div>
                    {isEvent() &&
                        <span 
                            onClick={() => props.onDelete()}
                        >
                            {isEventOwner() ? 'Delete Event' : 'Remove Event'}
                        </span>                    
                    }
                </div>
            }
        </div>
    )
}