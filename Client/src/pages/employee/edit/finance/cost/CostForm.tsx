import { makeCost, costTest, Cost } from "./_DEF";
import { Fragment, useEffect, useState } from "react";
import { COST } from "../../_DEF";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import makeForm from "@/features/Form/useForm/makeForm";
import TextField from "@/component/Form/Text/TextField";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import TextFieldGrid from "../../TextFieldGrid";

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
        <Fragment>
            <div className="row-start-3 row-span-1 col-start-1 col-span-1 grow relative flex flex-col w-full">
                <div className="bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full grow">
                    <table className="grow w-full border-collapse">
                        <tbody>
                            <TextFieldGrid
                                type="text"
                                name="Cost"
                                label="Cost"
                                value={form.getInput("Cost").data}
                                state={form.getInput("Cost").state}
                                onChange={updateValue}
                                onBlur={undefined}
                            />
                        </tbody>
                    </table>
                </div>
                <SaveResetButtons
                    onSave={saveForm}
                    onReset={resetForm}
                />
            </div>
        </Fragment>
    )
}