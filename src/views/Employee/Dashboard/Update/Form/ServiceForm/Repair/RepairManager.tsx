import { DB_Repair } from "@/database/Types";
import { useState } from "react";
import UpdateRepair from "./UpdateRepair";
import CreateRepair from "./CreateRepair";

interface RepairManagerProps {
    repairs: {[repairID: string]: DB_Repair};
    onChange: (updatedValue: {[repairID: string]: DB_Repair}) => void;
    updateFormState: (state: boolean) => void;
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
                                let updatedValue = {...props.repairs};
                                delete updatedValue[`${repairID}`];
                                props.onChange(updatedValue);
                            }}
                            onUpdate={repair => {
                                let updatedValue = {...props.repairs};
                                updatedValue[`${repairID}`] = repair;
                                props.onChange(updatedValue);
                            }}
                            updateFormState={props.updateFormState}
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