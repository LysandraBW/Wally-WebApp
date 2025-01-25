import { makeCost, costTest, Cost } from "./_DEF";
import { useEffect, useState } from "react";
import { COST } from "../../_DEF";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import TextField from "@/component/Form/Text/TextField";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";

interface CostFormProps {
    cost: string;
    parent: UseForm;
    onSaveUpdates: (oldCost: Cost, newCost: Cost) => void;
}

export default function CostForm(props: CostFormProps) {
    const form = useForm(COST);
    const [oldCost, setOldCost] = useState<Cost>();

    useEffect(() => {
        resetForm();
    }, [props.cost]);

    const resetForm = async () => {
        const cost = makeCost(props.cost);
        setOldCost(cost);
        form.resetForm(makeForm(cost, costTest, true));
        props.parent.setInputState(COST, [form.getState(), ""]);
    }

    const saveForm = async () => {
        const state = form.getState();
        props.parent.setInputState(COST, [state, ""]);
        if (!state || !oldCost)
            return;
        const newCost = form.getData() as Cost;
        props.onSaveUpdates(oldCost, newCost);
    }

    const updateValue = async (name: string, value: any) => {
        form.updateInputData(name, value);
        props.parent.setInputState(name, [form.getState(), ""]);
    }

    return (
        <div>
            <div className="px-6 py-6 w-[50%]">
                <TextField
                    type="text"
                    name="Cost"
                    label="Cost"
                    value={form.getInput("Cost").data}
                    state={form.getInput("Cost").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
            </div>
            <SaveResetButtons
                onSave={saveForm}
                onReset={resetForm}
            />
        </div>
    )
}