"use client";
import useForm from "@/features/Form/useForm/useForm";
import ScheduleAppointment from "@/services/db/Appointment/ScheduleAppointment";
import { useEffect, useState } from "react";
import { startContactForm, startServiceForm, startVehicleForm } from "./_DEF";
import ShowResultsPassed from "./ShowResultsPassed";
import ShowResultsFailed from "./ShowResultsFailed";
import Logo from "@/component/NavBar/Logo";
import Progress from "./Progress";
import PrimaryButton from "@/component/Button/PrimaryButton";
import SecondaryButton from "@/component/Button/SecondaryButton";
import ServiceForm from "./ServiceForm";
import VehicleForm from "./VehicleForm";
import ContactForm from "./ContactForm";
import { getPreferredColorScheme } from "@/shared/colorScheme";
import clsx from "clsx";
import Confetti from 'react-confetti'

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

    const [colorScheme, setColorScheme] = useState("");

    
	useEffect(() => {
		const load = async () => {
			const colorScheme = getPreferredColorScheme(window);
            setColorScheme(colorScheme);
		}
		load();
	}, []);

    
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
        <div 
            className={clsx(
                "relative grow h-full grid lg:grid-cols-[60%_40%] md:grid-cols-[33%_auto] max-md:grid-cols-1 max-sm:overflow-x-auto",
                colorScheme,
                "bg-base-0"
            )}
        >
            <div className="relative w-full h-full top-0 left-0 max-md:hidden relative z-10">
                <div className="fixed top-8 left-8 z-10">
                    <Logo
                        white={true}
                    />
                </div>
                <img 
                    src="/pexels-pixabay-210115.jpg" 
                    className="fixed object-cover object-center lg:w-[60%] md:w-[33%] h-screen block dark:!hidden z-[500]"
                />
                <img 
                    src="/shubham-dhage-KWj4NPwSQkc-unsplash.jpg" 
                    className="fixed object-cover object-center lg:w-[60%] md:w-[33%] h-screen hidden dark:!block"
                />
            </div>
            <div className="flex flex-col justify-center py-8 px-20 grow max-md:px-8 max-md:py-4 max-sm:p-4">
                <div className="h-min flex justify-center max-md:border-b max-md:border-base-300 max-md:dark:border-base-200 max-md:pb-4 max-sm:pb-4">
                    <div className="md:hidden mb-1 mr-1">
                        <Logo
                            svgClassName="!size-3 dark:!stroke-white dark:!fill-white"
                            textClassName="!text-lg"
                        />
                    </div>
                </div>
                {(output !== null && output[0]) &&
                    <>
                        <ShowResultsPassed
                            output={output}
                        />
                        <Confetti
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </>
                }
                {(output !== null && !output[0]) &&
                    <ShowResultsFailed
                        restart={() => setOutput(null)}
                    />
                }
                {output === null &&
                    <div className="mt-6 flex flex-col max-md:grow items-center gap-6">
                        <div className="flex flex-col items-center gap-4 w-[min(100%,400px)]">
                            <header className="text-center">
                                <h3 className="mb-1 text-base-900 text-2xl tracking-tight font-medium">
                                    Schedule Appointment
                                </h3>
                                <p className="text-base-500 dark:text-base-400 text-sm tracking-wide">
                                    To schedule an appointment, complete the form below.
                                </p>
                            </header>
                        </div>
                        <div className="flex flex-col self-center w-[min(100%,400px)]">
                            <div className="flex flex-col gap-6">
                                <Progress
                                    step={step}
                                    header={stepData[step].header}
                                />
                                <form 
                                    onSubmit={(e) => e.preventDefault()}
                                    className="flex flex-col gap-6"
                                >
                                    {step === 0 && <ContactForm form={contactForm}/>}
                                    {step === 1 && <VehicleForm form={vehicleForm}/>}
                                    {step === 2 && <ServiceForm form={serviceForm}/>}
                                    <div className="flex gap-4">
                                        {step !== 0 &&
                                            <SecondaryButton
                                                className="w-full text-sm tracking-wide"
                                                onClick={goToPrevForm} 
                                            >
                                                Previous
                                            </SecondaryButton>
                                        }
                                        <PrimaryButton
                                            className="w-full text-sm tracking-wide"
                                            onClick={step === 2 ? submitForm : goToNextForm}
                                        >
                                            {step === 2 ? "Schedule" : `Continue to ${step == 0 ? "Vehicle" : "Service"}`}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}