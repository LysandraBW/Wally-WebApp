"use client";
import Button from "@/component/Form/Button/Button";
import ButtonTwo from "@/component/Form/Button/ButtonTwo";
import NavBar from "@/component/NavBar";
import useForm from "@/features/Form/useForm/useForm";
import { startContactForm, startVehicleForm, startServiceForm } from "@/pages/customer/schedule/_DEF";
import ContactForm from "@/pages/customer/schedule/ContactForm";
import Results from "@/pages/customer/schedule/Results";
import ServiceForm from "@/pages/customer/schedule/ServiceForm";
import VehicleForm from "@/pages/customer/schedule/VehicleForm";
import { IBM, Satoshi } from "@/public/Font";
import ScheduleAppointment from "@/services/DB/Procedure/Appointment/ScheduleAppointment";
import Header from "@/views/Header/Header";
import ProgressNavigation from "@/views/Layout/Default/ProgressNavigation";
import clsx from "clsx";
import { Satisfy } from "next/font/google";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Tooltip } from 'react-tooltip'

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
            {/* <div className="border-b border-b-gray-200"> */}
                <NavBar sticky={true} border={true}/>
            {/* </div> */}
            <div className="flex flex-col grow ">
                {/* 
                If the output is not NULL, we show the user the
                results (fail or pass).
                */}
                {output !== null &&
                    <div className="flex flex-col grow">
                        <Results
                            output={output}
                            restart={() => setOutput(null)}
                        />
                    </div>
                }
                {/* 
                If the output is NULL, we have yet to receive the user's
                submission. Therefore, we show them the form to complete.
                */}
                {output === null &&
                        <div className="relative pt-16 pb-8 px-16">
                            {/* <div className="absolute w-10 h-10 bg-white top-[calc(50%-20px)] left-[20px] rounded-full"></div>
                            <div className="absolute w-10 h-10 bg-white top-[calc(50%-20px)] left-[calc(100%+20px)] rounded-full"></div> */}
                            {/* Header */}
                            {/* <Header
                                header="Schedule Appointment"
                                paragraph={`
                                    We will confirm your appointment after this form's submission.
                                `}
                            /> */}
                            <div className="flex flex-col justify-self-center w-[440px]">
                                <header className="flex flex-col items-center border-b- border-b-gray-200- pb-4">
                                    <h3 className="text-center font-medium">Schedule Appointment</h3>
                                    <p className="text-center text-md tracking-wide max-w-[440px] text-gray-400">To schedule an appointment, fill out the short form below. After completion, your appointment will be shortly confirmed.</p>
                                </header>    
                                {/* 
                                Sub-Header:
                                This just shows the current step
                                that the user is on.
                                */}
                                <div className="bg-gray-100 rounded-md px-4 py-4 flex flex-col gap-2 border-b- border-b-gray-200- pb-5">
                                    <span className="text-01 font-medium" style={{lineHeight: "0.72rem"}}>STEP {step + 1}</span>
                                    <h6 style={{lineHeight: "1.125rem"}} className={clsx("mb-2 tracking-wide !text-05 font-medium")}>
                                        {stepData[step].header}
                                    </h6>
                                    <div className="flex h-2.5 justify-between gap-1">
                                        <div 
                                            id="goBack1" 
                                            className="w-full h-full bg-gray-600 border border-gray-600 flex justify-center items-center rounded shadow-sm cursor-pointer group hover:bg-blue-500 hover:border-blue-500 transition"
                                            data-tooltip-place="bottom"
                                        >
                                            <div className="w-1 h-1  rounded-full bg-white">
                                            </div>    
                                        </div>
                                        {
                                            step > 0 &&
                                                <Tooltip 
                                                    anchorSelect="#goBack1"
                                                    opacity={1}
                                                    border={"1px solid rgb(229 231 235)"}
                                                    style={{
                                                        backgroundColor: "white",
                                                        boxShadow: "0px 2px 2px 0px #00000010",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: "0.25rem",
                                                    }}
                                                >
                                    
                                                    <h6 className="text-sm tracking-normal text-gray-700">Back to Contact Information</h6>
                                                </Tooltip> 
                                        }
                                        <div 
                                            id="goBack2" 
                                            className="w-full h-full bg-white shadow-sm border border-gray-200 flex justify-center items-center rounded"
                                            data-tooltip-place="bottom"
                                        >
                                            <div className="w-1 h-1  rounded-full bg-gray-200">
                                            </div>    
                                        </div>
                                        {
                                            step > 2 &&
                                                <Tooltip 
                                                    anchorSelect="#goBack2"
                                                    opacity={1}
                                                    border={"1px solid rgb(229 231 235)"}
                                                    style={{
                                                        backgroundColor: "white",
                                                        boxShadow: "0px 2px 2px 0px #00000010",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: "0.25rem"
                                                    }}
                                                >
                                                
                                                    <h6 className="text-sm tracking-normal text-gray-700">Back to Vehicle Information</h6>
                                                </Tooltip> 
                                        }
                                        <div 
                                            id="goBack3" 
                                            className="w-full h-full flex justify-center items-center rounded border border-gray-200 shadow-sm bg-white transition"
                                            data-tooltip-place="bottom"
                                        >
                                            <div className="w-1 h-1  rounded-full bg-gray-200">
                                            </div>    
                                        </div>
                                        {
                                            step > 3 &&
                                                <Tooltip 
                                                    anchorSelect="#goBack3"
                                                    opacity={1}
                                                    border={"1px solid rgb(229 231 235)"}
                                                    style={{
                                                        backgroundColor: "white",
                                                        boxShadow: "0px 2px 2px 0px #00000010",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: "0.25rem"
                                                    }}
                                                >
                                                    
                                                    <h6 className="text-sm tracking-normal text-gray-700">Back to Service Information</h6>
                                                </Tooltip> 
                                        }
                                        {/* <div className="w-full h-full bg-gray-100 flex justify-center items-center rounded-2xl">
                                            <div className="w-2 h-2 rounded-full bg-gray-200">
                                            </div>    
                                        </div>   
                                        <div className="w-full h-full bg-gray-100 flex justify-center items-center rounded-2xl">
                                            <div className="w-2 h-2 rounded-full bg-gray-200">
                                            </div>    
                                        </div>      */}
                                    </div>
                                </div>          
                                {/* Form */}
                                <form 
                                    onSubmit={(e) => e.preventDefault()}
                                    className="flex flex-col py-4 gap-5 w-full"
                                >
                                    {step === 0 && <ContactForm form={contactForm}/>}
                                    {step === 1 && <VehicleForm form={vehicleForm}/>}
                                    {step === 2 && <ServiceForm form={serviceForm}/>}
                                    <div className="flex gap-4 mt-1">
                                        {/* {step !== 0 &&
                                            <Button
                                                style="outlineBlack"
                                                type="button"
                                                label="Previous"
                                                onClick={goToPreviousForm}
                                            />
                                        } */}
                                        {step !== 0 &&
                                            <button onClick={goToPreviousForm} className="w-full shadow-sm text-05 font-medium rounded-lg px-4 py-2 border border-gray-200 tracking-wide text-md text-gray-500">
                                                Previous
                                            </button>
                                        }
                                        {/* <Button
                                            style="dark"
                                            type={step === 2 ? "submit" : "button"}
                                            label={step === 2 ? "Schedule" : "Continue"}
                                            onClick={step == 2 ? submitForm : goToNextForm}
                                        /> */}
                                        <ButtonTwo
                                            label={step === 2 ? "Schedule" : "Continue"}
                                            onClick={step == 2 ? submitForm : goToNextForm}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}