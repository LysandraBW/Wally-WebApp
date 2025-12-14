import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { Appointment as DB_Appointment } from "waltronics-types";
import { JSX, useReducer, useState } from "react";
import useForm from "@/features/Form/useForm/useForm";
import { MasterForm } from "@/pages/employee/edit/_DEF";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import { ThingManagerProps } from "./ThingManager";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import useThingsManager from "./useThingsManager";
import { DefineService, MappedServices, Service, ServiceUpdates } from "./service/_DEF";
import { Service as DB_Service } from "waltronics-types";
import { UpdateAppointmentServices } from "@/services/DB/Appointment/UpdateAppointmentServices";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import useServicesManager from "./service/useServicesManager";
import ServiceForm from "./service/ServiceManager";
import ServicesManager from "./service/ServicesManager";

interface UpdateManagerProps {
    appointmentID: string;
    appointment: DB_Appointment;
    close: () => void;
}

interface Form<BaseThing, Thing, MappedThings> {
    thingsManagerKey: string;
    thingID: string;
    formTabName: string;
    Form: (props: ThingManagerProps<BaseThing, Thing, MappedThings>) => JSX.Element;
    FormSubProps: {header: string, canDelete: boolean};
}

const definedService = new DefineService();

export default function UpdateManager<BaseThing, Thing, MappedThings>(props: UpdateManagerProps) {
    // This is the appointment we're updating. This is used in
    // the displays of each item, not the managers.
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);

    // This is used to alert the user whether a change succeeded or not.
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    
    // The tab determines the part of the appointment
    // the user views (i.e., "Repair", "Service", etc.)
    const [tab, setTab] = useState<string>();
    
    // These are forms wherein each form corresponds to an Item.
    const [forms, setForms] = useState<Array<Form<BaseThing, Thing, MappedThings>>>([]);
    const [currentForm, setCurrentForm] = useState<Form<BaseThing, Thing, MappedThings>|null>();

    const openForm = (thingsManagerKey: string, thingID: string, formTabName: string, Form: (props: ThingManagerProps<BaseThing, Thing, MappedThings>) => JSX.Element, FormSubProps: {header: string, canDelete: boolean}) => {
        const form = {thingsManagerKey, thingID, formTabName, Form, FormSubProps};
        setForms([...forms, form]);
        setCurrentForm(form);
    }

    const closeForm = (thingsManagerKey: string, thingID: string) => {
        const formIndex = forms.findIndex(form => form.thingsManagerKey == thingsManagerKey && form.thingID == thingID);
        if (formIndex === -1)
            return;
        
        const updatedForms = [...forms];
        updatedForms.splice(formIndex, 1);
        setForms(updatedForms);
        
        if (updatedForms.length === 0)
            setCurrentForm(null);
        if (updatedForms.length === 1)
            setCurrentForm(updatedForms[0]);
        if (updatedForms.length > 1)
            setCurrentForm(updatedForms[formIndex-1]);        
    }

    const saveServices = async (oldThings: MappedServices, newThings: MappedServices) => {
        const itemID = "AppointmentServiceID";
        const deleteKey = "AppointmentServiceID";
        const mutateKeys = ["Service", "Division", "Class"];
        const updates = buildUpdate(oldThings, newThings, itemID, mutateKeys, mutateKeys, deleteKey);
        const output = await UpdateAppointmentServices(props.appointmentID, updates);
        alertOutput(output);
    }
    
    // Passting the work off to other sub-managers.
    const updateManagerForm = useForm("Update", MasterForm);

    const servicesManager = useServicesManager({
        updateManagerForm: updateManagerForm,
        thingsManagerKey: "Services",
        baseThings: props.appointment.Services,
        thingDefinition: definedService,
        autoSave: false,
        saveUpdates: saveServices,
        Form: ServiceForm,
        openForm: openForm,
        closeForm: closeForm,
    })

    const loadAppointment = async () => {
        const appointmentID = props.appointmentID;
        const appointment = await SelectAppointment({appointmentID});
        setAppointment(appointment);
    }

    const alertOutput = (successful: boolean) => {
        if (successful) {
            alertDispatch(saveTDispatch(randomKey(), alertDispatch));
            // We reload the appointment, perhaps we could instead have
            // the DB send us back this information, but alas.
            loadAppointment();
        }
        else {
            alertDispatch(saveFDispatch(randomKey(), alertDispatch));
        }
    }

    
    return (
        <div>
            {forms &&
                forms.map((form, i) => (
                    <div
                        key={i}
                        onClick={() => {setCurrentForm(form)}}
                    >
                        {form.formTabName}
                    </div>
                ))
            }
            {forms && currentForm &&
                <currentForm.Form
                    {...currentForm.FormSubProps}
                    thingID={currentForm.thingID}
                    thingsManager={servicesManager as any}
                />
            }
            <ServicesManager
                servicesManager={servicesManager}
            />
        </div>
    )
}