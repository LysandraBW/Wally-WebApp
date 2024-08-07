import { DefaultState } from "@/hook/State/Interface";
import { Text, Search } from '@/components/Input/Export';
import { Fragment } from "react";

interface VehicleFormProps {
    form: {
        vin:        string;
        make:       Array<string>;
        model:      Array<string>;
        modelYear:  Array<number>;
    };
    loadedValues: {
        makes:      Array<[string, string]>;
        models:     Array<[string, string]>;
        modelYears: Array<[number, string]>;
    };
    onChange: (name: string, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='vin'
                label='VIN'
                value={props.form.vin}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                size={10}
                name='modelYear'
                label='Model Year'
                defaultLabel='Select a Year'
                value={props.form.modelYear}
                values={props.loadedValues.modelYears}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                size={10}
                name='make'
                label='Make'
                defaultLabel='Select a Make'
                value={props.form.make}
                values={props.loadedValues.makes}
                onChange={(name, value) => props.onChange(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                name='model'
                label='Model'
                defaultLabel='Select a Model'
                value={props.form.model}
                values={props.loadedValues.models}
                onChange={(name, value) => props.onChange(name, value)}
                disabled={!props.form.modelYear[0] || !props.form.make[0]}
                size={10}
                state={DefaultState}
                onBlur={null}
            />
        </Fragment>
    )
}