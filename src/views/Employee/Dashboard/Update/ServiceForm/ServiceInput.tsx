import { Text } from "@/components/Input/Export";
import { useEffect, useState } from "react";

interface ServiceInputProps {
    name: string;
    onChange: (name: string, value: any) => any;
}

export default function ServiceInput(props: ServiceInputProps) {
    const [values, setValues] = useState<{
        Service: string;
        Division: string;
        Class: string;
    }>({
        Service: '',
        Division: '',
        Class: ''
    });

    return (
        <div>
            <Text
                name={props.name}
                value={values.Service}
                label={'Service'}
                onChange={(name, value) => {
                    setValues({...values, Service: value});
                }}
            />
            <Text
                name={props.name}
                value={values.Division}
                label={'Division'}
                onChange={(name, value) => {
                    setValues({...values, Division: value});
                }}
            />
            <Text
                name={props.name}
                value={values.Class}
                label={'Class'}
                onChange={(name, value) => {
                    setValues({...values, Class: value});
                }}
            />
            <button
                onClick={() => {
                    props.onChange(props.name, values);
                }}
            >
                Add
            </button>
        </div>
    )
}