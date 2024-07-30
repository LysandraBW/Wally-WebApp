import { Multiple } from "@/components/Input/Export";
import { DB_Part } from "@/database/Types";
import { useState } from "react";

interface UpdatePartProps {
    part: DB_Part;
    onDelete: () => any;
    onUpdate: (part: DB_Part) => any;   
}

export default function UpdatePart(props: UpdatePartProps) {
    const initialPartData = {...props.part};
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
                                onBlur={() => !values.PartNumber && setValues({...values, PartNumber: initialPartData.PartNumber})}
                            />
                            <input 
                                value={values.PartName} 
                                onChange={(event) => setValues({...values, PartName: event.target.value})}
                                onBlur={() => !values.PartName && setValues({...values, PartName: initialPartData.PartName})}
                            />
                            <input 
                                type='number'
                                value={values.UnitCost} 
                                onChange={(event) => setValues({...values, UnitCost: parseFloat(event.target.value)})}
                                onBlur={() => !values.UnitCost && setValues({...values, UnitCost: initialPartData.UnitCost})}
                            />
                            <input 
                                type='number'
                                value={values.Quantity} 
                                onChange={(event) => setValues({...values, Quantity: parseInt(event.target.value)})}
                                onBlur={() => !values.Quantity && setValues({...values, Quantity: initialPartData.Quantity})}
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