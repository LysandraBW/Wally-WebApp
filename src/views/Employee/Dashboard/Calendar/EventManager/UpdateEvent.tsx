import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { Multiple, Toggle } from "@/components/Input/Export";
import { DB_Employee, DB_GeneralEmployee } from "@/database/Types";
import { getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { goToUpdateApt } from "@/lib/Navigation/Redirect";
import { UpdateEvent as UpdateEventData } from "@/process/Employee/Calendar/Form/Form";
import { useContext, useEffect, useState } from "react";

interface UpdateEventProps {
    event: UpdateEventData;
    onClose:  () => void;
    onDelete: () => void;
    onUpdate: (event: UpdateEventData, updateDatabase?: boolean) => void;
}

export default function UpdateEvent(props: UpdateEventProps) {
    const context = useContext(PageContext);
    const initialEventData = {...props.event};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.event);

    useEffect(() => {
        setValues(props.event);
    }, [props.event]);

    useEffect(() => {
        if (isEvent())
            props.onUpdate(values);
    }, [values]);

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
                            <input 
                                value={values.Name} 
                                onChange={(event) => setValues({...values, Name: event.target.value})}
                                onBlur={() => {
                                    if (!values.Name) {
                                        setValues({...values, Name: initialEventData.Name});
                                    }
                                }}
                            />
                            <input 
                                value={values.Summary} 
                                onChange={(event) => setValues({...values, Summary: event.target.value})}
                                onBlur={() => {
                                    if (!values.Summary) {
                                        setValues({...values, Summary: initialEventData.Summary});
                                    }
                                }}
                            />
                            <input 
                                type='datetime-local'
                                value={values.UpdatedEvent} 
                                onChange={(event) => setValues({...values, UpdatedEvent: event.target.value})}
                                onBlur={() => {
                                    if (!values.Date) {
                                        setValues({...values, Date: initialEventData.Date});
                                    }
                                }}
                            />
                            <div>
                                {context.Employees.map((employee, i) => (
                                    <div key={i}>
                                        {context.Employee.EmployeeID !== employee.EmployeeID && 
                                            <Toggle
                                                name='Sharees'
                                                label={`Add ${employee.FName} ${employee.LName}`}
                                                value={values.Sharees.includes(employee.EmployeeID) ? 1 : 0}
                                                onChange={(name, value) => {
                                                    setValues({
                                                        ...values, 
                                                        Sharees: toggleValue(values.Sharees, employee.EmployeeID)
                                                    });
                                                }}
                                            />
                                        }
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => {
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