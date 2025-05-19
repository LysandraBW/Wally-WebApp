"use client";
import ButtonTwo from "@/component/Form/Button/ButtonTwo";
import NavBar from "@/component/NavBar/NavBar";
import useForm from "@/features/Form/useForm/useForm";
import { startContactForm, startVehicleForm, startServiceForm } from "@/pages/customer/schedule/_DEF";
import ContactForm from "@/pages/customer/schedule/ContactForm";
import ServiceForm from "@/pages/customer/schedule/ServiceForm";
import VehicleForm from "@/pages/customer/schedule/VehicleForm";
import ScheduleAppointment from "@/services/DB/Procedure/Appointment/ScheduleAppointment";
import clsx from "clsx";
import { useState } from "react";
import ProgressBar from "../../pages/customer/schedule/ProgressBar";
import GoodResults from "@/pages/customer/schedule/GoodResults";
import BadResults from "@/pages/customer/schedule/BadResults";

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
    //      != NULL || ["", ""]: Passed => [ID, Email]
    const [output, setOutput] = useState<null|[string, string]>(null);
    
    const [step, setStep] = useState(0);
    const contactForm = useForm("Contact", startContactForm());
    const vehicleForm = useForm("Vehicle", startVehicleForm());
    const serviceForm = useForm("Service", startServiceForm());

    const goToPreviousForm = () => {
        setStep(Math.max(0, step - 1));
    }

    const goToNextForm = () => {
        const steps = [contactForm, vehicleForm, serviceForm];
        if (!steps[step].getState())
            return;
        setStep(Math.min(2, step + 1));
    }

    const submitForm = async () => {
        // Check if Data is Valid
        if (!contactForm.getState() || !vehicleForm.getState() || !serviceForm.getState())
            return;

        // We're storing the contact data because we'll
        // possibly need the email address later on.
        const contactData = contactForm.getData();
        const ID = await ScheduleAppointment(Object.assign(
            {}, 
            contactData, 
            vehicleForm.getData(), 
            serviceForm.getData()
        ));
        
        // If an empty string has been returned as the appointment ID,
        // something has gone wrong. Else, proceed as normal.
        if (!ID)
            setOutput(["", ""]);
        else
            setOutput([ID, contactData.email]);

        // Reset Process
        window.scrollTo(0, 0);
        setStep(0);
        setOutput([ID, contactData.email]);
        contactForm.resetForm(startContactForm());
        vehicleForm.resetForm(startVehicleForm());
        serviceForm.resetForm(startServiceForm());
    }
    
    return (
        <div className="relative bg-white flex flex-col min-h-screen">
            <NavBar sticky={true} border={true}/>
            <div className="flex flex-col grow ">
                {/* 
                If the output is not NULL, we show the user the
                results (fail or pass).
                */}
                {(output !== null && output[0] !== "") &&
                    <GoodResults
                        output={output}
                    />
                }
                {(output !== null && output[0] === "") &&
                    <BadResults
                        restart={() => setOutput(null)}
                    />
                }
                {/* 
                    If the output is NULL, we have yet to receive the user's
                    submission. Therefore, we show them the form to complete.
                */}
                {output === null &&
                    <div className="relative w-full py-16 px-16 flex flex-col items-center gap-8">
                        {/* 
                            Header
                        */}
                        <header className="flex flex-col items-center w-min">
                            <h3 className="text-center font-medium whitespace-nowrap">Schedule Appointment</h3>
                            <p className="text-center text-md tracking-wide max-w-[440px] text-gray-400">To schedule an appointment, fill out the short form below.<br/>After completion, your appointment will be shortly confirmed.</p>
                        </header>    
                        {/* 
                            Tracker:
                            This just shows the current step
                            that the user is on.
                        */}
                        <div className="bg-gray-100 rounded-lg px-4 py-4 pb-5 flex flex-col gap-2 w-1/3">
                            <div>
                                <span 
                                className="text-01 font-medium" 
                                style={{lineHeight: "0.72rem"}}
                                >
                                    STEP {step + 1}
                                </span>
                                <h6 
                                    className={clsx("mb-2 tracking-wide !text-05 font-medium")}
                                    style={{lineHeight: "1.125rem"}}
                                >
                                    {stepData[step].header}
                                </h6>
                            </div>
                            <div className="flex h-2.5 justify-between gap-2">
                                <ProgressBar
                                    id="bar0"
                                    rank={0}
                                    step={step}
                                    tooltipLabel="Back to Contact Information"
                                    canShowTooltip={step > 0}
                                />
                                <ProgressBar
                                    id="bar1"
                                    rank={1}
                                    step={step}
                                    tooltipLabel="Back to Vehicle Information"
                                    canShowTooltip={step > 1}
                                />
                                <ProgressBar
                                    id="bar2"
                                    rank={2}
                                    step={step}
                                    tooltipLabel="Back to Service Information"
                                    canShowTooltip={step > 2}
                                />
                            </div>
                        </div>          
                        {/* 
                            Form 
                        */}
                        <form 
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full flex flex-col gap-4 w-1/3"
                            style={{width: "33%"}}
                        >
                            {step === 0 && <ContactForm form={contactForm}/>}
                            {step === 1 && <VehicleForm form={vehicleForm}/>}
                            {step === 2 && <ServiceForm form={serviceForm}/>}
                            <div className="flex gap-4">
                                {step !== 0 &&
                                    <button 
                                        onClick={goToPreviousForm} 
                                        className="w-full shadow-sm text-04 font-medium rounded-lg px-4 py-2 border border-gray-200 tracking-wide text-md text-gray-500"
                                    >
                                        Previous
                                    </button>
                                }
                                <ButtonTwo
                                    label={step === 2 ? "Schedule" : `Continue to ${step == 0 ? "Vehicle" : "Service"}`}
                                    onClick={step == 2 ? submitForm : goToNextForm}
                                />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}