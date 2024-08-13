import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    Service:    InputStateType;
    Division:   InputStateType;
    Class:      InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Service:    DefaultInputState,
        Division:   DefaultInputState,
        Class:      DefaultInputState
    }
}