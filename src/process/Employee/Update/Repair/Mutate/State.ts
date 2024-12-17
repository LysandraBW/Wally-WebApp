import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

export type StateType = {
    Repair: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Repair: DefaultInputState
    }
}