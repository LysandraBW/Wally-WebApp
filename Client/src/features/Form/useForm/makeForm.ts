import makeTestedFormData from "@/features/Form/useForm/makeTestedFormData";
import { Form, FormData, FormTest } from "./Form";
import { Data } from "./Input";
import makeFormData from "./makeFormData";

export default function makeForm(data: Data, test: FormTest, runTest: boolean = false): Form {
    let formData: FormData = runTest ? makeTestedFormData(data, test) : makeFormData(data);
    return {data: formData, test};
}