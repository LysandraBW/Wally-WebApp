import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

export type StateType = {
    Name: InputStateType;
    Summary: InputStateType;
    Sharees: InputStateType;
    UpdatedDate: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Name: DefaultInputState,
        Summary: DefaultInputState,
        Sharees: DefaultInputState,
        UpdatedDate: DefaultInputState
    }
}