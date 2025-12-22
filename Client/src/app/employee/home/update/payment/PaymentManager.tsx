import { useEffect, useState } from "react";
import TextField from "@/component/Form/Text/Text";
import Radio from "@/component/Form/Radio/Radio";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import { Payment as DB_Payment} from "waltronics-types"
import clsx from "clsx";
import useItemManager from "../../../../../features/ItemManager/useItemManager";
import { Payment, Payments } from "./_DEF";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";

export default function PaymentManager(props: ItemManagerProps<DB_Payment, Payment, Payments>) {
    const itemManager = useItemManager(props as any);
    const [addCard, setAddCard] = useState(false);

    
    useEffect(() => {
        if (!props.itemsManager.forms || !(props.itemID in props.itemsManager.forms)) 
            return;

        const item = props.itemsManager.forms[props.itemID] as Payment;
        setAddCard(!!item.CCN && !!item.EXP);
    }, [props.itemsManager.forms]);


    return (
        <ItemManagerWrapper
            header={props.header}
            canDelete={props.canDelete}
            saveItem={itemManager.saveItem}
            closeItem={itemManager.closeItem}
            resetItem={itemManager.resetItem}
            deleteItem={itemManager.deleteItem}
        >
            {/* Amount */}
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Payment"
                    label="Payment"
                    value={itemManager.itemForm.getInput("Payment").data}
                    state={itemManager.itemForm.getInput("Payment").state}
                    onChange={itemManager.updateInputValue}
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
                        value={itemManager.itemForm.getInput("Name").data}
                        state={itemManager.itemForm.getInput("Name").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="Type"
                        label="Type"
                        value={itemManager.itemForm.getInput("Type").data}
                        state={itemManager.itemForm.getInput("Type").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="CCN"
                        label="Credit Card Number"
                        value={itemManager.itemForm.getInput("CCN").data}
                        state={itemManager.itemForm.getInput("CCN").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="EXP"
                        label="Expiration Date"
                        value={itemManager.itemForm.getInput("EXP").data}
                        state={itemManager.itemForm.getInput("EXP").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                </ItemFormGroup>
            }
        </ItemManagerWrapper>
    )    
}