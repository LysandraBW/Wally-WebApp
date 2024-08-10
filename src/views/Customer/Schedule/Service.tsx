import { Checkbox } from "@/components/Input/Export";
import { DefaultState } from "@/hook/State/Interface";
import { loadServices } from "@/lib/Service/Load";
import { Fragment, useEffect, useState } from "react";

interface ServiceFormProps {
    form: Array<number>;
    onChange: (name: string, value: any) => void;
}

export default function ServiceForm(props: ServiceFormProps) {
    const [loadedValues, setLoadedValues] = useState<any>();

    useEffect(() => {
        const load = async () => {
            const services = await loadServices();
            setLoadedValues(services);
        }
        load();
    }, []);
    
    return (
        <Fragment>
            {loadedValues &&                
                <Checkbox
                    name='services'
                    label='Service'
                    value={props.form}
                    values={loadedValues}
                    onChange={(name, value) => props.onChange(name, value)}
                    state={DefaultState}
                    onBlur={null}
                />
            }
        </Fragment>
    )
}