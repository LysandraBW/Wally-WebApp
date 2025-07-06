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
import { Fragment, useContext, useEffect, useState } from "react";
import TextFieldGrid from "../../TextFieldGrid";
import { AnimatePresence, motion } from "motion/react";
import { UpdateManagerContext } from "../../Update";

interface ServiceManagerProps {
    parentForm: UseForm;
    serviceList: Array<DB_AppointmentService>;
    onSaveUpdates: (updates: ServiceUpdates) => void;
    // Forms
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const defineService = new DefineService();
    const updateManagerContext = useContext(UpdateManagerContext);
    
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
    });

    // Display
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (props.openForms.findIndex(f => f === "Add Service") === -1) {
            serviceManager.cancelCreate();
        }

        if (props.openForms.findIndex(f => f === "Edit Service") === -1) {
            serviceManager.cancelUpdate();
        }
    }, [props.openForms]);

    useEffect(() => {
        if (serviceManager.createID)
            props.openForm("Add Service");
        else{
            setExpanded(false);
            props.closeForm("Add Service");}
        if (serviceManager.updateID)
            props.openForm("Edit Service");
        else{
            setExpanded(false);
            props.closeForm("Edit Service");}
    }, [serviceManager.createID, serviceManager.updateID]);

    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
                    <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td className="w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300 align-top pt-2">Services</td>
                                    <td className="p-0 border border-gray-300">
                                        <div className="w-full">
                                            <div className="">
                                                {/* Easy-Add */}
                                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Simple Add</span>
                                                    <AddHelper
                                                        serviceManager={serviceManager}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                                <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                                <CreateItemButton
                                                    onCreate={serviceManager.onClickCreateItem}
                                                />
                                            </div>
                                        </div>
                                        <div className="px-4 py-4">
                                            <ServiceDisplay
                                                items={serviceManager.newItems}
                                                onUpdate={serviceManager.onClickUpdateItem}
                                                onDelete={(ID: string) => {
                                                    serviceManager.deleteItem(ID);
                                                    updateManagerContext.setChangesMade("Services", true);
                                                }}
                                            />
                                            {Object.keys(serviceManager.newItems).length <= 0 &&
                                                <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                    </svg>
                                                    <span className="text-gray-400 tracking-wide font-medium text-04">
                                                        No Service Found
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <SaveResetButtons
                        onSave={() => {
                            serviceManager.saveUpdates();
                            updateManagerContext.setChangesMade("Services", false);
                        }}
                        onReset={() => {
                            serviceManager.resetUpdates();
                            updateManagerContext.setChangesMade("Services", false);
                        }}
                    />
                </div>
            }
            <AnimatePresence>
                {((props.tabOpen && serviceManager.createID && props.openFormDisplayed === "Add Service") || (serviceManager.createID && props.openFormDisplayed === "Add Service")) &&
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        key={"ServiceUnexpandedAdd"}
                        className="overflow-x-hidden w-[400px] row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative  !bg-white mb-0"
                    >
                    <ServiceForm
                            mode="Create"
                            defineItem={defineService}
                            mutateItem={serviceManager.toCreateItem}
                            parentForm={serviceManager.form}
                            onCancel={serviceManager.cancelCreate}
                            onMutate={serviceManager.createItem}
                            onDelete={() => serviceManager.deleteItem(serviceManager.createID)}
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {((props.tabOpen && serviceManager.updateID && props.openFormDisplayed === "Edit Service") || (serviceManager.updateID && props.openFormDisplayed === "Edit Service")) &&
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        key={"ServiceUnexpandedEdit"}
                        className="overflow-x-hidden w-[400px] row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative  !bg-white mb-0"
                    >
                        <ServiceForm
                            mode="Update"
                            defineItem={defineService}
                            mutateItem={serviceManager.toUpdateItem}
                            parentForm={serviceManager.form}
                            onCancel={serviceManager.cancelUpdate}
                            onMutate={serviceManager.updateItem}
                            onDelete={() => serviceManager.deleteItem(serviceManager.updateID)}
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {(((props.tabOpen && serviceManager.updateID && props.openFormDisplayed === "Edit Service") || (serviceManager.updateID && props.openFormDisplayed === "Edit Service")) && expanded) &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <ServiceForm
                            mode="Update"
                            defineItem={defineService}
                            mutateItem={serviceManager.toUpdateItem}
                            parentForm={serviceManager.form}
                            onCancel={serviceManager.cancelUpdate}
                            onMutate={serviceManager.updateItem}
                            onDelete={() => serviceManager.deleteItem(serviceManager.updateID)}
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </Cover>
                }
                {(((props.tabOpen && serviceManager.createID && props.openFormDisplayed === "Add Service") || (serviceManager.createID && props.openFormDisplayed === "Add Service")) && expanded) &&
                    <Cover style="overflow-auto p-10 scroll-hide grow">
                        <div className="flex flex-col max-w-[440px] grow">
                            <ServiceForm
                                mode="Create"
                                defineItem={defineService}
                                mutateItem={serviceManager.toCreateItem}
                                parentForm={serviceManager.form}
                                onCancel={serviceManager.cancelCreate}
                                onMutate={serviceManager.createItem}
                                onDelete={() => serviceManager.deleteItem(serviceManager.createID)}
                                onExpand={() => {setExpanded(true)}}
                                onMinimize={() => {setExpanded(false)}}
                                expanded={expanded}
                            />
                        </div>
                    </Cover>
                }
            </AnimatePresence>
        </Fragment>
    )
}
