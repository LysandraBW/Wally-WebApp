import { useEffect, useReducer, useState } from 'react';
import { Text, Search } from '@/components/Input/Export';
import { LoadModels, LoadVehicle } from '@/lib/Vehicle/Decoder';
import FormStateReducer from '@/hook/State/Reducer';
import { InitialFormState } from "@/hook/State/Interface";
import { inValues, validLicensePlate, validNumber, validValue, validVIN } from '@/validation/Validation';
import { VehicleFormStructure } from '@/submission/Employee/Update/Vehicle/Form';
import { loadMakes, loadModelYears } from '@/lib/Vehicle/Load';
import { getValues } from "@/lib/Vehicle/Value";
import { FormType } from '@/submission/Employee/Update/Form';
import { LoadedValues } from '@/process/Update/Vehicle/Load';

interface VehicleProps {
    form: VehicleFormStructure;
    updateFormState: (state: boolean) => void;
    changeHandler: (type: FormType, name: string, value: any) => void;
}

export default function Vehicle(props: VehicleProps) {
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [values, setValues] = useState(LoadedValues);

    useEffect(() => {
        const load = async () => {
            const makes = await loadMakes();
            const models = await LoadModels(props.form.ModelYear, props.form.Make);
            const modelYears = await loadModelYears();

            setValues({
                ...values,
                makes,
                models,
                modelYears
            });

            formStateDispatch({
                states: {                    
                    VIN: await validVIN(props.form.VIN),
                    Mileage: await validNumber(props.form.Mileage, true),
                    LicensePlate: await validLicensePlate(props.form.LicensePlate),
                    Make: await validValue([props.form.Make], getValues(makes)),
                    Model: await validValue([props.form.Model], getValues(models)),
                    ModelYear: await validValue([props.form.ModelYear], getValues(modelYears))
                }
            });
        }
        load();
    }, []);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            states: {
                [`${inputName}`]: [errState, errMessage]
            }
        });
        return errState;
    }
    
    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setValues({...values, models});
        return models;
    }

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        const vehicle = await LoadVehicle(vin, values.makes);
        setValues({
            ...values, 
            models: vehicle.models
        });

        // No Matching Vehicle Found
        if (!vehicle.decoded)        
            return;

        return vehicle;
    }

    const changeHandler = async (name: string, value: any) => {
        if (name === 'VIN') {
            const valid = inspectInput(name, value, validVIN);
            if (!valid)
                return;

            const data = await loadMakeModelModelYear(value);
            if (!data)
                return;

            props.changeHandler(FormType.Vehicle, '', {
                VIN: value,
                Make: data.make[0],
                Model: data.model[0],
                ModelYear: data.modelYear[0]
            });
        }
        else if (name === 'Make') {
            loadModels(props.form.ModelYear, value[0]);
            props.changeHandler(FormType.Vehicle, 'Model', '');
            props.changeHandler(FormType.Vehicle, 'Make', value[0]);
            inspectInput(name, value, await inValues(getValues(values.makes)));
        }
        else if (name === 'ModelYear') {
            loadModels(value[0], props.form.Make);
            props.changeHandler(FormType.Vehicle, 'Model', '');
            props.changeHandler(FormType.Vehicle, 'ModelYear', value[0]);
            inspectInput(name, value, await inValues(getValues(values.modelYears)));
        }
        else if (name === 'Model') {
            props.changeHandler(FormType.Vehicle, 'Model', value[0]);
            inspectInput(name, value, await inValues(getValues(values.models)));
        }
        else if (name === 'Mileage') {
            inspectInput(name, value, async (v) => await validNumber(v, true));
            props.changeHandler(FormType.Vehicle, name, value);
        }
        else if (name === 'LicensePlate') {
            inspectInput(name, value, validLicensePlate);
            props.changeHandler(FormType.Vehicle, name, value);
        }
    }

    return (
        <>
            <Text
                name={'VIN'}
                label={'VIN'}
                value={props.form.VIN}
                state={formState.input.VIN}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Search
                name={'ModelYear'}
                label={'Model Year'}
                defaultLabel='Select a Year'
                value={[props.form.ModelYear]}
                state={formState.input.ModelYear}
                values={values.modelYears}
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={'Make'}
                label={'Make'}
                defaultLabel='Select a Make'
                value={[props.form.Make]}
                state={formState.input.Make}
                values={values.makes}
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={'Model'}
                label={'Model'}
                defaultLabel='Select a Model'
                value={[props.form.Model]}
                state={formState.input.Model}
                values={values.models}
                onChange={(name, value) => changeHandler(name, value)}
                disabled={!props.form.ModelYear || !props.form.Make}
                size={10}
            />
            <Text
                type='number'
                name={'Mileage'}
                label={'Mileage'}
                value={props.form.Mileage}
                state={formState.input.Mileage}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={'LicensePlate'}
                label={'License Plate'}
                value={props.form.LicensePlate}
                state={formState.input.LicensePlate}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}