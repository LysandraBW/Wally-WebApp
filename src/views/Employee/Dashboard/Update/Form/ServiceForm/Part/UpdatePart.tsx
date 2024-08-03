import { Multiple, Text } from "@/components/Input/Export";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { useEffect, useReducer, useState } from "react";
import { contains, validNumber } from "@/validation/Validation";
import { UpdatePart as UpdatePartData } from "@/submission/Employee/Update/Form/Form/Service/Service";
import PartCard from "./PartCard";

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
                            <Text
                                name={'PartNumber'}
                                label={'Part Number'}
                                value={values.PartNumber}
                                state={formState.input.PartNumber}
                                onChange={async (name, value) => {
                                    await inspectInput('PartNumber', values.PartNumber, contains);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.PartNumber)
                                        return;
                                    setValues({...values, PartNumber: initialValues.PartNumber});
                                    inspectInput('PartNumber', initialValues.PartNumber, contains);
                                }}
                            />
                            <Text
                                name={'PartName'}
                                label={'Part Name'}
                                value={values.PartName}
                                state={formState.input.PartName}
                                onChange={async (name, value) => {
                                    await inspectInput('PartName', values.PartName, contains);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.PartName)
                                        return;
                                    setValues({...values, PartName: initialValues.PartName});
                                    inspectInput('PartName', initialValues.PartName, contains);
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
                                onBlur={() => {
                                    if (values.UnitCost)
                                        return;
                                    setValues({...values, UnitCost: initialValues.UnitCost});
                                    inspectInput('UnitCost', initialValues.UnitCost, validNumber);
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
                                onBlur={() => {
                                    if (values.Quantity)
                                        return;
                                    setValues({...values, Quantity: initialValues.Quantity});
                                    inspectInput('Quantity', initialValues.Quantity, validNumber);
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <PartCard
                    partName={values.PartName}
                    unitCost={values.UnitCost}
                    quantity={values.Quantity}
                    partNumber={values.PartNumber}
                    onEdit={() => setEdit(true)}
                    onDelete={props.onDelete()}
                />
            }
        </>
    )
}