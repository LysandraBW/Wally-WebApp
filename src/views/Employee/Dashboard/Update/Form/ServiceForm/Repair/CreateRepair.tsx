import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import AddButton from "@/components/Button/Text/Add";
import { hasLength } from "@/validation/Validation";

interface CreateRepairProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: DB_Repair = {
    RepairID:   0,
    Repair:     ''
}

export default function CreateRepair(props: CreateRepairProps) {
    const [values, setValues] = useState<DB_Repair>(defaultValues);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectRepair = async (repair: string = values.Repair): Promise<boolean> => {
        const [repairState, repairMessage] = await hasLength(repair);
        formStateDispatch({
            states: {
                'Repair': [repairState, repairMessage]
            }
        });

        return repairState;
    }
    
    return (
        <div>
            <Text
                name={'Repair'}
                label={'Repair'}
                value={values.Repair}
                state={formState.input.Repair}
                onChange={async (name, value) => {
                    inspectRepair(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <AddButton 
                onClick={async () => {
                    if (!(await inspectRepair()))
                        return;
                    props.onChange('Repairs', values);
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}