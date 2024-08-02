import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Part } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue, isNumber } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

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
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectPartNumber = async (partNumber: string = values.PartNumber): Promise<boolean> => {
        const [partNumberState, partNumberMessage] = await hasValue().inspect(partNumber);
        formErrorDispatch({
            name: 'PartNumber',
            state: [partNumberState, partNumberMessage]
        });
        return partNumberState;
    }
    
    const inspectPartName = async (partName: string = values.PartName): Promise<boolean> => {
        const [partNameState, partNameMessage] = await hasValue().inspect(partName);
        formErrorDispatch({
            name: 'PartName',
            state: [partNameState, partNameMessage]
        });
        return partNameState;
    }

    const inspectQuantity = async (quantity: number = values.Quantity): Promise<boolean> => {
        const [quantityState, quantityMessage] = await isNumber().inspect(quantity);
        formErrorDispatch({
            name: 'Quantity',
            state: [quantityState, quantityMessage]
        });
        return quantityState;
    }

    const inspectUnitCost = async (unitCost: number = values.UnitCost): Promise<boolean> => {
        const [unitCostState, unitCostMessage] = await isNumber().inspect(unitCost);
        formErrorDispatch({
            name: 'UnitCost',
            state: [unitCostState, unitCostMessage]
        });
        return unitCostState;
    }

    const inspectPart = async () => {
        const partName = await inspectPartName();
        const quantity = await inspectQuantity();
        const unitCost = await inspectUnitCost();
        const partNumber = await inspectPartNumber();

        return partNumber && partName && quantity && unitCost;
    }

    return (
        <div>
            <Text
                name={'PartNumber'}
                value={values.PartNumber}
                error={formError.input.PartNumber}
                label={'Part Number'}
                onChange={async (name, value) => {
                    inspectPartNumber(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'PartName'}
                value={values.PartName}
                error={formError.input.PartName}
                label={'Part Name'}
                onChange={async (name, value) => {
                    inspectPartName(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'UnitCost'}
                value={values.UnitCost}
                error={formError.input.UnitCost}
                label={'Unit Cost'}
                onChange={async (name, value) => {
                    inspectUnitCost(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                type='number'
                name={'Quantity'}
                value={values.Quantity}
                error={formError.input.Quantity}
                label={'Quantity'}
                onChange={async (name, value) => {
                    inspectQuantity(value);
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