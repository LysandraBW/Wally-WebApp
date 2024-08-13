import { Text } from "@/components/Input/Export";
import AddButton from "@/components/Button/Text/Add";
import useMutatePart from "@/process/Employee/Update/Part/Mutate/Process";
import { DefaultValues } from "@/process/Employee/Update/Part/Mutate/Loaded";
import { Fragment } from "react";

export interface CreatePartProps {
    onChange: (value: any) => any;
}

export default function CreatePart(props: CreatePartProps) {
    const mutatePart = useMutatePart({mutateType: 'Create', initialValues: DefaultValues, ...props});

    return (
        <div>
            {mutatePart.values && mutatePart.state &&
                <Fragment>
                    <Text
                        type='text'
                        name='PartNumber'
                        label='Part Number'
                        value={mutatePart.values.PartNumber}
                        state={mutatePart.state.PartNumber}
                        onChange={async (name, value) => mutatePart.updateData('PartNumber', value)}
                    />
                    <Text
                        type='text'
                        name='PartName'
                        label='Part Name'
                        value={mutatePart.values.PartName}
                        state={mutatePart.state.PartName}
                        onChange={async (name, value) => mutatePart.updateData('PartName', value)}
                    />
                    <Text
                        type='number'
                        name='UnitCost'
                        label='Unit Cost'
                        value={mutatePart.values.UnitCost}
                        state={mutatePart.state.UnitCost}
                        onChange={async (name, value) => mutatePart.updateData('UnitCost', value)}
                    />
                    <Text
                        type='number'
                        name='Quantity'
                        label='Quantity'
                        value={mutatePart.values.Quantity}
                        state={mutatePart.state.Quantity}
                        onChange={async (name, value) => mutatePart.updateData('Quantity', value)}
                    />
                    <AddButton 
                        onClick={mutatePart.finalizeCreate}
                    />
                </Fragment>
            }
        </div>
    )
}