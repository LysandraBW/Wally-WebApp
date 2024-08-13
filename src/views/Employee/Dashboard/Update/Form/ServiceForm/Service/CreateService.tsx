import { Text } from "@/components/Input/Export";
import { Fragment } from "react";
import useMutateServiceForm from "@/process/Employee/Update/Service/Mutate/Process";
import { DefaultValues } from "@/process/Employee/Update/Service/Mutate/Loaded";

export interface CreateServiceProps {
    onChange: (value: any) => void;
}

export default function CreateService(props: CreateServiceProps) {
    const mutateServiceForm = useMutateServiceForm({...props, mutateType: 'Create', initialValues: DefaultValues});

    return (
        <div>
            {mutateServiceForm.values && mutateServiceForm.state &&
                <Fragment>
                    <Text
                        type='text'
                        name='Service'
                        label='Service'
                        value={mutateServiceForm.values.Service}
                        state={mutateServiceForm.state.Service}
                        onChange={async (name, value) => mutateServiceForm.updateData('Service', value)}
                    />
                    <Text
                        type='text'
                        name='Division'
                        label='Division'
                        value={mutateServiceForm.values.Division}
                        state={mutateServiceForm.state.Division}
                        onChange={async (name, value) => mutateServiceForm.updateData('Division', value)}
                    />
                    <Text
                        type='text'
                        name='Class'
                        label='Class'
                        value={mutateServiceForm.values.Class}
                        state={mutateServiceForm.state.Class}
                        onChange={async (name, value) => mutateServiceForm.updateData('Class', value)}
                    />
                    <button onClick={mutateServiceForm.finalizeCreate}>Add</button>
                </Fragment>
            }
        </div>
    )
}