import CreateService from "./CreateService";
import UpdateService from "./UpdateService";
import { DB_Appointment } from "@/database/Types";
import { Button, CheckboxLayered } from "@/components/Input/Export";
import { DefaultInputState } from "@/components/Input/MutateInput";
import useServicesForm from "@/process/Employee/Update/Service0/Service/Process";

interface ServiceManagerProps {
    appointment: DB_Appointment;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const servicesForm = useServicesForm(props.appointment);

    return (
        <div>
            {servicesForm.updated &&
                <div>
                    <h5>Current Services</h5>
                    {Object.entries(servicesForm.updated.Services).map(([serviceID, service], i) => (
                        <div key={i}>
                            <UpdateService
                                service={service}
                                onDelete={() => servicesForm.deleteService(serviceID)}
                                onUpdate={(service) => servicesForm.updateService(serviceID, service)}
                            />
                        </div>
                    ))}
                </div>
            }
            <div>
                {servicesForm.loaded && servicesForm.updated &&
                    <div>
                        <CheckboxLayered
                            name='Services'
                            label='Services'
                            state={DefaultInputState}
                            value={Object.values(servicesForm.updated.Services).map(s => s.ServiceID)}
                            values={servicesForm.loaded.Layered}
                            onChange={(name, value) => servicesForm.updateDefinedService(value)}
                        />
                    </div>
                }
            </div>
            <div>
                <h5>Type in a Service Here</h5>
                <CreateService
                    onChange={(name, value) => servicesForm.addService(value)}
                />
            </div>
            <Button
                label='Reset Changes'
                onClick={servicesForm.resetData}
            />
            <Button
                label='Save Changes'
                onClick={servicesForm.submitData}
            />
        </div>
    )
}