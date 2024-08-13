import { DefaultInputState, InputStateType } from "@/components/Input/MutateInput";

export type StateType = {
    PartNumber: InputStateType;
    PartName:   InputStateType;
    Quantity:   InputStateType;
    UnitCost:   InputStateType;
}

export const InitialState = async (): Promise<StateType> => {
    return {
        PartNumber: DefaultInputState,
        PartName:   DefaultInputState,
        Quantity:   DefaultInputState,
        UnitCost:   DefaultInputState
    }
}