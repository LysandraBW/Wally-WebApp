import ServiceDisplay from "./ServiceDisplay";
import { Service as DB_AppointmentService } from "waltronics-types";
import { Services, ServiceUpdates, DefineService } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import ServiceForm from "./ServiceForm";
import useServiceManager from "./useServiceManager";
import { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import AddHelper from "./AddHelper";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";

interface ServiceManagerProps {
    parentForm: UseForm;
    serviceList: Array<DB_AppointmentService>;
    onSaveUpdates: (updates: ServiceUpdates) => void;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const defineService = new DefineService();
    
    const processUpdates = (oldItems: Services, newItems: Services) => {
        const itemID = "AppointmentServiceID";
        const deleteKey = "AppointmentServiceID";
        const mutateKeys = ["Service", "Division", "Class"];
        const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, deleteKey);
        props.onSaveUpdates(updates);
    }
    
    const serviceManager = useServiceManager({
        itemList: props.serviceList,
        defineItem: defineService,
        parentForm: props.parentForm,
        saveAllUpdates: processUpdates
    })

    return (
        <div>
            {/* Create Item Button */}
            <div className="gap-2 border-b p-2">
                <CreateItemButton
                    onCreate={serviceManager.onClickCreateItem}
                />
            </div>
            {/* Easy-Add */}
            <div className="flex flex-col gap-2 border-b p-4">
                <div className="gap-0">
                    <h6 className="font-medium text-04">Quick Add</h6>
                    <span className="block text-02">
                        Low on time? Use this to easily add services.
                    </span>
                </div>
                <AddHelper
                    serviceManager={serviceManager}
                />
            </div>
            {/* Display Services */}
            <div className="p-2">
                <ServiceDisplay
                    items={serviceManager.newItems}
                    onUpdate={serviceManager.onClickUpdateItem}
                    onDelete={serviceManager.deleteItem}
                />
            </div>
            {/* Create Services */}
            {serviceManager.createID &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <ServiceForm
                        mode="Create"
                        defineItem={defineService}
                        mutateItem={serviceManager.toCreateItem}
                        parentForm={serviceManager.form}
                        onCancel={serviceManager.cancelCreate}
                        onMutate={serviceManager.createItem}
                        onDelete={() => serviceManager.deleteItem(serviceManager.createID)}
                    />
                </Cover>
            }
            {/* Update Services */}
            {serviceManager.updateID &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <ServiceForm
                        mode="Update"
                        defineItem={defineService}
                        mutateItem={serviceManager.toUpdateItem}
                        parentForm={serviceManager.form}
                        onCancel={serviceManager.cancelUpdate}
                        onMutate={serviceManager.updateItem}
                        onDelete={() => serviceManager.deleteItem(serviceManager.updateID)}
                    />
                </Cover>
            }
            <SaveResetButtons
                onSave={serviceManager.saveUpdates}
                onReset={serviceManager.resetUpdates}
            />
        </div>
    )
}
