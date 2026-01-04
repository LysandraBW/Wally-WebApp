import { useEffect, useState } from "react";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/Text";
import Radio from "@/component/Form/Radio/Radio";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import clsx from "clsx";
import useItemManager from "../../../../../features/ItemManager/useItemManager";
import { Note as DB_Note} from "waltronics-types";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";
import { Note, Notes } from "./_DEF";
import Select from "@/component/Form/Select/Select";
import TextArea from "@/component/Form/Text/TextArea";

export default function NoteManager(props: ItemManagerProps<DB_Note, Note, Notes>) {
    const itemManager = useItemManager(props as any);
    const [isCreator, setIsCreator] = useState(false);
    const [employees, setEmployees] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            setEmployees(employees);
        }
        load();
    }, []);


    useEffect(() => {
        if (!employees)
            return;

        if (!props.itemsManager.tempItems || !(props.itemID in props.itemsManager.tempItems)) 
            return;

        const note = props.itemsManager.tempItems[props.itemID] as Note;
        const isCreator = !note.Sharees.includes(note.EmployeeID) || !note.NoteID;
        setIsCreator(isCreator);

        const test = props.itemsManager.item.test(isCreator, getValues(employees));
        itemManager.itemForm.setTest(test);
        
    }, [employees]);


    return (
        <ItemManagerWrapper
            header={props.header}
            canDelete={props.canDelete}
            saveItem={itemManager.saveItem}
            closeItem={itemManager.closeItem}
            resetItem={itemManager.resetItem}
            deleteItem={itemManager.deleteItem}
        >
            {/* Content */}
            <ItemFormGroup head="Content">
                <div className="flex flex-col gap-4">
                    <TextField
                        type="text"
                        name="Head"
                        label="Head"
                        smaller={true}
                        value={itemManager.itemForm.getInput("Head").data}
                        state={itemManager.itemForm.getInput("Head").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextArea
                        type="text"
                        name="Body"
                        label="Body"
                        smaller={true}
                        value={itemManager.itemForm.getInput("Body").data}
                        state={itemManager.itemForm.getInput("Body").state}
                        onChange={itemManager.updateInputValue}
                        onBlur={undefined}
                    />
                </div>
            </ItemFormGroup>
            {/* Attachments */}
            {/*
                 Currently out of service, I don't have my AWS set up anymore. 
                I was afraid that they'd randomly charge me an arm and a leg. 
            */}
            {/* 
            <ItemFormGroup head="Attachments">
                <FileManager
                    files={itemManager.itemForm.getInput("Attachments").data || []}
                    updateFiles={(files) => {
                        itemManager.updateInputValue("Attachments", files);
                    }}
                    uploadFiles={(fileList) => {
                        itemManager.updateInputValue("UploadedAttachments", fileList);
                    }}
                />
            </ItemFormGroup> 
            */}
            {/* Sharees */}
            {isCreator &&
                <ItemFormGroup head="Control Access">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-4">
                            <Select
                                name="Sharees"
                                label="Select Sharees"
                                toggleLabel="Select Sharees"
                                multiple={true}
                                smaller={true}
                                values={itemManager.itemForm.getInput("Sharees").data}
                                state={itemManager.itemForm.getInput("Sharees").state}
                                options={employees}
                                disabled={false}
                                onChange={itemManager.updateInputValue}
                            />
                            <Radio
                                name="ShowCustomer"
                                label="Show to Customer"
                                smaller={true}
                                values={itemManager.itemForm.getInput("ShowCustomer").data}
                                state={itemManager.itemForm.getInput("ShowCustomer").state}
                                options={[
                                    ["0", "No", 
                                        <div className="relative">
                                            <p 
                                                className={clsx(
                                                    "tracking-wide text-xs text-base-700 text-left font-medium", 
                                                    itemManager.itemForm.getInput("ShowCustomer").data[0] === "0" && "text-blue-500"
                                                )}
                                            >
                                                Show
                                            </p>
                                            <span 
                                                className="block text-left text-xs text-base-500 tracking-wide"
                                            >
                                                The customer will be able to see this note.
                                            </span>
                                        </div>
                                    ], 
                                    ["1", "Yes",
                                        <div className="relative">
                                            <p 
                                                className={clsx(
                                                    "tracking-wide text-xs text-base-700 text-left font-medium", 
                                                    itemManager.itemForm.getInput("ShowCustomer").data[0] === "1" && "text-blue-500"
                                                )}
                                            >
                                                Hide
                                            </p>
                                            <span 
                                                className="block text-left text-xs text-base-500 tracking-wide"
                                            >
                                                The customer will not be able to see this note.
                                            </span>
                                        </div>
                                    ]
                                ]}
                                onChange={itemManager.updateInputValue}
                            />
                        </div>
                    </div>  
                </ItemFormGroup>
            }
        </ItemManagerWrapper>
    )
}