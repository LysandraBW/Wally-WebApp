export interface InputStateType {
    state: boolean;
    message: string;
}

const DefaultInputState: InputStateType = {
    state: true,
    message: ''
}

export type StateType = {
    Email: InputStateType;
    AppointmentID: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Email: DefaultInputState,
        AppointmentID: DefaultInputState
    }
}