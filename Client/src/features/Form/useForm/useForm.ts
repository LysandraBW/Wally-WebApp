import { z } from "zod";
import { Form } from "./Form";
import { useEffect, useState } from "react";
import { Data, Input, InputData, InputState, InputTest } from "./Input";
import makeInput from "./makeInput";
import processTestResults from "./processTestResults";

const forms: {[name: string]: Form} = {};
export type UseForm = ReturnType<typeof useForm>;

export default function useForm(fName: string, startForm: Form = {data: {}, test: z.object({})}) {
    let form: Form = forms[fName];
    const [, setForceUpdate] = useState(0);

    useEffect(() => {
        forms[fName] = startForm;
        form = forms[fName];
    }, []);

    const getInput = (name: string): Input => {
        if (!form || !form.data[name])
            return makeInput();
        return form.data[name];
    }

    const deleteInput = (name: string): void => {
        if (!form)
            return;
        delete form.data[name];
    }

    const setInputData = (name: string, data: InputData): void => {
        if (!form)
            return;
        if (!form.data[name])
            form.data[name] = makeInput();
        form.data[name].data = data;
        setForceUpdate(f => f + 1);
    }

    const setInputTest = (name: string, test: InputTest): void => {
        if (!form)
            return;
        const updatedTest = form.test.extend({[name]: test});
        form.test = updatedTest;
    }

    const setInputState = (name: string, state: InputState): void => {
        if (!form)
            return;
        if (!form.data[name])
            form.data[name] = makeInput();
        form.data[name].state = state;
        setForceUpdate(f => f + 1);
    }

    const updateInputData = (name: string, data: InputData): void => {
        if (!form)
            return;
        let state: InputState = [true, ""];
        const output = form.test.safeParse({[name]: data});
        console.log(output);
        if (!output.success)
            state = processTestResults(output.error.issues)[name];
        form.data[name] = {data, state};
        console.log(form.data);
        setForceUpdate(f => f + 1);
    }

    const updateInputTest = (name: string, test: InputTest): void => {
        if (!form)
            return;
        setInputTest(name, test);
        updateInputData(name, form.data[name].data);
    }

    const getData = (): Data => {
        if (!form)
            return {};
        const data: Data = {};
        const fData = form.data;
        for (const name of Object.keys(fData))
            data[name] = fData[name].data;
        return data;
    }

    const getState = (update: boolean = true): boolean => {
        if (!form)
            return true;
        const data = getData();
        console.log(data)
        const output = form.test.safeParse(getData());
        if (output.success || !update)
            return output.success;
        const states = processTestResults(output.error.issues);
        for (const [name, state] of Object.entries(states))
            form.data[name].state = state
        setForceUpdate(f => f + 1);
        return false;
    }

    const resetForm = (form: Form = {data: {}, test: z.object({})}): void => {
        forms[fName] = form;
    }

    return {
        fName,
        getData,
        getState,
        getInput,
        updateInputData,
        updateInputTest,
        setInputData,
        setInputTest,
        setInputState,
        deleteInput,
        resetForm
    }
}