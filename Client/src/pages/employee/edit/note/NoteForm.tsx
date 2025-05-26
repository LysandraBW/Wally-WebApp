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

export default function NoteForm<DB_Note, Note, Notes>(props: FormProps<DB_Note, Note, Notes>) {
    const form = useItemForm(props);
    const [isCreator, setIsCreator] = useState(false);
    const [employees, setEmployees] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            console.log(employees);
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
        const note = props.mutateItem as any;
        const isCreator = !note.Sharees.includes(note.EmployeeID) || !note.NoteID;
        setIsCreator(isCreator);
        form.onReset(props.mutateItem, props.defineItem.test(isCreator, getValues(employees)));
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Add Note" : `Edit Note #${(props.mutateItem as any).NoteID}`}
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
                                        <div className="top-[-3px]">
                                            <h6 className="text-left text-04">Show</h6>
                                            <span className="block text-left">
                                                The customer will be able to see this note.
                                            </span>
                                        </div>
                                    ], 
                                    ["1", "Yes",
                                        <div className="top-[-3px]">
                                            <h6 className="text-left text-04">Hide</h6>
                                            <span className="block text-left">
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