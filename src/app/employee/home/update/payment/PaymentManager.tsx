import { useEffect, useState } from "react";
import TextField from "@/component/Form/Text/Text";
import Radio from "@/component/Form/Radio/Radio";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import { Payment as DB_Payment} from "waltronics-types"
import clsx from "clsx";
import useItemManager from "../../../../../features/ItemManager/useItemManager";
import { Payment, Payments } from "./_DEF";
import { ItemManagerProps, ItemForm } from "@/features/ItemManager/components/ItemForm";
import Segment from "@/component/Form/Segment/Segment";

export default function PaymentManager(props: ItemManagerProps<DB_Payment, Payment, Payments>) {
    const itemManager = useItemManager(props as any);
    const [addCard, setAddCard] = useState(false);

    
    useEffect(() => {
        if (!props.itemsManager.tempItems || !(props.itemID in props.itemsManager.tempItems)) 
            return;

        const item = props.itemsManager.tempItems[props.itemID] as Payment;
        setAddCard((item as any).addCard || (!!item.CCN && !!item.EXP));
    }, [props.itemID, props.itemsManager.tempItems]);


    useEffect(() => {
        itemManager.itemForm.setTest(props.itemsManager.item.test(addCard));
    }, [addCard]);


    return (
        <ItemForm
            header={props.header}
            canDelete={props.canDelete}
            saveItem={itemManager.saveItem}
            closeItem={itemManager.closeItem}
            resetItem={itemManager.resetItem}
            deleteItem={itemManager.deleteItem}
        >
            {/* Amount */}
            <ItemFormGroup 
                head="Amount Paid"
            >
                <TextField
                    type="text"
                    name="Payment"
                    label="Amount"
                    prefix="$"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Payment").data}
                    state={itemManager.itemForm.getInput("Payment").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            {/* Payment Type */}
            <ItemFormGroup 
                head="Payment Type"
            >
                <Radio
                    name="addCard"
                    values={[addCard ? "\0" : ""]}
                    options={[
                        ["", "Cash", 
                            <div className="relative top-[px]">
                                <p className={clsx("tracking-wide text-base-700 text-xs text-left font-medium", !addCard && "text-blue-500")}>
                                    Cash
                                </p>
                                <span className="block text-left text-xs text-base-500 dark:text-base-400 min-w-[100px] tracking-wide">
                                    Paid with cash. Must be USD.
                                </span>
                            </div>
                        ], 
                        ["\0", "Credit", 
                            <div className="relative top-[-px]">
                                <p className={clsx("tracking-wide text-base-700 text-xs text-left font-medium", addCard && "text-blue-500")}>
                                    Credit
                                </p>
                                <span className="block text-left text-xs text-base-500 dark:text-base-400 min-w-[100px] tracking-wide">
                                    Paid with VISA or Mastercard.
                                </span>
                            </div>
                        ]
                    ]}
                    onChange={(name, value) => {
                        setAddCard(value[0] === "\0");
                        // Payment-Items don't have this data, but this is a quick
                        // add so that the value checked will remained that way.
                        // It works fine!
                        itemManager.updateInputValue("addCard", value[0] === "\0");
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
                        smaller={true}
                        value={itemManager.itemForm.getInput("Name").data}
                        state={itemManager.itemForm.getInput("Name").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <Segment
                        name="Type"
                        label="Type"
                        smaller={true}
                        values={itemManager.itemForm.getInput("Type").data}
                        options={[["VISA", "VISA"], ["AMEX", "AMEX"], ["MASTERCARD", "MASTERCARD"]]}
                        state={itemManager.itemForm.getInput("Type").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                        
                    />
                    <TextField
                        type="text"
                        name="CCN"
                        label="Credit Card Number"
                        smaller={true}
                        value={itemManager.itemForm.getInput("CCN").data}
                        state={itemManager.itemForm.getInput("CCN").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="EXP"
                        label="Expiration Date"
                        smaller={true}
                        value={itemManager.itemForm.getInput("EXP").data}
                        state={itemManager.itemForm.getInput("EXP").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                        placeholder="MMYY"
                    />
                </ItemFormGroup>
            }
        </ItemForm>
    )    
}