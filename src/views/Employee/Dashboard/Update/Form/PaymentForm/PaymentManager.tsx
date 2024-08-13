import { Fragment } from "react";
import UpdatePayment from "./UpdatePayment";
import CreatePayment from "./CreatePayment";
import {Text} from "@/components/Input/Export";
import usePaymentManager from "@/process/Employee/Update/Payment/Process";
import { DB_Appointment } from "@/database/Types";

interface PaymentFormProps {
    appointment: DB_Appointment;
}

export default function PaymentManager(props: PaymentFormProps) {
    const paymentManager = usePaymentManager(props.appointment);
    
    return (
        <Fragment>
            {!!paymentManager.updated && !!paymentManager.costState &&
                <Fragment>
                    <Text
                        type='number'
                        name='Cost'
                        label='Cost'
                        value={paymentManager.updated.Cost}
                        state={paymentManager.costState}
                        onChange={(name, value) => paymentManager.updateCost(value)}
                        onBlur={() => paymentManager.resetCost()}
                    />
                    <div>
                        {Object.entries(paymentManager.updated.Payments).map(([paymentID, payment], i) => (
                            <div key={i}>
                                <UpdatePayment
                                    payment={payment}
                                    onDelete={() => paymentManager.deletePayment(paymentID)}
                                    onUpdate={payment => paymentManager.updatePayment(paymentID, payment)}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <CreatePayment
                            onChange={value => paymentManager.createPayment(value)}
                        />
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}