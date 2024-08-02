import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { every, hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { Regexes } from "@/lib/Inspector/Inspectors";
import { goToUpdateApt } from "@/lib/Navigation/Redirect";
import { UpdateEvent as UpdateEventData } from "@/process/Employee/Calendar/Form/Form";
import { updatedValue } from "@/lib/Process/Difference";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useContext, useEffect, useReducer, useState } from "react";

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
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

    useEffect(() => {
        setValues(props.event);
    }, [props.event]);

    useEffect(() => {
        if (isEvent())
            props.onUpdate(values);
    }, [values]);

    
    const inspectName = async (name: string = values.Name): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(name);
        formErrorDispatch({
            name: 'Name',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectSummary = async (summary: string = values.Summary): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(summary);
        formErrorDispatch({
            name: 'Summary',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectSharees = async (sharees: Array<string> = values.Sharees): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(sharees);
        formErrorDispatch({
            name: 'Sharees',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectDate = async (date: string = values.UpdatedEvent): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(date);
        formErrorDispatch({
            name: 'UpdatedEvent',
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
                                        inspectName(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Name)
                                            return;
                                        
                                        setValues({...values, Name: initialEventData.Name});
                                        inspectName(initialEventData.Name);
                                    }}
                                />
                                {formError.input.Name && !formError.input.Name.state &&
                                    <span>{formError.input.Name.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Summary} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Summary: value});
                                        inspectSummary(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Summary)
                                            return;
                                        
                                        setValues({...values, Summary: initialEventData.Summary});
                                        inspectSummary(initialEventData.Summary);
                                    }}
                                />
                                {formError.input.Summary && !formError.input.Summary.state &&
                                    <span>{formError.input.Summary.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='datetime-local'
                                    value={values.UpdatedEvent} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, UpdatedEvent: value});
                                        inspectDate(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Date)
                                            return;

                                        setValues({...values, UpdatedEvent: initialEventData.UpdatedEvent});
                                        inspectDate(initialEventData.UpdatedEvent)
                                    }}
                                />  
                                {formError.input.UpdatedEvent && !formError.input.UpdatedEvent.state &&
                                    <span>{formError.input.UpdatedEvent.message}</span>
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
                                                error={formError.input.Sharees}
                                                onChange={async (name, value) => {
                                                    const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                                    setValues({...values, Sharees: updatedValue});
                                                    inspectSharees(updatedValue);
                                                }}
                                            />
                                        }
                                    </div>
                                ))}
                                {formError.input.Sharees && !formError.input.Sharees.state &&
                                    <span>{formError.input.Sharees.message}</span>
                                }
                            </div>
                            <button 
                                onClick={() => {
                                    if (!formError.state)
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