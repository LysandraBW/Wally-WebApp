import { Multiple } from "@/components/Input/Export";
import { DB_Part } from "@/lib/Database/Types";
import { useState } from "react";

interface PartLineProps {
    part: DB_Part;
    onDelete: () => any;
    onUpdate: (part: DB_Part) => any;   
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
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <input 
                                value={values.PartNumber} 
                                onChange={(event) => setValues({...values, PartNumber: event.target.value})}
                                onBlur={() => !values.PartNumber && setValues({...values, PartNumber: initialPartNumber})}
                            />
                            <input 
                                value={values.PartName} 
                                onChange={(event) => setValues({...values, PartName: event.target.value})}
                                onBlur={() => !values.PartName && setValues({...values, PartName: initialPartName})}
                            />
                            <input 
                                type='number'
                                value={values.UnitCost} 
                                onChange={(event) => setValues({...values, UnitCost: parseFloat(event.target.value)})}
                                onBlur={() => !values.UnitCost && setValues({...values, UnitCost: initialUnitCost})}
                            />
                            <input 
                                type='number'
                                value={values.Quantity} 
                                onChange={(event) => setValues({...values, Quantity: parseInt(event.target.value)})}
                                onBlur={() => !values.Quantity && setValues({...values, Quantity: initialQuantity})}
                            />
                        </div>
                    )}
                />
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