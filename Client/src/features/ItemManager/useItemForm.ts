import { Define } from "./Define";
import useForm, { UseForm } from "../Form/useForm/useForm";
import makeForm from "../Form/useForm/makeForm";
import { Data } from "../Form/useForm/Input";
import { FormTest } from "../Form/useForm/Form";

export interface UseItemFormProps<BaseItem, Item, Items> {
    mode: "Create"|"Update";
    defineItem: Define<BaseItem, Item, Items>;
    mutateItem: Item;
    parentForm: UseForm;
    onMutate: (item: Item) => void;
}

export default function useItemForm<BaseItem, Item, Items>(props: UseItemFormProps<BaseItem, Item, Items>) {
    const form = useForm(props.parentForm.fName + (props.mutateItem as any)[props.defineItem.itemID]);

    const onMutate = async () => {
        const state = form.getState();
        props.parentForm.setInputState(form.fName, [state, ""]);
        if (!state)
            throw "Errors in Form!";
        props.onMutate(form.getData() as Item);
    }

    const onReset = async (item: Item, test: FormTest) => {
        // const item = props.mutateItem;
        // const test = props.defineItem.test;

        if (props.mode === "Create") {
            form.resetForm(makeForm(<Data> item , test));
            props.parentForm.setInputState(form.fName, [null, ""]);
        }
        else if (props.mode === "Update") {
            form.resetForm()
            form.resetForm(makeForm(<Data> item, test, true));
            props.parentForm.setInputState(form.fName, [form.getState(), ""]);
        }
    }

    const updateInputValue = async (inputName: string, inputValue: any) => {
        form.updateInputData(inputName, inputValue);
        props.parentForm.setInputState(form.fName, [form.getState(false), ""]);
    }

    return {
        form,
        onMutate,
        onReset,
        updateInputValue
    }
}