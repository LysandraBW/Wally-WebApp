import { Multiple, Text } from "@/components/Input/Export";
import { DB_Repair } from "@/lib/Database/Types";
import { useState } from "react";

interface RepairLineProps {
    repair: DB_Repair;
    onDelete: () => any;
    onUpdate: (repair: DB_Repair) => any;   
}

export default function RepairLine(props: RepairLineProps) {
    const initialRepair = props.repair.Repair;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.repair);

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
                                value={values.Repair} 
                                onChange={(event) => setValues({...values, Repair: event.target.value})}
                                onBlur={() => !values.Repair && setValues({...values, Repair: initialRepair})}
                            />
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