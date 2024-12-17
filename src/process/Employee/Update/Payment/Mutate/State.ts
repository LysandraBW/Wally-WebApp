import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

export type StateType = {
    Name: InputStateType;
    Type: InputStateType;
    Payment: InputStateType;
    CCN: InputStateType;
    EXP: InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        Name: DefaultInputState,
        Type: DefaultInputState,
        Payment: DefaultInputState,
        CCN: DefaultInputState,
        EXP: DefaultInputState
    }
}