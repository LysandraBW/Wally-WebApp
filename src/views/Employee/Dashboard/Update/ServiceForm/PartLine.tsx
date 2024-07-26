import { Text } from "@/components/Input/Export";
import { useState } from "react";

interface PartLineProps {
    part: {
        PartNumber: string;
        PartName: string;
        UnitCost: string;
        Quantity: string;
    }
    onDelete: () => any;
    onUpdate: (part: {PartNumber: string;
        PartName: string;
        UnitCost: string;
        Quantity: string;}) => any;   
}

export default function PartLine(props: PartLineProps) {
    const initialPartNumber = props.part.PartNumber;
    const initialPartName = props.part.PartName;
    const initialUnitCost = props.part.UnitCost;
    const initialQuantity = props.part.Quantity;
    
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.part);

    return (
        <>
            {edit && 
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                >
                    <input 
                        value={values.PartNumber} 
                        onChange={(event) => setValues({...values, PartNumber: event.target.value})}
                        onBlur={() => {
                            if (!values.PartNumber) {
                                setValues({...values, PartNumber: initialPartNumber});
                            }
                        }}
                    />
                    <input 
                        value={values.PartName} 
                        onChange={(event) => setValues({...values, PartName: event.target.value})}
                        onBlur={() => {
                            if (!values.PartName) {
                                setValues({...values, PartName: initialPartName});
                            }
                        }}
                    />
                    <input 
                        type='number'
                        value={values.UnitCost} 
                        onChange={(event) => setValues({...values, UnitCost: event.target.value})}
                        onBlur={() => {
                            if (!values.UnitCost) {
                                setValues({...values, UnitCost: initialUnitCost});
                            }
                        }}
                    />
                    <input 
                        type='number'
                        value={values.Quantity} 
                        onChange={(event) => setValues({...values, Quantity: event.target.value})}
                        onBlur={() => {
                            if (!values.Quantity) {
                                setValues({...values, Quantity: initialQuantity});
                            }
                        }}
                    />
                </div>
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>{props.part.PartNumber} {props.part.PartName} {props.part.UnitCost} {props.part.Quantity}</span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}