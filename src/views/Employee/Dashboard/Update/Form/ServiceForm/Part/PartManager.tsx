import { useState } from "react";
import UpdatePart from "./UpdatePart";
import CreatePart from "./CreatePart";
import { PartsStructure } from "@/submission/Employee/Update/Service/Form";

interface PartManagerProps {
    parts: PartsStructure;
    onChange: (updatedValue: PartsStructure) => void;
    updateFormState: (state: boolean) => void;
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
                                let updatedValue = {...props.parts};
                                delete updatedValue[`${partID}`];
                                props.onChange(updatedValue);
                            }}
                            onUpdate={(part) => {
                                let updatedValue = {...props.parts};
                                updatedValue[`${partID}`] = part;
                                props.onChange(updatedValue);
                            }}
                            updateFormState={props.updateFormState}
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