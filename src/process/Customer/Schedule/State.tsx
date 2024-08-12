export interface InputStateType {
    state: boolean;
    message: string;
}

const DefaultInputState: InputStateType = {
    state: true,
    message: ''
}

export type StateType = {
    FName:      InputStateType;
    LName:      InputStateType;
    Email:      InputStateType;
    Phone:      InputStateType;
    VIN:        InputStateType;
    Make:       InputStateType;
    Model:      InputStateType;
    ModelYear:  InputStateType;
    Services:   InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        FName:      DefaultInputState,
        LName:      DefaultInputState,
        Email:      DefaultInputState,
        Phone:      DefaultInputState,
        VIN:        DefaultInputState,
        Make:       DefaultInputState,
        Model:      DefaultInputState,
        ModelYear:  DefaultInputState,
        Services:   DefaultInputState
    }
}