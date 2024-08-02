import { ReducerState } from '@/hook/FormState/Reducer';
import { Text, Search, Checkbox } from '@/components/Input/Export';
import { validValue, validVIN } from '@/validation/Validation';
import { getServiceValues, getValues } from '@/lib/Vehicle/Load';

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
    formState: ReducerState;
    updateFormState: (updatedInputState: {name: string, state: [boolean, string?]}) => void;
    onChange: (name: string, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        props.updateFormState({
            name: inputName,
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
                error={props.formState.input.vin}
                onChange={(name, value) => {
                    inspectInput('vin', value, validVIN);
                    props.onChange(name, value);
                }}
            />
            <Search
                name={'modelYear'}
                label={'Model Year'}
                defaultLabel={'Select a Year'}
                value={props.form.modelYear}
                values={props.loadedValues.modelYears}
                error={props.formState.input.modelYear}
                onChange={(name, value) => {
                    const modelYears = getValues(props.loadedValues.modelYears);
                    inspectInput('modelYear', value, v => validValue(v, modelYears));
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
                error={props.formState.input.make}
                onChange={(name, value) => {
                    const makes = getValues(props.loadedValues.makes);
                    inspectInput('make', value, v => validValue(v, makes));
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
                error={props.formState.input.model}
                onChange={(name, value) => {
                    const models = getValues(props.loadedValues.models);
                    inspectInput('model', value, v => validValue(v, models));
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
                error={props.formState.input.services}
                onChange={(name, value) => {
                    const allServices = getServiceValues(props.loadedValues.services);
                    inspectInput('services', value, v => validValue(v, allServices));
                    props.onChange(name, value);
                }}
            />
        </div>
    )
}