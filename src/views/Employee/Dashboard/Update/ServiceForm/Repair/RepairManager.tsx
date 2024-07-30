import { DB_Repair } from "@/database/Types";
import { useState } from "react";
import UpdateRepair from "./UpdateRepair";
import CreateRepair from "./CreateRepair";

interface RepairManagerProps {
    repairs: {[repairID: string]: DB_Repair};
    onChange: (updatedValue: {[repairID: string]: DB_Repair}) => void;
}

export default function RepairManager(props: RepairManagerProps) {
    const [counter, setCounter] = useState(1);

    return (
        <div>
            <div>
                Current Repairs
                {Object.entries(props.repairs).map(([repairID, repair], i) => (
                    <div key={i}>
                        <UpdateRepair
                            repair={repair}
                            onDelete={() => {
                                let modValue = {...props.repairs};
                                delete modValue[`${repairID}`];
                                props.onChange(modValue);
                            }}
                            onUpdate={repair => {
                                let modValue = {...props.repairs};
                                modValue[`${repairID}`] = repair;
                                props.onChange(modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Repair Here
                <CreateRepair
                    onChange={(name, value) => {
                        props.onChange({...props.repairs, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div> 
        </div>
    )
}