import { Fragment } from "react";
import { Text } from "@/components/Input/Export";
import AddButton from "@/components/Button/Text/Add";
import useMutateDiagnosis from "@/process/Employee/Update/Diagnosis/Mutate/Process";
import { DefaultValues } from "@/process/Employee/Update/Diagnosis/Mutate/Loaded";

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
                    <AddButton 
                        onClick={async () => mutateDiagnosis.finalizeCreate()}
                    />
                </Fragment>
            }
        </div>
    )
}