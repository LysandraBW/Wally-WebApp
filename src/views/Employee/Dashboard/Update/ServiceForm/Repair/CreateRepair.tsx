import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/reducer/FormState/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

interface CreateRepairProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_Repair = {
    RepairID:   0,
    Repair:     ''
}

export default function CreateRepair(props: CreateRepairProps) {
    const [values, setValues] = useState<DB_Repair>(defaultInput);
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectRepair = async (repair: string = values.Repair): Promise<boolean> => {
        const [repairState, repairMessage] = await hasValue().inspect(repair);
        formErrorDispatch({
            name: 'Repair',
            state: [repairState, repairMessage]
        });
        return repairState;
    }
    
    return (
        <div>
            <Text
                name={'Repair'}
                value={values.Repair}
                error={formError.input.Repair}
                label={'Repair'}
                onChange={async (name, value) => {
                    inspectRepair(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectRepair()))
                        return;
                    props.onChange('Repairs', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}