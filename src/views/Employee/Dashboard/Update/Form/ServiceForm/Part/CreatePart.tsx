import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Part } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue, validNumber } from "@/validation/Validation";

interface CreatePartProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_Part = {
    PartID:     0,
    PartNumber: '',
    PartName:   '',
    Quantity:   0,
    UnitCost:   0
}

export default function CreatePart(props: CreatePartProps) {
    const [values, setValues] = useState<DB_Part>(defaultInput);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }
    
    const inspectPart = async () => {
        const partName = await inspectInput('PartName', values.PartName, hasValue);
        const quantity = await inspectInput('Quantity', values.Quantity, validNumber);
        const unitCost = await inspectInput('UnitCost', values.UnitCost, validNumber);
        const partNumber = await inspectInput('PartNumber', values.PartNumber, hasValue);
        return partNumber && partName && quantity && unitCost;
    }

    return (
        <div>
            <Text
                name={'PartNumber'}
                value={values.PartNumber}
                error={formState.input.PartNumber}
                label={'Part Number'}
                onChange={async (name, value) => {
                    await inspectInput('PartNumber', values.PartNumber, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'PartName'}
                value={values.PartName}
                error={formState.input.PartName}
                label={'Part Name'}
                onChange={async (name, value) => {
                    await inspectInput('PartName', values.PartName, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'UnitCost'}
                value={values.UnitCost}
                error={formState.input.UnitCost}
                label={'Unit Cost'}
                onChange={async (name, value) => {
                    await inspectInput('UnitCost', values.UnitCost, validNumber);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'Quantity'}
                value={values.Quantity}
                error={formState.input.Quantity}
                label={'Quantity'}
                onChange={async (name, value) => {
                    await inspectInput('Quantity', values.Quantity, validNumber);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectPart()))
                        return;
                    props.onChange('Parts', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}