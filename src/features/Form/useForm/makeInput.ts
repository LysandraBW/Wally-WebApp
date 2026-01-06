import { Input, InputData, InputState } from "./Input";

export default function makeInput(data: InputData = "", state: InputState = [null, ""]): Input {
    const input: Input = {data, state};
    return input;
}