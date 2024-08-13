export interface InputStateType {
    state: boolean;
    message: string;
}

const DefaultInputState: InputStateType = {
    state: true,
    message: ''
}

export type StateType = {
    Username: InputStateType;
    Password: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Username: DefaultInputState,
        Password: DefaultInputState
    }
}