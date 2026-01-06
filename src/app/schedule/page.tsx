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
        <div className="relative grow h-full grid lg:grid-cols-[60%_40%] md:grid-cols-[33%_auto] max-md:grid-cols-1">
            <div className="relative w-full h-full top-0 left-0 max-md:hidden">
                <div className="absolute top-8 left-8 z-10">
                    <Logo
                        white={true}
                    />
                </div>
                <img 
                    src="/pexels-pixabay-210115.jpg" 
                    className="fixed object-cover object-center lg:w-[60%] md:w-[33%] h-screen block dark:!hidden"
                />
                <img 
                    src="/public/shubham-dhage-KWj4NPwSQkc-unsplash.jpg" 
                    className="fixed object-cover object-center lg:w-[60%] md:w-[33%] h-screen hidden dark:!block"
                />
            </div>
            <div className="flex flex-col py-8 px-12 grow max-md:p-8">
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
                    <div className="flex flex-col max-md:items-center gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="md:hidden">
                                <Logo/>
                            </div>
                            <header className="text-center">
                                <h3 className="mb-1 text-base-900 text-2xl tracking-tight font-medium">
                                    Schedule Appointment
                                </h3>
                                <p className="text-base-500 text-sm tracking-wide">
                                    To schedule an appointment, complete the form below.
                                </p>
                            </header>
                        </div>
                        <div className="flex flex-col self-center w-full">
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
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}