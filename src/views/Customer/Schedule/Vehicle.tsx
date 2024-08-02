import FormStateReducer from '@/reducer/FormState/Reducer';
import { useEffect, useReducer } from 'react';
import { Text, Search, Checkbox } from '@/components/Input/Export';
import { validMake, validModel, validModelYear, validServices, validVIN } from '@/validation/Validation';
import { InitialVehicleFormState } from '@/validation/State/Vehicle';

interface VehicleFormProps {
    form: {
        vin:        string;
        make:       Array<string>;
        model:      Array<string>;
        modelYear:  Array<number>;
        services:   Array<number>;
    };
    loadedValues: {
        makes:      Array<[string, string]>;
        models:     Array<[string, string]>;
        modelYears: Array<[number, string]>;
        services:   {[k: string]: Array<[number, string]>};
    };
    updateFormState: (state: boolean) => void;
    onChange: (name: string, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialVehicleFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectMake = async (make: Array<string> = props.form.make): Promise<boolean> => {
        const makes = props.loadedValues.makes.map(m => m[0]);
        const [errState, errMessage] = await validMake(make, makes);
        formStateDispatch({
            name: 'make',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectModel = async (model: Array<string> = props.form.model): Promise<boolean> => {
        const models = props.loadedValues.models.map(m => m[0]);
        const [errState, errMessage] = await validModel(model, models);
        formStateDispatch({
            name: 'model',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectModelYear = async (modelYear: Array<number> = props.form.modelYear): Promise<boolean> => {
        const modelYears = Object.values(props.loadedValues.services).flat().map(s => s[0]);
        const [errState, errMessage] = await validModelYear(modelYear, modelYears);
        formStateDispatch({
            name: 'modelYear',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectVIN = async (vin: string = props.form.vin): Promise<boolean> => {
        const [errState, errMessage] = await validVIN(vin);
        formStateDispatch({
            name: 'vin',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectServices = async (services: Array<number> = props.form.services): Promise<boolean> => {
        const allServices = Object.values(props.loadedValues.services).flat().map(s => s[0]);
        const [errState, errMessage] = await validServices(services, allServices);
        formStateDispatch({
            name: 'vin',
            state: [errState, errMessage]
        });
        return errState;
    }
    
    return (
        <div>
            <Text
                name={'vin'}
                label={'VIN'}
                value={props.form.vin}
                error={formState.input.vin}
                onChange={(name, value) => {
                    inspectVIN(value);
                    props.onChange(name, value);
                }}
            />
            <Search
                name={'modelYear'}
                label={'Model Year'}
                defaultLabel={'Select a Year'}
                value={props.form.modelYear}
                values={props.loadedValues.modelYears}
                error={formState.input.modelYear}
                onChange={(name, value) => {
                    inspectModelYear(value);
                    props.onChange(name, value);
                }}
                size={10}
            />
            <Search
                name={'make'}
                label={'Make'}
                defaultLabel='Select a Make'
                value={props.form.make}
                values={props.loadedValues.makes}
                error={formState.input.make}
                onChange={(name, value) => {
                    inspectMake(value);
                    props.onChange(name, value);
                }}
                size={10}
            />
            <Search
                name={'model'}
                label={'Model'}
                defaultLabel='Select a Model'
                value={props.form.model}
                values={props.loadedValues.models}
                error={formState.input.model}
                onChange={(name, value) => {
                    inspectModel(value);
                    props.onChange(name, value);
                }}
                disabled={!props.form.modelYear[0] || !props.form.make[0]}
                size={10}
            />
            <Checkbox
                name='services'
                label={'Service'}
                value={props.form.services}
                values={props.loadedValues.services}
                error={formState.input.services}
                onChange={(name, value) => {
                    inspectServices(value);
                    props.onChange(name, value);
                }}
            />
        </div>
    )
}