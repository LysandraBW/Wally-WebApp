import { Text } from "@/components/Input/Export";
import { useState } from "react";

interface ServiceLineProps {
    service: {
        ServiceID: number;
        Service: string;
        Class: string;
        Division: string;
    }
    onDelete: () => any;
    onUpdate: (service: {Service: string;
        Class: string;
        Division: string;ServiceID: number;}) => any;   
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
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                >
                    <input 
                        value={values.Class} 
                        onChange={(event) => setValues({...values, Class: event.target.value})}
                        onBlur={() => {
                            if (!values.Class) {
                                setValues({...values, Class: initialClass});
                            }
                        }}
                    />
                    <input 
                        value={values.Division} 
                        onChange={(event) => setValues({...values, Division: event.target.value})}
                        onBlur={() => {
                            if (!values.Division) {
                                setValues({...values, Division: initialDivision});
                            }
                        }}
                    />
                    <input 
                        value={values.Service} 
                        onChange={(event) => setValues({...values, Service: event.target.value})}
                        onBlur={() => {
                            if (!values.Service) {
                                setValues({...values, Service: initialService});
                            }
                        }}
                    />
                </div>
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