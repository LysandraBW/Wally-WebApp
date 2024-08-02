import { Multiple, Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useEffect, useReducer, useState } from "react";

interface UpdateRepairProps {
    repair: DB_Repair;
    onDelete: () => any;
    onUpdate: (repair: DB_Repair) => any;  
    updateFormError: (state: boolean) => void; 
}

export default function UpdateRepair(props: UpdateRepairProps) {
    const initialRepair = props.repair.Repair;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.repair);
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

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
                            <div>
                                <input 
                                    value={values.Repair} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Repair: value});
                                        formErrorDispatch({
                                            name: 'Repair',
                                            state: await hasValue().inspect(value)
                                        });
                                    }}
                                    onBlur={() => !values.Repair && setValues({...values, Repair: initialRepair})}
                                />
                                {formError.input.Repair.state &&
                                    <span>{formError.input.Repair.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>{props.repair.Repair}</span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}