import { Multiple, Text } from "@/components/Input/Export";
import { UpdatePayment as UpdatePaymentDate } from "@/submission/Employee/Update/Payment/Form";
import { toWebDateTime } from "@/lib/Convert/Convert";
import PaymentCard from "./PaymentCard";
import useMutatePaymentForm from "@/process/Employee/Update/Payment/Mutate/Process";

export interface UpdatePaymentProps {
    payment: UpdatePaymentDate
    onDelete: () => any;
    onUpdate: (payment: UpdatePaymentDate) => any; 
}

export default function UpdatePayment(props: UpdatePaymentProps) {
    const mutatePayment = useMutatePaymentForm({mutateType: 'Update', initialValues: {...props.payment}, ...props});

    return (
        <div>
            {!!mutatePayment.edit && !!mutatePayment.values && !!mutatePayment.state &&
                <Multiple
                    onBlur={mutatePayment.finalizeUpdate}
                    children={(
                        <div>
                            <Text
                                type='number'
                                name='Payment'
                                label='Payment'
                                value={mutatePayment.values.Payment} 
                                state={mutatePayment.state.Payment}
                                onChange={(name, value) => mutatePayment.updateData('Payment', value)}
                                onBlur={() => mutatePayment.resetData('Payment')}
                            />
                            <Text
                                type='text'
                                name='Name'
                                label='Name'
                                value={mutatePayment.values.Name}
                                state={mutatePayment.state.Name}
                                onChange={async (name, value) => mutatePayment.updateData('Name', value)}
                                onBlur={() => mutatePayment.resetData('Name')}
                            />
                            <Text
                                type='text'
                                name='Type'
                                label='Type'
                                value={mutatePayment.values.Type}
                                state={mutatePayment.state.Type}
                                onChange={async (name, value) => mutatePayment.updateData('Type', value)}
                                onBlur={() => mutatePayment.resetData('Type')}
                            />
                            <Text
                                type='text'
                                name='CCN'
                                label='Credit Card Number'
                                value={mutatePayment.values.CCN}
                                state={mutatePayment.state.CCN}
                                onChange={async (name, value) => mutatePayment.updateData('CCN', value)}
                                onBlur={() => mutatePayment.resetData('CCN')}
                            />
                            <Text
                                type='text'
                                name='EXP'
                                label='Expiration Date'
                                value={mutatePayment.values.EXP}
                                state={mutatePayment.state.EXP}
                                onChange={async (name, value) => mutatePayment.updateData('EXP', value)}
                                onBlur={() => mutatePayment.resetData('EXP')}
                            />
                        </div>
                    )}
                />
            }
            {!mutatePayment.edit && 
                <PaymentCard
                    payment={props.payment.Payment}
                    ccn={props.payment.CCN}
                    exp={props.payment.EXP}
                    type={props.payment.Type}
                    name={props.payment.Name}
                    paymentDate={toWebDateTime(props.payment.PaymentDate)}
                    onEdit={() => mutatePayment.setEdit(!props.payment.PaymentID)}
                    onDelete={props.onDelete}
                />
            }
        </div>
    )
}