import { Fragment } from "react";
import { Text } from "@/components/Input/Export";
import AddButton from "@/components/Button/Text/Add";
import useMutatePaymentForm from "@/process/Employee/Update/Payment/Mutate/Process";
import { DefaultValues } from "@/process/Employee/Update/Payment/Mutate/Loaded";

export interface CreatePaymentProps {
    onChange: (value: any) => any;
}

export default function CreatePayment(props: CreatePaymentProps) {
    const mutatePayment = useMutatePaymentForm({mutateType: 'Create', initialValues: DefaultValues, ...props});

    return (
        <div>
            {!!mutatePayment.values && !!mutatePayment.state && 
                <Fragment>
                    <Text
                        type='number'
                        name='Payment'
                        label='Payment'
                        value={mutatePayment.values.Payment}
                        state={mutatePayment.state.Payment}
                        onChange={async (name, value) => mutatePayment.updateData('Payment', value)}
                    />
                    <Text
                        type='text'
                        name='Name'
                        label='Name'
                        value={mutatePayment.values.Name}
                        state={mutatePayment.state.Name}
                        onChange={async (name, value) => mutatePayment.updateData('Name', value)}
                    />
                    <Text
                        type='text'
                        name='Type'
                        label='Type'
                        value={mutatePayment.values.Type}
                        state={mutatePayment.state.Type}
                        onChange={async (name, value) => mutatePayment.updateData('Type', value)}
                    />
                    <Text
                        type='text'
                        name='CCN'
                        label='Credit Card Number'
                        value={mutatePayment.values.CCN}
                        state={mutatePayment.state.CCN}
                        onChange={async (name, value) => mutatePayment.updateData('CCN', value)}
                    />
                    <Text
                        type='text'
                        name='EXP'
                        label='Expiration Date'
                        value={mutatePayment.values.EXP}
                        state={mutatePayment.state.EXP}
                        onChange={async (name, value) => mutatePayment.updateData('EXP', value)}
                    />            
                    <AddButton 
                        onClick={mutatePayment.finalizeCreate}
                    />
                </Fragment>
            }
        </div>
    )
}