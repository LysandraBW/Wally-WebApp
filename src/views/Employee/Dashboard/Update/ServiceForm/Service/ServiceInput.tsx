import { Text } from "@/components/Input/Export";
import { DB_AppointmentService, DB_Service } from "@/lib/Database/Types";
import { useEffect, useState } from "react";

interface ServiceInputProps {
    onChange: (name: string, value: any) => any;
}

export default function ServiceInput(props: ServiceInputProps) {
    const [values, setValues] = useState<DB_AppointmentService>({
        AppointmentID: '',
        AppointmentServiceID: 0,
        ServiceID: null,
        Service: '',
        Division: '',
        Class: ''
    });

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
            <button onClick={() => props.onChange('Services', values)}>Add</button>
        </div>
    )
}