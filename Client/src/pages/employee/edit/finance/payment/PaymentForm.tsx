import { useEffect, useState } from "react";
import { Payment, Payments } from "./_DEF";
import { DB_AppointmentPayment } from "@/services/DB/Interface/Appointment";
import useItemForm from "@/features/ItemManager/useItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import TextField from "@/component/Form/Text/TextField";
import Radio from "@/component/Form/Radio/Radio";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import clsx from "clsx";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";

export default function PaymentForm(props: FormProps<DB_AppointmentPayment, Payment, Payments>) {
    const form = useItemForm(props);
    const [addCard, setAddCard] = useState(false);

    useEffect(() => {
       onReset();
       setAddCard(!!props.mutateItem.CCN && !!props.mutateItem.EXP);
    }, [props.mutateItem]);

    const onReset = () => {
        form.onReset(props.mutateItem, props.defineItem.test());
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Create Payment" : `Edit Payment #${(props.mutateItem as any).PaymentID}`}
            canDelete={parseInt(props.mutateItem.PaymentID) >= 0}
            onReset={onReset}
            onCancel={props.onCancel}
            onDelete={props.onDelete}
            onMutate={form.onMutate}
        >
            {/* Amount */}
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Payment"
                    label="Payment"
                    value={form.form.getInput("Payment").data}
                    state={form.form.getInput("Payment").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            {/* Payment Type */}
            <ItemFormGroup head="Payment Type">
                <Radio
                    name="addCard"
                    values={[addCard ? "\0" : ""]}
                    options={[
                        ["", "Cash", 
                            <div className="top-[-3px]">
                                <p className="text-left">
                                    Cash
                                </p>
                                <span className="block text-left">
                                    Paid with cash. Must be USD.
                                </span>
                            </div>
                        ], 
                        ["\0", "Credit", 
                            <div className="top-[-3px]">
                                <p className="text-left">
                                    Credit
                                </p>
                                <span className="block text-left">
                                    Paid with VISA or Mastercard.
                                </span>
                            </div>
                        ]
                    ]}
                    onChange={(name, value) => {
                        setAddCard(value[0] === "\0");
                    }}
                />
            </ItemFormGroup>
            {/* Credit Card Information */}
            {addCard && 
                <ItemFormGroup head="Card Information">
                    <TextField
                        type="text"
                        name="Name"
                        label="Name"
                        value={form.form.getInput("Name").data}
                        state={form.form.getInput("Name").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="Type"
                        label="Type"
                        value={form.form.getInput("Type").data}
                        state={form.form.getInput("Type").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="CCN"
                        label="Credit Card Number"
                        value={form.form.getInput("CCN").data}
                        state={form.form.getInput("CCN").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="EXP"
                        label="Expiration Date"
                        value={form.form.getInput("EXP").data}
                        state={form.form.getInput("EXP").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                </ItemFormGroup>
            }
        </ItemForm>
    )    
}