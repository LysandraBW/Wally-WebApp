export interface ReducerState {
    state: boolean;
    input: {
        [name: string]: {
            state: boolean;
            message: string;
        }
    }
}

export const InitialFormError: ReducerState = {
    state: true,
    input: {}
}

export interface ReducerAction {
    name: string;
    inspection: [boolean, string?];
}

export default function FormErrorReducer(state: ReducerState, action: ReducerAction): ReducerState {
    // The error of the entire form
    // is determined by the (error) states
    // of its inputs.
    let error = false;
    for (const [inputName, inputError] of Object.entries(state.input)) {
        // Use the updated value for the input that has yet to be updated.
        if ((inputName === action.name && !action.inspection[0]) || (inputName !== action.name && !inputError.state)) {
            error = true;
            break;
        }
    }

    // In Case of New Input
    if (!error)
        error = !action.inspection[0];

    return {
        state: !error,
        input: {
            ...state.input,
            [`${action.name}`]: {
                state: action.inspection[0],
                message: action.inspection[1] || ''
            }
        }
    }
}