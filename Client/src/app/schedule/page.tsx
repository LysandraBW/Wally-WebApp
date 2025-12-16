"use client";
import ButtonTwo from "@/component/Form/Button/Button2";
import NavBar from "@/component/NavBar/NavBar";
import useForm from "@/features/Form/useForm/useForm";
import ScheduleAppointment from "@/services/DB/Appointment/ScheduleAppointment";
import { useState } from "react";
import ButtonThree from "@/component/Form/Button/Button3";
import { startContactForm, startServiceForm, startVehicleForm } from "./_DEF";
import SchedulePassed from "./SchedulePassed";
import ScheduleFailed from "./ScheduleFailed";
import ProgressBar from "./ProgressBar";
import ContactForm from "./ContactForm";
import VehicleForm from "./VehicleForm";
import ServiceForm from "./ServiceForm";

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
        <div className="relative bg-white flex flex-col min-h-screen">
            <NavBar sticky={true} border={true} background={true} shadow={true}/>
            <div className="flex grow">
                <div className="flex flex-col grow p-4">
                    {(output !== null && output[0]) &&
                        <SchedulePassed
                            output={output}
                        />
                    }
                    {(output !== null && !output[0]) &&
                        <ScheduleFailed
                            restart={() => setOutput(null)}
                        />
                    }
                    {output === null &&
                        <div className="relative w-full py-16 px-16 flex flex-col items-center gap-8">
                            <header className="flex flex-col items-center w-min">
                                <h3 className="text-center font-medium whitespace-nowrap">
                                    Schedule Appointment
                                </h3>
                                <p className="max-w-[440px] text-md text-gray-600 text-center tracking-wide">
                                    To schedule an appointment, complete the form below.<br/>
                                    After completion, your appointment will be shortly confirmed.
                                </p>
                            </header>
                            <div className="w-[400px] px-4 py-4 pb-5 flex flex-col gap-2 bg-blue-600 rounded-lg shadow-sm">
                                <div>
                                    <span 
                                        style={{lineHeight: "0.72rem"}}
                                        className="text-01 font-medium text-blue-200" 
                                    >
                                        STEP {step + 1}
                                    </span>
                                    <h6 
                                        style={{lineHeight: "1.125rem"}}
                                        className="mb-2 tracking-wide !text-05 font-medium text-white"
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
                            <form 
                                onSubmit={(e) => e.preventDefault()}
                                className="flex flex-col gap-4 w-[400px]"
                            >
                                {step === 0 && <ContactForm form={contactForm}/>}
                                {step === 1 && <VehicleForm form={vehicleForm}/>}
                                {step === 2 && <ServiceForm form={serviceForm}/>}
                                <div className="flex gap-4">
                                    {step !== 0 &&
                                        <ButtonThree
                                            label="Previous"
                                            onClick={goToPrevForm} 
                                        />
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
                {/* Picture */}
                <div className="relative w-[50%] h-[calc(100vh-53px)] max-sm:hidden">
                    <div className="fixed top-[53px] w-full h-[calc(100%-53px)] bg-gray-200 bg-cover bg-top">
                    </div>
                </div>
            </div>
        </div>
    )
}