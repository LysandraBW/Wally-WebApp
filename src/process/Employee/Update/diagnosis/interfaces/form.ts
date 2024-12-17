import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

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