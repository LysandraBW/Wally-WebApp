import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

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