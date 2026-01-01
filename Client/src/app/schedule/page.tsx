"use client";
import useForm from "@/features/Form/useForm/useForm";
import ScheduleAppointment from "@/services/DB/Appointment/ScheduleAppointment";
import { useState } from "react";
import { startContactForm, startServiceForm, startVehicleForm } from "./_DEF";
import ShowResultsPassed from "./ShowResultsPassed";
import ShowResultsFailed from "./ShowResultsFailed";
import GoBackHeader from "../../component/GoBackHeader";
import Form from "./Form";
import clsx from "clsx";
import Logo from "@/component/NavBar/Logo";
import { navigate } from "@/utils/navigate";

// The step at which a user is in the form
// is correlated with some variables.
// It's a lot easier to have those relationships
// here, rather than use a bunch of if-else 
// statements.
const stepData: any = {
    0: {
        "doneLength": "0",
        "notDoneLength": "100",
        "header": "Contact Information"
    },
    1: {
        "doneLength": "33",
        "notDoneLength": "66",
        "header": "Vehicle Information"
    },
    2: {
        "doneLength": "66",
        "notDoneLength": "33",
        "header": "Service Information"
    },
    3: {
        "doneLength": "100",
        "notDoneLength": "0",
        "header": ""
    }
}


export default function Page() {
    // Output of Scheduling Function
    //      == NULL:             No Output
    //      == ["", ""]:         Failed
    //      == [ID, Email]:     Passed
    const [output, setOutput] = useState<null|[string, string]>(null);
    
    // step: This determines the form that the user sees.
    const [step, setStep] = useState(0);
    const contactForm = useForm("Contact", startContactForm());
    const vehicleForm = useForm("Vehicle", startVehicleForm());
    const serviceForm = useForm("Service", startServiceForm());


    const goToPrevForm = () => {
        const prevStep = Math.max(0, step - 1);
        setStep(prevStep);
    }


    const goToNextForm = () => {
        const steps = [contactForm, vehicleForm, serviceForm];
        if (!steps[step].getState())
            return;
        const nextStep = Math.min(2, step + 1);
        setStep(nextStep);
    }


    const submitForm = async () => {
        // Check if Data is Valid
        if (!contactForm.getState() || !vehicleForm.getState() || !serviceForm.getState())
            return;

        // We're storing the contact data because we'll
        // need the email address later on.
        const contactData = contactForm.getData();
        const ID = await ScheduleAppointment(Object.assign(
            {}, 
            contactData, 
            vehicleForm.getData(), 
            serviceForm.getData()
        ));
        
        // If an empty string has been returned as the appointment ID,
        // something has gone wrong. Else, proceed as normal.
        setOutput(!ID ? ["", ""] : [ID, contactData.email]);

        // Reset Process
        window.scrollTo(0, 0);
        setStep(0);
        setOutput([ID, contactData.email]);
        contactForm.resetForm(startContactForm());
        vehicleForm.resetForm(startVehicleForm());
        serviceForm.resetForm(startServiceForm());
    }
    

    return (
        <div className="relative grow grid grid-cols-[60%_40%] max-lg:grid-cols-1">
            <div className="relative w-[100%] h-[100vh] max-lg:hidden">
                <div className="absolute top-8 left-8">
                    <Logo
                        white={true}
                    />
                </div>
                <div className="static w-full h-full top-0 left-0">
                    <img 
                        src="../pexels-stas-tsibro-268729-811029.jpg" 
                        className="object-cover object-center w-full h-full block dark:!hidden"
                    />
                    <img 
                        src="../jakob-owens-Il--NpJ4zyc-unsplash.jpg" 
                        className="object-cover object-center w-full h-full hidden dark:!block"
                    />
                </div>
            </div>
            <div className="py-8 px-12 grow max-lg:px-4">
                <div className="mb-8">
                    <GoBackHeader onGoBack={() => navigate("/")}/>
                </div>
                {(output !== null && output[0]) &&
                    <ShowResultsPassed
                        output={output}
                    />
                }
                {(output !== null && !output[0]) &&
                    <ShowResultsFailed
                        restart={() => setOutput(null)}
                    />
                }
                {output === null &&
                    <Form
                        step={step}
                        stepData={stepData}
                        contactForm={contactForm}
                        serviceForm={serviceForm}
                        vehicleForm={vehicleForm}
                        goToNextForm={goToNextForm}
                        goToPrevForm={goToPrevForm}
                        submitForm={submitForm}
                    />
                }
            </div>
        </div>
    )
}