import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    Head: InputStateType;
    Body: InputStateType;
    Files: InputStateType;
    Sharees: InputStateType;
    ShowCustomer: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Head: DefaultInputState,
        Body: DefaultInputState,
        Files: DefaultInputState,
        Sharees: DefaultInputState,
        ShowCustomer: DefaultInputState
    }
}