import { Text } from "@/components/Input/Export";
import { useState } from "react";

interface RepairLineProps {
    repair: {
        Repair: string;
    }
    onDelete: () => any;
    onUpdate: (repair: {Repair: string}) => any;   
}

export default function RepairLine(props: RepairLineProps) {
    const initialRepair = props.repair.Repair;
    
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.repair);

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
                        value={values.Repair} 
                        onChange={(event) => setValues({...values, Repair: event.target.value})}
                        onBlur={() => {
                            if (!values.Repair) {
                                setValues({...values, Repair: initialRepair});
                            }
                        }}
                    />
                </div>
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