import { Multiple } from "@/components/Input/Export";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useEffect, useReducer, useState } from "react";
import { hasValue, validNumber } from "@/validation/Validation";
import { UpdatePart as UpdatePartData } from "@/process/Employee/Update/Form/Form/Service/Service";

interface UpdatePartProps {
    part: UpdatePartData;
    onDelete: () => any;
    onUpdate: (part: UpdatePartData) => any;   
    updateFormState: (state: boolean) => void;
}

export default function UpdatePart(props: UpdatePartProps) {
    const initialValues = {...props.part};
    const [values, setValues] = useState(props.part);
    const [edit, setEdit] = useState(false);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

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
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

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
                                    value={values.PartNumber} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, PartNumber: value});
                                        inspectInput('PartNumber', initialValues.PartNumber, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.PartNumber)
                                            return;
                                        setValues({...values, PartNumber: initialValues.PartNumber});
                                        inspectInput('PartNumber', initialValues.PartNumber, hasValue);
                                    }}
                                />
                                {formState.input.PartNumber && !formState.input.PartNumber.state &&
                                    <span>{formState.input.PartNumber.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.PartName} 
                                    onChange={async (event) => {
                                            const value = event.target.value;
                                            setValues({...values, PartName: value});
                                            inspectInput('PartName', initialValues.PartName, hasValue);
                                        }}
                                    onBlur={() => {
                                        if (values.PartName)
                                            return;
                                        setValues({...values, PartName: initialValues.PartName});
                                        inspectInput('PartName', initialValues.PartName, hasValue);
                                    }}
                                />
                                {formState.input.PartName && !formState.input.PartName.state &&
                                    <span>{formState.input.PartName.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='number'
                                    value={values.UnitCost} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, UnitCost: value});
                                        inspectInput('UnitCost', initialValues.UnitCost, validNumber);
                                    }}
                                    onBlur={() => {
                                        if (values.UnitCost)
                                            return;
                                        setValues({...values, UnitCost: initialValues.UnitCost});
                                        inspectInput('UnitCost', initialValues.UnitCost, validNumber);
                                    }}
                                />
                                {formState.input.UnitCost && !formState.input.UnitCost.state &&
                                    <span>{formState.input.UnitCost.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='number'
                                    value={values.Quantity} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Quantity: value});
                                        inspectInput('Quantity', initialValues.Quantity, validNumber);
                                    }}
                                    onBlur={() => {
                                        if (values.Quantity)
                                            return;
                                        setValues({...values, Quantity: initialValues.Quantity});
                                        inspectInput('Quantity', initialValues.Quantity, validNumber);
                                    }}
                                />
                                {formState.input.Quantity && !formState.input.Quantity.state &&
                                    <span>{formState.input.Quantity.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span 
                        onClick={() => setEdit(true)}
                    >
                        {props.part.PartNumber} 
                        {props.part.PartName} 
                        {props.part.UnitCost} 
                        {props.part.Quantity}
                    </span>
                    <span 
                        onClick={() => props.onDelete()}
                    >
                        DELETE
                    </span>
                </div>
            }
        </>
    )
}