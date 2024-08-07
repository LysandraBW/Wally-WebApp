import { Checkbox } from "@/components/Input/Export";
import { DefaultState } from "@/hook/State/Interface";
import { Fragment } from "react";

interface ServiceFormProps {
    services: Array<number>;
    loadedServices: {[k: string]: Array<[number, string]>};
    onChange: (name: string, value: any) => void;
}

export default function ServiceForm(props: ServiceFormProps) {
    return (
        <Fragment>
            <Checkbox
                name='services'
                label='Service'
                value={props.services}
                values={props.loadedServices}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
        </Fragment>
    )
}