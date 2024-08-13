import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    VIN:            InputStateType;
    Make:           InputStateType;
    Model:          InputStateType;
    ModelYear:      InputStateType;
    Mileage:        InputStateType;
    LicensePlate:   InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        VIN:            DefaultInputState,
        Make:           DefaultInputState,
        Model:          DefaultInputState,
        ModelYear:      DefaultInputState,
        Mileage:        DefaultInputState,
        LicensePlate:   DefaultInputState
    }
}