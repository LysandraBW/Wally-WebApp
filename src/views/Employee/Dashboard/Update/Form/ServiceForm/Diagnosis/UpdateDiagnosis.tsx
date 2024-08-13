import { Multiple, Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import DiagnosisCard from "./DiagnosisCard";
import useMutateDiagnosis from "@/process/Employee/Update/Diagnosis/Mutate/Process";

export interface UpdateDiagnosisProps {
    diagnosis: DB_Diagnosis
    onDelete: () => any;
    onUpdate: (diagnosis: DB_Diagnosis) => any;
}

export default function UpdateDiagnosis(props: UpdateDiagnosisProps) {
    const mutateDiagnosis = useMutateDiagnosis({mutateType: 'Update', initialValues: {...props.diagnosis}, ...props});

    return (
        <div>
            {!!mutateDiagnosis.edit && !!mutateDiagnosis.values && !!mutateDiagnosis.state &&
                <Multiple
                    onBlur={() => {
                        mutateDiagnosis.setEdit(false);
                        mutateDiagnosis.finalizeUpdate();
                    }}
                    children={(
                        <div>
                            <Text
                                type='text'
                                name='Code'
                                label='Code'
                                value={mutateDiagnosis.values.Code}
                                state={mutateDiagnosis.state.Code}
                                onChange={async (name, value) => mutateDiagnosis.updateData('Code', value)}
                                onBlur={() => mutateDiagnosis.resetData('Code')}
                            />
                            <Text
                                type='text'
                                name='Message'
                                label='Message'
                                value={mutateDiagnosis.values.Message}
                                state={mutateDiagnosis.state.Message}
                                onChange={async (name, value) => mutateDiagnosis.updateData('Message', value)}
                                onBlur={() => mutateDiagnosis.resetData('Message')}
                            />
                        </div>
                    )}
                />
            }
            {!mutateDiagnosis.edit && 
                <DiagnosisCard
                    code={props.diagnosis.Code}
                    message={props.diagnosis.Message}
                    onEdit={() => mutateDiagnosis.setEdit(true)}
                    onDelete={props.onDelete}
                />
            }
        </div>
    )
}