import { useEffect, useState } from "react";
import FileManager from "./FileManager";
import { getCookie } from "@/utils/cookies/getCookie";
import useItemForm from "@/features/ItemManager/useItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/TextField";
import MultipleSelect from "@/component/Form/Select/Select/MultipleSelect";
import Radio from "@/component/Form/Radio/Radio";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import clsx from "clsx";
import useThingManager from "../useThingManager";

export default function NoteForm<DB_Note, Note, MappedNotes>(props: ThingManagerProps<DB_Note, Note, MappedNotes>) {
    const thingManager = useThingManager(props);
    const [isCreator, setIsCreator] = useState(false);
    const [employees, setEmployees] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            // console.log(employees);
            setEmployees(employees);
        }
        load();
    }, []);

    useEffect(() => {
        if (!employees)
            return;
        onReset();
    }, [employees]);

    const onReset = async () => {
        const note = props.thingFormData as any;
        const isCreator = !note.Sharees.includes(note.EmployeeID) || !note.NoteID;
        setIsCreator(isCreator);
        form.onReset(props.thingFormData, props.defineItem.test(isCreator, getValues(employees)));
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Add Note" : `Edit Note #${(props.thingFormData as any).NoteID}`}
            canDelete={props.mode !== "Create"}
            onReset={onReset}
            onDelete={props.onDelete}
            onCancel={props.onCancel}
            onMutate={form.onMutate}
            onExpand={props.onExpand}
            onMinimize={props.onMinimize}
            expanded={props.expanded}
            tab="Notes"
        >
            {/* Content */}
            <ItemFormGroup head="Content">
                <div className="flex flex-col gap-4">
                    <TextField
                        type="text"
                        name="Head"
                        label="Head"
                        value={form.form.getInput("Head").data}
                        state={form.form.getInput("Head").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                    <TextField
                        type="text"
                        name="Body"
                        label="Body"
                        value={form.form.getInput("Body").data}
                        state={form.form.getInput("Body").state}
                        onChange={form.updateInputValue}
                        onBlur={undefined}
                    />
                </div>
            </ItemFormGroup>
            {/* Attachments */}
            <ItemFormGroup head="Attachments">
                <FileManager
                    files={form.form.getInput("Attachments").data || []}
                    updateFiles={(files) => {
                        form.updateInputValue("Attachments", files);
                    }}
                    uploadFiles={(fileList) => {
                        form.updateInputValue("UploadedAttachments", fileList);
                    }}
                />
            </ItemFormGroup>
            {/* Sharees */}
            {isCreator &&
                <ItemFormGroup head="Control Access">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-4">
                            <MultipleSelect
                                name="Sharees"
                                label="Select Sharees"
                                toggleLabel="Select Sharees"
                                values={form.form.getInput("Sharees").data}
                                state={form.form.getInput("Sharees").state}
                                options={employees}
                                disabled={false}
                                onChange={form.updateInputValue}
                            />
                            <Radio
                                name="ShowCustomer"
                                label="Show to Customer"
                                values={form.form.getInput("ShowCustomer").data}
                                state={form.form.getInput("ShowCustomer").state}
                                options={[
                                    ["0", "No", 
                                        <div className="relative top-[-3px]">
                                            <p className={clsx("tracking-wide text-left", form.form.getInput("ShowCustomer").data[0] === "0" && "text-blue-500 font-medium")}>
                                                Show
                                            </p>
                                            <span className="block text-left text-01 tracking-wide font-medium">
                                                The customer will be able to see this note.
                                            </span>
                                        </div>
                                    ], 
                                    ["1", "Yes",
                                        <div className="relative top-[-3px]">
                                            <p className={clsx("tracking-wide text-left", form.form.getInput("ShowCustomer").data[0] === "1" && "text-blue-500 font-medium")}>
                                                Hide
                                            </p>
                                            <span className="block text-left text-01 tracking-wide font-medium">
                                                The customer will not be able to see this note.
                                            </span>
                                        </div>
                                    ]
                                ]}
                                onChange={form.updateInputValue}
                            />
                        </div>
                    </div>  
                </ItemFormGroup>
            }
        </ItemForm>
    )
}