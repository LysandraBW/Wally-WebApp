import { Payment, Payments } from "./_DEF";
import { Payment as DB_Payment } from "waltronics-types";
import { Cost, costTest, makeCost } from "@/app/employee/home/update/payment/_DEF";
import { COST } from "@/app/employee/home/update/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import { useEffect, useState } from "react";
import makeForm from "@/features/Form/useForm/makeForm";
import useItemsManager, { UseItemsManagerProps } from "@/features/ItemManager/useItemsManager";


export interface UsePaymentsManagerProps extends UseItemsManagerProps<DB_Payment, Payment, Payments> {
    cost: string;
    saveCostUpdates: (oldCost: Cost, newCost: Cost) => void;
    keyForUpdateManagerForm2: string;
}

export default function usePaymentsManager(props: UsePaymentsManagerProps) {
    const itemsManager = useItemsManager({...props, doNotManageChangesMade: true});
    const costForm = useForm(COST);
    const [oldCost, setOldCost] = useState<Cost>();
    
    
    useEffect(() => {
        resetCostForm();
    }, [props.cost]);


    useEffect(() => {
        if (!props.handleChangesMade)
            return;
        const changesMadeToPayments = JSON.stringify(itemsManager.oldItems) !== JSON.stringify(itemsManager.newItems);
        const changesMadeToCost = JSON.stringify(oldCost) !== JSON.stringify(costForm.getData());
        props.handleChangesMade(props.keyForUpdateManagerForm, changesMadeToPayments || changesMadeToCost);
    }, [costForm.forceUpdate, itemsManager.newItems]);


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