import { Text } from "@/components/Input/Export";
import { DB_AppointmentService, DB_Service } from "@/database/Types";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { useEffect, useReducer, useState } from "react";

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
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    const inspectServiceInput = async (): Promise<boolean> => {
        const [serviceState, serviceMessage] = await hasValue().inspect(values.Service);
        formErrorDispatch({
            name: 'Service',
            inspection: [serviceState, serviceMessage]
        });

        const [divisionState, divisionMessage] = await hasValue().inspect(values.Division);
        formErrorDispatch({
            name: 'Division',
            inspection: [divisionState, divisionMessage]
        });

        const [classState, classMessage] = await hasValue().inspect(values.Class);
        formErrorDispatch({
            name: 'Class',
            inspection: [classState, classMessage]
        });

        return serviceState && divisionState && classState;
    }

    return (
        <div>
            <Text
                name={'Service'}
                value={values.Service}
                error={formError.input.Service}
                label={'Service'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    formErrorDispatch({
                        name: 'Service',
                        inspection: await hasValue().inspect(value)
                    });
                }}
            />
            <Text
                name={'Division'}
                value={values.Division}
                error={formError.input.Division}
                label={'Division'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    formErrorDispatch({
                        name: 'Division',
                        inspection: await hasValue().inspect(value)
                    });
                }}
            />
            <Text
                name={'Class'}
                value={values.Class}
                error={formError.input.Class}
                label={'Class'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    formErrorDispatch({
                        name: 'Class',
                        inspection: await hasValue().inspect(value)
                    });
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectServiceInput()))
                        return;
                    props.onChange('Services', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}