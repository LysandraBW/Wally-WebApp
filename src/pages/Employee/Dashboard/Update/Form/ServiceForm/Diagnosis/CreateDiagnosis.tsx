import { Fragment } from "react";
import { Text } from "@/components/input/export";
import Add from "@/components/button/label/Add";
import useMutateDiagnosis from "@/process/Employee/Update/diagnosis/hook/manage";
import { DefaultValues } from "@/process/Employee/Update/Diagnosis/interfaces/Loaded";

export interface CreateDiagnosisProps {
    onChange: (value: any) => any;
}

export default function CreateDiagnosis(props: CreateDiagnosisProps) {
    const mutateDiagnosis = useMutateDiagnosis({mutateType: 'Create', initialValues: DefaultValues, ...props});

    return (
        <div>
            {!!mutateDiagnosis.values && !!mutateDiagnosis.state &&
                <Fragment>
                    <Text
                        type='text'
                        name='Code'
                        label='Code'
                        value={mutateDiagnosis.values.Code}
                        state={mutateDiagnosis.state.Code}
                        onChange={async (name, value) => mutateDiagnosis.updateData('Code', value)}
                    />
                    <Text
                        type='text'
                        name='Message'
                        label='Message'
                        value={mutateDiagnosis.values.Message}
                        state={mutateDiagnosis.state.Message}
                        onChange={async (name, value) => mutateDiagnosis.updateData('Message', value)}
                    />
                    <Add 
                        onClick={async () => mutateDiagnosis.finalizeCreate()}
                    />
                </Fragment>
            }
        </div>
    )
}