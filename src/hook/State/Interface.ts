export interface InputState {
    state: boolean;
    message?: string;
}

export interface FormState {
    state: boolean;
    input: {
        [name: string]: InputState;
    };
}

export interface FormStateAction {
    states: {[name: string]: [boolean, string?]};
}

export const InitialFormState: FormState = {
    state: false,
    input: {}
}

export const DefaultState: InputState = {
    state: true,
    message: ''
}