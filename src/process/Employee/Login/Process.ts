import { DataKeys, DataType, InitialData } from "@/submission/Employee/Login/Data";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { hasLength } from "@/validation/Validation";
import { submit } from "@/submission/Employee/Login/Submit";
import { goToDashboard } from "@/lib/Navigation/Navigation";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";

export default function useLogin() {
    const [data, setData] = useState<DataType>();
    const [state, setState] = useState<StateType>();
    const [failed, setFailed] = useState<boolean>();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setData(await InitialData());
        setState(await InitialState());
        setFailed(false);
    }   
    
    const inspectData = async <T,>(key: DataKeys, value: T, callback: (value: T) => Promise<MessageType>): Promise<boolean> => {
        const [state, message] = await callback(value);
        setState(_state => Object.assign({}, _state, {[`${key}`]: {state, message}}));
        return state;
    }
        
    const inspectAllData = async () => {
        if (!data)
            return false;
        const vUsername = await inspectData('Username', data.Username, hasLength);
        const vPassword = await inspectData('Password', data.Password, hasLength);
        return vUsername && vPassword;
    }

    const updateData = async (key: DataKeys, value: any) => {
        setData(data => Object.assign({}, data, {[`${key}`]: value}));   
        switch (key) {
            case 'Username':
                inspectData('Username', value, hasLength);
                break;
            case 'Password':
                inspectData('Password', value, hasLength);
                break;
        }
    }

    const submitData = async () => {
        if (!data)
            return;
        if (!(await submit(data))) {
            setFailed(true);
            return;
        }
        await goToDashboard();
    }

    const resetFailed = () => {
        setFailed(false);
    }

    return {
        data,
        state,
        failed,
        updateData,
        submitData,
        inspectAllData,
        resetFailed
    }
}