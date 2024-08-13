import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    Repair: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Repair: DefaultInputState
    }
}