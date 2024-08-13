import { DB_Appointment, DB_Diagnosis } from "@/database/Types";
import UpdateDiagnosis from "./UpdateDiagnosis";
import CreateDiagnosis from "./CreateDiagnosis";
import { Fragment, useState } from "react";
import useDiagnosisManager from "@/process/Employee/Update/Diagnosis/Process";

interface DiagnosisManagerProps {
    appointment: DB_Appointment;
}

export default function DiagnosisManager(props: DiagnosisManagerProps) {
    const diagnosisManager = useDiagnosisManager(props.appointment);

    return (
        <Fragment>
            {!!diagnosisManager.updated &&
                <Fragment>
                    <div>
                        {Object.entries(diagnosisManager.updated).map(([diagnosisID, diagnosis], i) => (
                            <div key={i}>
                                <UpdateDiagnosis
                                    diagnosis={diagnosis}
                                    onDelete={() => diagnosisManager.deleteDiagnosis(diagnosisID)}
                                    onUpdate={diagnosis => diagnosisManager.updateDiagnosis(diagnosisID, diagnosis)}
                                />
                            </div>
                        ))}
                    </div>            
                    <div>
                        <CreateDiagnosis
                            onChange={(value) => diagnosisManager.createDiagnosis(value)}
                        />
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}