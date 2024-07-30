import { Text } from "@/components/Input/Export";
import { DB_AppointmentService, DB_Service } from "@/database/Types";
import { useEffect, useState } from "react";

interface CreateServiceProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_AppointmentService = {
    AppointmentID:          '',
    AppointmentServiceID:   0,
    ServiceID:              null,
    Service:                '',
    Division:               '',
    Class:                  ''
}

export default function CreateService(props: CreateServiceProps) {
    const [values, setValues] = useState<DB_AppointmentService>(defaultInput);

    return (
        <div>
            <Text
                name={'Service'}
                value={values.Service}
                label={'Service'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'Division'}
                value={values.Division}
                label={'Division'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'Class'}
                value={values.Class}
                label={'Class'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <button 
                onClick={() => {
                    props.onChange('Services', values);
                    setValues(values);
                }}
            >
                Add
            </button>
        </div>
    )
}