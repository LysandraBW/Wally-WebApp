import { FormState, FormStateAction } from "./Interface";

export default function FormStateReducer(state: FormState, action: FormStateAction): FormState {
    const updatedInputState = {...state.input};
    for (const [inputName, inputState] of Object.entries(action.states)) {
        updatedInputState[`${inputName}`] = {
            state: inputState[0],
            message: inputState[1] || ''
        };
    }

    let updatedState = true;
    for (const [, inputState] of Object.entries(updatedInputState)) {
        if (!inputState.state) {
            updatedState = false;
            break;
        }
    }

    return {
        state: updatedState,
        input: updatedInputState
    }
}