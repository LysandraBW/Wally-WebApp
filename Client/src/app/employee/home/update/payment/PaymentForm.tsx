import { useEffect, useState } from "react";
import { Payment, MappedPayments } from "./_DEF";
import useItemForm from "@/features/ItemManager/useItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import TextField from "@/component/Form/Text/TextField";
import Radio from "@/component/Form/Radio/Radio";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { Payment as DB_Payment} from "waltronics-types"
import clsx from "clsx";
import useThingManager from "../useThingManager";
import { ThingManagerProps, ThingManagerWrapper } from "../ThingManager";

export default function PaymentForm(props: ThingManagerProps<DB_Payment, Payment, MappedPayments>) {
    const thingManager = useThingManager(props);
    const [addCard, setAddCard] = useState(false);

    useEffect(() => {
       const CCN = thingManager.thingForm.getInput("CCN").data;
       const EXP = thingManager.thingForm.getInput("EXP").data;
       setAddCard(!!CCN && !!EXP);
    }, [thingManager.thingForm.forceUpdate]);

    return (
        <ThingManagerWrapper
            header={props.header}
            canDelete={props.canDelete}
            saveThing={thingManager.saveThing}
            resetThing={thingManager.resetThing}
            closeThing={thingManager.closeThing}
            cancelThing={thingManager.cancelThing}
            deleteThing={thingManager.deleteThing}
        >
            {/* Amount */}
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Payment"
                    label="Payment"
                    value={thingManager.thingForm.getInput("Payment").data}
                    state={thingManager.thingForm.getInput("Payment").state}
                    onChange={thingManager.updateInputValue}
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
                        value={thingManager.thingForm.getInput("Name").data}
                        state={thingManager.thingForm.getInput("Name").state}
                        onChange={thingManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="Type"
                        label="Type"
                        value={thingManager.thingForm.getInput("Type").data}
                        state={thingManager.thingForm.getInput("Type").state}
                        onChange={thingManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="CCN"
                        label="Credit Card Number"
                        value={thingManager.thingForm.getInput("CCN").data}
                        state={thingManager.thingForm.getInput("CCN").state}
                        onChange={thingManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="EXP"
                        label="Expiration Date"
                        value={thingManager.thingForm.getInput("EXP").data}
                        state={thingManager.thingForm.getInput("EXP").state}
                        onChange={thingManager.updateInputValue}
                        onBlur={undefined}
                    />
                </ItemFormGroup>
            }
        </ThingManagerWrapper>
    )    
}