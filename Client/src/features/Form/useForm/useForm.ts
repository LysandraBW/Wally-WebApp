import { z } from "zod";
import { Form, FormData, FormTest } from "./Form";
import { useEffect, useState } from "react";
import { Data, Input, InputData, InputState, InputTest } from "./Input";
import makeInput from "./makeInput";
import processTestResults from "./processTestResults";

const forms: {[name: string]: Form} = {};
export type UseForm = ReturnType<typeof useForm>;

// fName: Form Name

export default function useForm(fName: string, startForm: Form = {data: {}, test: z.object({})}) {
    let form: Form = forms[fName];
    const [forceUpdate, setForceUpdate] = useState(0);

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
        setForceUpdate(f => f + 1);
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

    const setTest = (test: FormTest): void => {
        if (!form)
            return;
        form.test = test;
    }

    const setData = (data: FormData): void => {
        if (!form)
            return;
        form.data = data;
        setForceUpdate(f => f + 1);
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
        if (!output.success)
            state = processTestResults(output.error.issues)[name];
        form.data[name] = {data, state};
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
        for (const name of Object.keys(form.data)) {
            data[name] = form.data[name].data;
        }

        return data;
    }

    const getState = (update: boolean = true): boolean => {
        if (!form)
            return true;
        
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
        setForceUpdate(f => f + 1);
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
        setTest,
        setData,
        deleteInput,
        resetForm,
        forceUpdate
    }
}