import { FormData } from "./Form";
import { Data } from "./Input";
import makeInput from "./makeInput";

export default function makeFormData(data: Data): FormData {
    const formData: FormData = {};
    for (const [name, inputData] of Object.entries(data))
        formData[name] = makeInput(inputData);
    return formData;
}