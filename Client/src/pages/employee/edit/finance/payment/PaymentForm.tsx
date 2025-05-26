import { useEffect, useState } from "react";
import { Payment, Payments } from "./_DEF";
import useItemForm from "@/features/ItemManager/useItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import TextField from "@/component/Form/Text/TextField";
import Radio from "@/component/Form/Radio/Radio";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { Payment as DB_Payment} from "waltronics-types"
import clsx from "clsx";

export default function PaymentForm(props: FormProps<DB_Payment, Payment, Payments>) {
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
            header={props.mode === "Create" ? "Add Payment" : `Edit Payment #${(props.mutateItem as any).PaymentID}`}
            canDelete={props.mode !== "Create"}
            onReset={onReset}
            onCancel={props.onCancel}
            onDelete={props.onDelete}
            onMutate={form.onMutate}
            onExpand={props.onExpand}
            onMinimize={props.onMinimize}
            expanded={props.expanded}
            tab="Finances"
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
                            <div className="relative top-[-3px]">
                                <p className={clsx("tracking-wide text-left", !addCard && "text-blue-500 font-medium")}>
                                    Cash
                                </p>
                                <span className="block text-left text-01 tracking-wide font-medium">
                                    Paid with cash. Must be USD.
                                </span>
                            </div>
                        ], 
                        ["\0", "Credit", 
                            <div className="relative top-[-3px]">
                                <p className={clsx("tracking-wide text-left", addCard && "text-blue-500 font-medium")}>
                                    Credit
                                </p>
                                <span className="block text-left text-01 tracking-wide font-medium">
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