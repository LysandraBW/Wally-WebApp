import { Multiple } from "@/components/Input/Export";
import { DB_Part } from "@/database/Types";
import { hasValue, isNumber } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { useEffect, useReducer, useState } from "react";

interface UpdatePartProps {
    part: DB_Part;
    onDelete: () => any;
    onUpdate: (part: DB_Part) => any;   
    updateFormError: (state: boolean) => void;
}

export default function UpdatePart(props: UpdatePartProps) {
    const initialPartData = {...props.part};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.part);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

    const inspectPartNumber = async (partNumber: string = values.PartNumber): Promise<boolean> => {
        const [partNumberState, partNumberMessage] = await hasValue().inspect(partNumber);
        formErrorDispatch({
            name: 'PartNumber',
            inspection: [partNumberState, partNumberMessage]
        });
        return partNumberState;
    }
    
    const inspectPartName = async (partName: string = values.PartName): Promise<boolean> => {
        const [partNameState, partNameMessage] = await hasValue().inspect(partName);
        formErrorDispatch({
            name: 'PartName',
            inspection: [partNameState, partNameMessage]
        });
        return partNameState;
    }

    const inspectQuantity = async (quantity: number = values.Quantity): Promise<boolean> => {
        const [quantityState, quantityMessage] = await isNumber().inspect(quantity);
        formErrorDispatch({
            name: 'Quantity',
            inspection: [quantityState, quantityMessage]
        });
        return quantityState;
    }

    const inspectUnitCost = async (unitCost: number = values.UnitCost): Promise<boolean> => {
        const [unitCostState, unitCostMessage] = await isNumber().inspect(unitCost);
        formErrorDispatch({
            name: 'UnitCost',
            inspection: [unitCostState, unitCostMessage]
        });
        return unitCostState;
    }

    return (
        <>
            {edit && 
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        // Something Wrong Here
                        // This should update the values, I shouldn't have
                        // to use values at the bottom. So, why is it not
                        // updating?
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
                                        inspectPartNumber(value);
                                    }}
                                    onBlur={() => {
                                        if (values.PartNumber)
                                            return;

                                        setValues({...values, PartNumber: initialPartData.PartNumber});
                                        inspectPartNumber(initialPartData.PartNumber);
                                    }}
                                />
                                {formError.input.PartNumber && !formError.input.PartNumber.state &&
                                    <span>{formError.input.PartNumber.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.PartName} 
                                    onChange={async (event) => {
                                            const value = event.target.value;
                                            setValues({...values, PartName: value});
                                            inspectPartName(value);
                                        }}
                                    onBlur={() => {
                                        if (values.PartName)
                                            return;

                                        setValues({...values, PartName: initialPartData.PartName});
                                        inspectPartName(initialPartData.PartName);
                                    }}
                                />
                                {formError.input.PartName && !formError.input.PartName.state &&
                                    <span>{formError.input.PartName.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='number'
                                    value={values.UnitCost} 
                                    onChange={async (event) => {
                                        // Causes a 'The Specified Value...' Warning
                                        // Fix Later
                                        const value = parseFloat(event.target.value);
                                        setValues({...values, UnitCost: value});
                                        inspectUnitCost(value);
                                    }}
                                    onBlur={() => {
                                        if (values.UnitCost)
                                            return;

                                        setValues({...values, UnitCost: initialPartData.UnitCost});
                                        inspectUnitCost(initialPartData.UnitCost);
                                    }}
                                />
                                {formError.input.UnitCost && !formError.input.UnitCost.state &&
                                    <span>{formError.input.UnitCost.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    type='number'
                                    value={values.Quantity} 
                                    onChange={async (event) => {
                                        // Causes a 'The Specified Value...' Warning
                                        // Fix Later
                                        const value = parseInt(event.target.value);
                                        setValues({...values, Quantity: value});
                                        inspectQuantity(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Quantity)
                                            return;

                                        setValues({...values, Quantity: initialPartData.Quantity});
                                        inspectQuantity(initialPartData.Quantity)
                                    }}
                                />
                                {formError.input.Quantity && !formError.input.Quantity.state &&
                                    <span>{formError.input.Quantity.message}</span>
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
                        {values.PartNumber} 
                        {values.PartName} 
                        {values.UnitCost} 
                        {values.Quantity}
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