import { Multiple, Text } from "@/components/Input/Export";
import { Fragment } from "react";
import PartCard from "./PartCard";
import useMutatePart from "@/process/Employee/Update/Part/Mutate/Process";
import { UpdatePart as UpdatePartData } from "@/submission/Employee/Update/Part/Form";

export interface UpdatePartProps {
    part: UpdatePartData;
    onDelete: () => void;
    onUpdate: (part: UpdatePartData) => void;   
}

export default function UpdatePart(props: UpdatePartProps) {
    const mutatePart = useMutatePart({mutateType: 'Update', initialValues: {...props.part}, ...props});

    return (
        <>
            {mutatePart.edit && 
                <Multiple
                    onBlur={() => {
                        mutatePart.setEdit(false);
                        mutatePart.finalizeUpdate();
                    }}
                    children={(
                        <div>
                            {!!mutatePart.values && !!mutatePart.state &&
                                <Fragment>
                                    <Text
                                        type='text'
                                        name='PartNumber'
                                        label='Part Number'
                                        value={mutatePart.values.PartNumber}
                                        state={mutatePart.state.PartNumber}
                                        onChange={async (name, value) => mutatePart.updateData('PartNumber', value)}
                                        onBlur={() => mutatePart.resetData('PartNumber')}
                                    />
                                    <Text
                                        type='text'
                                        name='PartName'
                                        label='Part Name'
                                        value={mutatePart.values.PartName}
                                        state={mutatePart.state.PartName}
                                        onChange={async (name, value) => mutatePart.updateData('PartName', value)}
                                        onBlur={() => mutatePart.resetData('PartName')}
                                    />
                                    <Text
                                        type='number'
                                        name='UnitCost'
                                        label='Unit Cost'
                                        value={mutatePart.values.UnitCost}
                                        state={mutatePart.state.UnitCost}
                                        onChange={async (name, value) => mutatePart.updateData('UnitCost', value)}
                                        onBlur={() => mutatePart.resetData('UnitCost')}
                                    />
                                    <Text
                                        type='number'
                                        name='Quantity'
                                        label='Quantity'
                                        value={mutatePart.values.Quantity}
                                        state={mutatePart.state.Quantity}
                                        onChange={async (name, value) => mutatePart.updateData('Quantity', value)}
                                        onBlur={() => mutatePart.resetData('Quantity')}
                                    />
                                </Fragment>
                            }
                        </div>
                    )}
                />
            }
            {!mutatePart.edit && 
                <PartCard
                    partName={props.part.PartName}
                    unitCost={props.part.UnitCost}
                    quantity={props.part.Quantity}
                    partNumber={props.part.PartNumber}
                    onEdit={() => mutatePart.setEdit(true)}
                    onDelete={props.onDelete}
                />
            }
        </>
    )
}