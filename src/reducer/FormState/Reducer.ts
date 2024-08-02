export interface ReducerState {
    state: boolean;
    input: {
        [name: string]: {
            state: boolean;
            message: string;
        }
    }
}

export const InitialFormState: ReducerState = {
    state: true,
    input: {}
}

export interface ReducerAction {
    name?: string;
    state?: [boolean, string?];
    states?: {[name: string]: [boolean, string?]}
}

export default function FormStateReducer(state: ReducerState, action: ReducerAction): ReducerState {
    if (action.states) {
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
    else if (action.name && action.state) {
        // The error of the entire form
        // is determined by the (error) states
        // of its inputs.
        let updatedState = true;
        for (const [inputName, inputState] of Object.entries(state.input)) {
            // Use the updated value for the input that has yet to be updated.
            if ((inputName === action.name && !action.state[0]) || (inputName !== action.name && !inputState.state)) {
                updatedState = false;
                break;
            }
        }
    
        if (updatedState)
            updatedState = action.state[0];
    
        return {
            state: updatedState,
            input: {
                ...state.input,
                [`${action.name}`]: {
                    state: action.state[0],
                    message: action.state[1] || ''
                }
            }
        }
    }
    return state;
}