import { InputData, InputState, InputTest } from "@/features/Form/useForm/Input";

export async function testInputData(data: InputData, test: InputTest): Promise<InputState> {
    const output = test.safeParse(data);
    let state = [true, ""];
    if (!output.success) {
        state[0] = false;
        state[1] = output.error.issues[0].message;
    }
    return state as InputState;
}