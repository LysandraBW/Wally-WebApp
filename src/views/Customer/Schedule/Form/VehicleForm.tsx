import { Text, Search } from '@/components/Input/Export';
import { Fragment } from "react";
import { DataKeys, DataType } from "@/submission/Customer/Schedule/Data";
import { StateType } from "@/process/Customer/Schedule/State";
import { LoadedType } from "@/process/Customer/Schedule/Loaded";

interface VehicleFormProps {
    data: DataType;
    state: StateType;
    loaded: LoadedType;
    onChange: (name: DataKeys, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='vin'
                label='VIN'
                value={props.data.VIN}
                state={props.state.VIN}
                onChange={(name, value) => props.onChange('VIN', value)}
                onBlur={null}
            />
            <Search
                name='modelYear'
                label='Model Year'
                defaultLabel='Select a Year'
                value={props.data.ModelYear}
                state={props.state.ModelYear}
                values={props.loaded.ModelYears}
                onChange={(name, value) => props.onChange('ModelYear', value)}
                size={10}
                onBlur={null}
            />
            <Search
                name='make'
                label='Make'
                defaultLabel='Select a Make'
                value={props.data.Make}
                state={props.state.Make}
                values={props.loaded.Makes}
                onChange={(name, value) => props.onChange('Make', value)}
                size={10}
                onBlur={null}
            />
            <Search
                name='model'
                label='Model'
                defaultLabel='Select a Model'
                value={props.data.Model}
                state={props.state.Model}
                values={props.loaded.Models}
                onChange={(name, value) => props.onChange('Model', value)}
                disabled={!props.data.ModelYear[0] || !props.data.Make[0]}
                size={10}
                onBlur={null}
            />
        </Fragment>
    )
}