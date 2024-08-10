import { DefaultState } from "@/hook/State/Interface";
import { Text, Search } from '@/components/Input/Export';
import { Fragment, useEffect } from "react";
import useVehicle from "@/hook/Vehicle/Vehicle";
import { loadMakes, loadModelYears } from "@/lib/Vehicle/Load";

interface VehicleFormProps {
    form: {
        vin:        string;
        make:       Array<string>;
        model:      Array<string>;
        modelYear:  Array<number>;
    };
    onChange: (name: string, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    const vehicle = useVehicle();

    useEffect(() => {
        const load = async () => {
            vehicle.setLoadedData(
                await loadMakes(), 
                await loadModelYears()
            );
        }
        load();
    }, []);

    const changeHandler = async (name: string, value: any) => {
        switch (name) {
            case 'vin':
                vehicle.setVIN(value);
                break;
            case 'make':
                vehicle.setMake(value[0]);
                break;
            case 'model':
                vehicle.setModel(value[0]);
                break;
            case 'modelYear':
                vehicle.setModelYear(value[0]);
                break;
        }
        props.onChange(name, value);
    }

    return (
        <Fragment>
            <Text
                type='text'
                name='vin'
                label='VIN'
                value={props.form.vin}
                onChange={(name, value) => changeHandler(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                size={10}
                name='modelYear'
                label='Model Year'
                defaultLabel='Select a Year'
                value={props.form.modelYear}
                values={vehicle.loadedModelYears}
                onChange={(name, value) => changeHandler(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                size={10}
                name='make'
                label='Make'
                defaultLabel='Select a Make'
                value={props.form.make}
                values={vehicle.loadedMakes}
                onChange={(name, value) => changeHandler(name, value)}
                state={DefaultState}
                onBlur={null}
            />
            <Search
                name='model'
                label='Model'
                defaultLabel='Select a Model'
                value={props.form.model}
                values={vehicle.loadedModels}
                onChange={(name, value) => changeHandler(name, value)}
                disabled={!props.form.modelYear[0] || !props.form.make[0]}
                size={10}
                state={DefaultState}
                onBlur={null}
            />
        </Fragment>
    )
}