import { DefaultInputState, InputStateType } from "@/components/input/mutateInput";

export type StateType = {
    FName:      InputStateType;
    LName:      InputStateType;
    Email:      InputStateType;
    Phone:      InputStateType;
    StartDate:  InputStateType;
    EndDate:    InputStateType;
    StatusID:   InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        FName:      DefaultInputState,
        LName:      DefaultInputState,
        Email:      DefaultInputState,
        Phone:      DefaultInputState,
        StartDate:  DefaultInputState,
        EndDate:    DefaultInputState,
        StatusID:   DefaultInputState
    }
}