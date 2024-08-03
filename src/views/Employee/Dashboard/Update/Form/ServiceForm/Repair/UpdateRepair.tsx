import { Multiple, Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { useEffect, useReducer, useState } from "react";
import RepairCard from "./RepairCard";
import { hasLength } from "@/validation/Validation";

interface UpdateRepairProps {
    repair: DB_Repair;
    onDelete: () => any;
    onUpdate: (repair: DB_Repair) => any;  
    updateFormState: (state: boolean) => void; 
}

export default function UpdateRepair(props: UpdateRepairProps) {
    const initialRepair = props.repair.Repair;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.repair);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    return (
        <>
            {edit && 
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <Text
                                name={'Repair'}
                                label={'Repair'}
                                value={values.Repair}
                                state={formState.input.Repair}
                                onChange={async (name, value) => {
                                    setValues({...values, [`${name}`]: value});
                                    formStateDispatch({
                                        states: {
                                            'Repair': await hasLength(value)
                                        }
                                    });
                            
                                }}
                                onBlur={() => {
                                    if (values.Repair)
                                        return;
                                    setValues({...values, Repair: initialRepair});
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <RepairCard
                    repair={props.repair.Repair}
                    onEdit={() => setEdit(true)}
                    onDelete={() => props.onDelete()}
                />
            }
        </>
    )
}