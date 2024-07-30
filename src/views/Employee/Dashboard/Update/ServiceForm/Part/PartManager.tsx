import { DB_Part } from "@/database/Types";
import { useState } from "react";
import UpdatePart from "./UpdatePart";
import CreatePart from "./CreatePart";

interface PartManagerProps {
    parts: {[partID: string]: DB_Part};
    onChange: (updatedValue: {[partID: string]: DB_Part}) => void;
}

export default function PartManager(props: PartManagerProps) {
    const [counter, setCounter] = useState(1);

    return (
        <div>
            <div>
                Current Parts
                {Object.entries(props.parts).map(([partID, part], i) => (
                    <div key={i}>
                        <UpdatePart
                            part={part}
                            onDelete={() => {
                                let modValue = {...props.parts};
                                delete modValue[`${partID}`];
                                props.onChange(modValue);
                            }}
                            onUpdate={(part) => {
                                let modValue = {...props.parts};
                                props.parts[`${partID}`] = part;
                                props.onChange(modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Part Here
                <CreatePart
                    onChange={(name, value) => {
                        props.onChange({...props.parts, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </div>
    )
}