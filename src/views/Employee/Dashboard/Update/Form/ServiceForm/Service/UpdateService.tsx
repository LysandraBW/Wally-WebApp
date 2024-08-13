import { Fragment } from "react";
import ServiceCard from "./ServiceCard";
import { DB_AppointmentService } from "@/database/Types";
import { Multiple, Text } from "@/components/Input/Export";
import useMutateServiceForm from "@/process/Employee/Update/Service/Mutate/Process";

export interface UpdateServiceProps {
    service: DB_AppointmentService
    onDelete: () => void;
    onUpdate: (service: DB_AppointmentService) => void;
}

export default function UpdateService(props: UpdateServiceProps) {
    const updateServiceForm = useMutateServiceForm({...props, mutateType: 'Update', initialValues: {...props.service}});

    return (
        <Fragment>
            {updateServiceForm.edit && updateServiceForm.values && updateServiceForm.state &&
                <Multiple
                    onBlur={() => updateServiceForm.submitUpdatedData()}
                    children={(
                        <div>
                            <Text
                                type='text'
                                name='Service'
                                label='Service'
                                value={updateServiceForm.values.Service}
                                state={updateServiceForm.state.Service}
                                onChange={async (name, value) => updateServiceForm.updateData('Service', value)}
                                onBlur={async () => updateServiceForm.resetData('Service')}
                            />
                            <Text
                                type='text'
                                name='Division'
                                label='Division'
                                value={updateServiceForm.values.Division}
                                state={updateServiceForm.state.Division}
                                onChange={async (name, value) => updateServiceForm.updateData('Division', value)}
                                onBlur={async () => updateServiceForm.resetData('Division')}
                            />
                            <Text
                                type='text'
                                name='Class'
                                label='Class'
                                value={updateServiceForm.values.Class}
                                state={updateServiceForm.state.Class}
                                onChange={async (name, value) => updateServiceForm.updateData('Class', value)}
                                onBlur={async () => updateServiceForm.resetData('Class')}
                            />
                        </div>
                    )}
                />
            }
            {!updateServiceForm.edit && 
                <ServiceCard
                    class={props.service.Class}
                    service={props.service.Service}
                    division={props.service.Division}
                    onEdit={() => updateServiceForm.setEdit(true)}
                    onDelete={() => props.onDelete()}
                />
            }
        </Fragment>
    )
}