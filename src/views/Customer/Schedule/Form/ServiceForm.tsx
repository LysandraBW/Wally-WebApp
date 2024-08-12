import { Checkbox } from "@/components/Input/Export";
import { LoadedType } from "@/process/Customer/Schedule/Loaded";
import { StateType } from "@/process/Customer/Schedule/State";
import { DataKeys, DataType } from "@/submission/Customer/Schedule/Data";
import { Fragment } from "react";

interface ServiceFormProps {
    data: DataType;
    state: StateType;
    loaded: LoadedType;
    onChange: (name: DataKeys, value: any) => void;
}

export default function ServiceForm(props: ServiceFormProps) {
    return (
        <Fragment>
            <Checkbox
                name='services'
                label='Service'
                value={props.data.Services}
                state={props.state.Services}
                values={props.loaded.Services}
                onChange={(name, value) => props.onChange('Services', value)}
                onBlur={null}
            />
        </Fragment>
    )
}