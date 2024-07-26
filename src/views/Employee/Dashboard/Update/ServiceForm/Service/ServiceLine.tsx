import { Multiple } from "@/components/Input/Export";
import { DB_AppointmentService } from "@/lib/Database/Types";
import { useState } from "react";

interface ServiceLineProps {
    service: DB_AppointmentService
    onDelete: () => any;
    onUpdate: (service: DB_AppointmentService) => any;   
}

export default function ServiceLine(props: ServiceLineProps) {
    const initialService = props.service.Service;
    const initialClass = props.service.Class;
    const initialDivision = props.service.Division;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.service);

    return (
        <>
            {edit && 
                <Multiple
                    onBlur={() => {
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <input 
                                value={values.Class} 
                                onChange={(event) => setValues({...values, Class: event.target.value})}
                                onBlur={() => !values.Class && setValues({...values, Class: initialClass})}
                            />
                            <input 
                                value={values.Division} 
                                onChange={(event) => setValues({...values, Division: event.target.value})}
                                onBlur={() => !values.Division && setValues({...values, Division: initialDivision})}
                            />
                            <input 
                                value={values.Service} 
                                onChange={(event) => setValues({...values, Service: event.target.value})}
                                onBlur={() => !values.Service && setValues({...values, Service: initialService})}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>{props.service.Class} - {props.service.Division} - {props.service.Service}</span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}