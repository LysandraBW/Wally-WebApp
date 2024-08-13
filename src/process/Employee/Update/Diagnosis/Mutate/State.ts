import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    Code:       InputStateType;
    Message:    InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Code:       DefaultInputState,
        Message:    DefaultInputState
    }
}