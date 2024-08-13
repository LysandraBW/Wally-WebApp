import CreateService from "./CreateService";
import UpdateService from "./UpdateService";
import { DB_Appointment } from "@/database/Types";
import { Button, CheckboxLayered } from "@/components/Input/Export";
import { DefaultInputState } from "@/components/Input/MutateInput";
import useServiceManager from "@/process/Employee/Update/Service/Process";

interface ServiceManagerProps {
    appointment: DB_Appointment;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const serviceManager = useServiceManager(props.appointment);

    return (
        <div>
            {serviceManager.updated &&
                <div>
                    <h5>Current Services</h5>
                    {Object.entries(serviceManager.updated.Services).map(([serviceID, service], i) => (
                        <div key={i}>
                            <UpdateService
                                service={service}
                                onDelete={() => serviceManager.deleteService(serviceID)}
                                onUpdate={(service) => serviceManager.updateService(serviceID, service)}
                            />
                        </div>
                    ))}
                </div>
            }
            <div>
                {serviceManager.loaded && serviceManager.updated &&
                    <div>
                        <CheckboxLayered
                            name='Services'
                            label='Services'
                            state={DefaultInputState}
                            value={Object.values(serviceManager.updated.Services).map(s => s.ServiceID)}
                            values={serviceManager.loaded.Layered}
                            onChange={(name, value) => serviceManager.updateDefinedService(value)}
                        />
                    </div>
                }
            </div>
            <div>
                <h5>Type in a Service Here</h5>
                <CreateService
                    onChange={value => serviceManager.createService(value)}
                />
            </div>
            <Button
                label='Reset Changes'
                onClick={serviceManager.resetData}
            />
            <Button
                label='Save Changes'
                onClick={serviceManager.submitData}
            />
        </div>
    )
}