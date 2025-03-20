"use client";
import Button from "@/component/Form/Button/Button";
import useForm from "@/features/Form/useForm/useForm";
import { startContactForm, startVehicleForm, startServiceForm } from "@/pages/customer/schedule/_DEF";
import ContactForm from "@/pages/customer/schedule/ContactForm";
import Results from "@/pages/customer/schedule/Results";
import ServiceForm from "@/pages/customer/schedule/ServiceForm";
import VehicleForm from "@/pages/customer/schedule/VehicleForm";
import { Satoshi } from "@/public/Font";
import ScheduleAppointment from "@/services/DB/Procedure/Appointment/ScheduleAppointment";
import Header from "@/views/Header/Header";
import ProgressNavigation from "@/views/Layout/Default/ProgressNavigation";
import clsx from "clsx";
import { Satisfy } from "next/font/google";
import { Fragment, useState } from "react";

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
        <div>
            {/* 
            The progress of the user in the form is integrated with
            the navigation bar. It's a simple design, but may not
            convey much meaning to the user. 
            */}
            <ProgressNavigation
                doneLength={stepData[step].doneLength}
                notDoneLength={stepData[step].notDoneLength}
            />
            {/* 
            If the output is not NULL, we show the user the
            results (fail or pass).
            */}
            {output !== null &&
                <Results
                    output={output}
                    restart={() => setOutput(null)}
                />
            }
            {/* 
            If the output is NULL, we have yet to receive the user's
            submission. Therefore, we show them the form to complete.
            */}
            {output === null &&
                <Fragment>
                    {/* Header */}
                    <Header
                        header="Request Appointment"
                        paragraph={`
                            To schedule your appointment, 
                            first complete this short form. We will 
                            confirm your appointment soon after.
                        `}
                    />
                    <div className="flex flex-col justify-self-center min-w-[400px] max-w-[50%] w-[400px]">
                        {/* 
                        Sub-Header:
                        This just shows the current step
                        that the user is on.
                        */}
                        <div className="py-4 border-b border-gray-200">
                            <span className="text-01 font-medium">STEP {step + 1}</span>
                            <h6
                                className={clsx(
                                    "text-06 font-medium"
                                )}
                            >
                                {stepData[step].header}
                            </h6>
                        </div>
                        {/* Form */}
                        <form 
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col py-4 gap-8 w-full"
                        >
                            {step === 1 && <ContactForm form={contactForm}/>}
                            {step === 0 && <VehicleForm form={vehicleForm}/>}
                            {step === 2 && <ServiceForm form={serviceForm}/>}
                            <div className="flex gap-4">
                                {step !== 0 &&
                                    <Button
                                        style="outlineBlack"
                                        type="button"
                                        label="Previous"
                                        onClick={goToPreviousForm}
                                    />
                                }
                                <Button
                                    style="dark"
                                    type={step === 2 ? "submit" : "button"}
                                    label={step === 2 ? "Schedule" : "Next"}
                                    onClick={step == 2 ? submitForm : goToNextForm}
                                />
                            </div>
                        </form>
                    </div>
                </Fragment>
            }
        </div>
    )
}