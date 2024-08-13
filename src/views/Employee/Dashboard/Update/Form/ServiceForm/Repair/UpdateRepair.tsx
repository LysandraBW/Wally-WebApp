import { Multiple, Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";
import RepairCard from "./RepairCard";
import useMutateRepair from "@/process/Employee/Update/Repair/Mutate/Process";

export interface UpdateRepairProps {
    repair: DB_Repair;
    onDelete: () => void;
    onUpdate: (repair: DB_Repair) => void;  
}

export default function UpdateRepair(props: UpdateRepairProps) {
    const mutateRepair = useMutateRepair({mutateType: 'Update', initialValues: {...props.repair}, ...props});

    return (
        <div>
            {!!mutateRepair.edit && !!mutateRepair.values && !!mutateRepair.state && 
                <Multiple
                    onBlur={() => {
                        mutateRepair.setEdit(false);
                        mutateRepair.finalizeUpdate();
                    }}
                    children={(
                        <div>
                            <Text
                                type='text'
                                name='Repair'
                                label='Repair'
                                value={mutateRepair.values.Repair}
                                state={mutateRepair.state.Repair}
                                onChange={async (name, value) => mutateRepair.updateData('Repair', value)}
                                onBlur={() => mutateRepair.resetData('Repair')}
                            />
                        </div>
                    )}
                />
            }
            {!mutateRepair.edit && 
                <RepairCard
                    repair={props.repair.Repair}
                    onEdit={() => mutateRepair.setEdit(true)}
                    onDelete={props.onDelete}
                />
            }
        </div>
    )
}