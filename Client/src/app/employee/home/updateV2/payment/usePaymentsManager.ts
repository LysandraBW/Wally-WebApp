import { Payment, Payments } from "@/pages/employee/edit/finance/payment/_DEF";
import useItemsManager, { UseItemsManagerProps } from "../useItemsManager";
import { Payment as DB_Payment } from "waltronics-types";
import { Cost, costTest, makeCost } from "@/pages/employee/edit/finance/cost/_DEF";
import { COST } from "@/pages/employee/edit/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import { useEffect, useState } from "react";
import makeForm from "@/features/Form/useForm/makeForm";

export interface UsePaymentsManagerProps extends UseItemsManagerProps<DB_Payment, Payment, Payments> {
    cost: string;
    saveCostUpdates: (oldCost: Cost, newCost: Cost) => void;
    keyForUpdateManagerForm2: string;
}

export default function usePaymentsManager(props: UsePaymentsManagerProps) {
    const itemsManager = useItemsManager(props);
    const costForm = useForm(COST);
    const [oldCost, setOldCost] = useState<Cost>();


    useEffect(() => {
        resetCostForm();
    }, [props.cost]);


    const resetCostForm = async () => {
        const cost = makeCost(props.cost);
        setOldCost(cost);
        costForm.resetForm(makeForm(cost, costTest, true));
        itemsManager.updateManagerForm.setInputState(props.keyForUpdateManagerForm2, [costForm.getState(), ""]);
    }

    const saveCostForm = async () => {
        const state = costForm.getState();
        itemsManager.updateManagerForm.setInputState(props.keyForUpdateManagerForm2, [state, ""]);
        if (!state || !oldCost)
            return;
        props.saveCostUpdates(oldCost, costForm.getData() as Cost);
    }
    
    const updateCostValue = async (name: string, value: any) => {
        costForm.updateInputData(name, value);
        itemsManager.updateManagerForm.setInputState(props.keyForUpdateManagerForm2, [costForm.getState(), ""]);
    }

    const saveUpdates = () => {
        saveCostForm();
        itemsManager.saveUpdates();
    }

    const resetUpdates = () => {
        resetCostForm();
        itemsManager.resetUpdates();
    }

    return {
        ...itemsManager,
        saveUpdates,
        resetUpdates,
        updateCostValue,
        costForm,
    }
}