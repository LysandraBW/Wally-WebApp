import { Fragment } from "react";
import { Text } from "@/components/Input/Export";
import AddButton from "@/components/Button/Text/Add";
import useMutateRepair from "@/process/Employee/Update/Repair/Mutate/Process";
import { DefaultValues } from "@/process/Employee/Update/Repair/Mutate/Loaded";

export interface CreateRepairProps {
    onChange: (value: any) => any;
}

export default function CreateRepair(props: CreateRepairProps) {
    const mutateRepair = useMutateRepair({mutateType: 'Create', initialValues: DefaultValues, ...props});

    return (
        <div>
            {!!mutateRepair.values && !!mutateRepair.state &&
                <Fragment>
                    <Text
                        type='text'
                        name='Repair'
                        label='Repair'
                        value={mutateRepair.values.Repair}
                        state={mutateRepair.state.Repair}
                        onChange={async (name, value) => mutateRepair.updateData('Repair', value)}
                    />
                    <AddButton 
                        onClick={mutateRepair.finalizeCreate}
                    />
                </Fragment>
            }
        </div>
    )
}