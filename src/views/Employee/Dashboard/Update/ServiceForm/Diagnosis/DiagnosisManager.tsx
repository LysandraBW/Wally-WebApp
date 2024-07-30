import { DB_Diagnosis } from "@/database/Types";
import UpdateDiagnosis from "./UpdateDiagnosis";
import CreateDiagnosis from "./CreateDiagnosis";
import { useState } from "react";

interface DiagnosisManagerProps {
    diagnoses: {[diagnosisID: string]: DB_Diagnosis}
    onChange: (updatedValue: {[diagnosisID: string]: DB_Diagnosis}) => void;
}

export default function DiagnosisManager(props: DiagnosisManagerProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <div>
            <div>
                Current Diagnoses
                {Object.entries(props.diagnoses).map(([diagnosisID, diagnosis], i) => (
                    <div key={i}>
                        <UpdateDiagnosis
                            diagnosis={diagnosis}
                            onDelete={() => {
                                let modValue = {...props.diagnoses};
                                delete modValue[`${diagnosisID}`];
                                props.onChange(modValue);
                            }}
                            onUpdate={(diagnosis) => {
                                let modValue = {...props.diagnoses};
                                modValue[`${diagnosisID}`] = diagnosis;
                                props.onChange(modValue);
                            }}
                        />
                    </div>
                ))}
            </div>            
            <div>
                Type in a Diagnosis Here
                <CreateDiagnosis
                    onChange={(name, value) => {
                        props.onChange({...props.diagnoses, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </div>
    )
}