import { FormData, FormTest } from "@/features/Form/useForm/Form";
import { Data } from "@/features/Form/useForm/Input";

export default function makeTestedFormData(data: Data, test: FormTest): FormData {
    const inputs: FormData = {};
    for (const name of Object.keys(data))
        inputs[name] = {data: data[name], state: [true, ""]};

    const output = test.safeParse(data);
    if (output.success)
        return inputs;

    for (const issue of output.error.issues) {
        const inputName = issue.path[0];
        inputs[inputName].state[0] = false;
        inputs[inputName].state[1] += issue.message;
    }

    return inputs;
}