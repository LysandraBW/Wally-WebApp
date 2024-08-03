import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Part } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { hasLength, validNumber } from "@/validation/Validation";
import AddButton from "@/components/Button/Text/Add";

interface CreatePartProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: DB_Part = {
    PartID:     0,
    PartNumber: '',
    PartName:   '',
    Quantity:   0,
    UnitCost:   0
}

export default function CreatePart(props: CreatePartProps) {
    const [values, setValues] = useState<DB_Part>(defaultValues);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

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
    
    const inspectPart = async () => {
        const partName = await inspectInput('PartName', values.PartName, hasLength);
        const quantity = await inspectInput('Quantity', values.Quantity, validNumber);
        const unitCost = await inspectInput('UnitCost', values.UnitCost, validNumber);
        const partNumber = await inspectInput('PartNumber', values.PartNumber, hasLength);
        return partNumber && partName && quantity && unitCost;
    }

    return (
        <div>
            <Text
                name={'PartNumber'}
                label={'Part Number'}
                value={values.PartNumber}
                state={formState.input.PartNumber}
                onChange={async (name, value) => {
                    await inspectInput('PartNumber', values.PartNumber, hasLength);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'PartName'}
                label={'Part Name'}
                value={values.PartName}
                state={formState.input.PartName}
                onChange={async (name, value) => {
                    await inspectInput('PartName', values.PartName, hasLength);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'UnitCost'}
                label={'Unit Cost'}
                value={values.UnitCost}
                state={formState.input.UnitCost}
                onChange={async (name, value) => {
                    await inspectInput('UnitCost', values.UnitCost, validNumber);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'Quantity'}
                label={'Quantity'}
                value={values.Quantity}
                state={formState.input.Quantity}
                onChange={async (name, value) => {
                    await inspectInput('Quantity', values.Quantity, validNumber);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <AddButton 
                onClick={async () => {
                    if (!(await inspectPart()))
                        return;
                    props.onChange('Parts', values);
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}