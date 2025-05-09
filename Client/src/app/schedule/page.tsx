"use client";
import Button from "@/component/Form/Button/Button";
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
        <div className="relative p-4 bg-white">
            <nav className="sticky top-4 h-min flex justify-between items-center border border-gray-200 px-4 py-2 !pr-2 bg-white/90 rounded-2xl shadow-sm shadow-black/5 backdrop-blur z-[50]">
                <div>
                    <a href="/" className="flex gap-1 items-center">
                        <div className="bg-transparent text-black stroke-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                            </svg>
                        </div>
                        <span className={`text-black text-base ${IBM.className} tracking-tight`}>WALTRONICS</span>
                    </a>
                </div>
                <div className="flex gap-2">
                    <a href="/lookup" className={`bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-black text-sm tracking-wide font-[400] text-black`}>Lookup</a>
                    <a href="/schedule" className={`bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-black text-sm tracking-wide font-[400] text-black`}>Schedule</a>
                </div>
            </nav>
            <div className="grid grid-cols-2 mt-4 gap-4">
                {/* 
                If the output is not NULL, we show the user the
                results (fail or pass).
                */}
                {output === null &&
                    <Results
                        output={["ID","bob@mail.com"]}
                        restart={() => setOutput(null)}
                    />
                }
                {/* 
                If the output is NULL, we have yet to receive the user's
                submission. Therefore, we show them the form to complete.
                */}
                {output !== null &&
                    <div className="relative">
                        {/* <div className="absolute w-10 h-10 bg-white top-[calc(50%-20px)] left-[20px] rounded-full"></div>
                        <div className="absolute w-10 h-10 bg-white top-[calc(50%-20px)] left-[calc(100%+20px)] rounded-full"></div> */}
                        {/* Header */}
                        <Header
                            header="Schedule Appointment"
                            paragraph={`
                                We will confirm your appointment after this form's submission.
                            `}
                        />
                        <div className="flex flex-col justify-self-center min-w-[400px] max-w-[50%] w-[400px]">
                            {/* 
                            Sub-Header:
                            This just shows the current step
                            that the user is on.
                            */}
                            <div className="py-4 flex flex-col gap-2 border-b border-b-gray-100">
                                <span className="text-01 font-medium" style={{lineHeight: "0.72rem"}}>STEP {step + 1}</span>
                                <h6
                                    style={{
                                        lineHeight: "1.125rem"
                                    }}
                                    className={clsx(
                                        "mb-2 tracking-normal"
                                    )}
                                >
                                    {stepData[step].header}
                                </h6>
                                <div className="flex h-4 justify-between gap-1">
                                    <div 
                                        id="goBack1" 
                                        className="w-full h-full bg-blue-100 flex justify-center items-center rounded-2xl cursor-pointer group hover:bg-blue-200 transition"
                                        data-tooltip-place="bottom"
                                    >
                                        <div className="w-2 h-2  rounded-full bg-blue-200 group-hover:bg-blue-300">
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
                                        className="w-full h-full bg-gray-100 flex justify-center items-center rounded-2xl"
                                        data-tooltip-place="bottom"
                                    >
                                        <div className="w-2 h-2  rounded-full bg-gray-200">
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
                                        className="w-full h-full flex justify-center items-center rounded-2xl bg-gray-100 transition"
                                        data-tooltip-place="bottom"
                                    >
                                        <div className="w-2 h-2  rounded-full bg-gray-200">
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
                    </div>








                    
                }
                <div className="h-full">
                    <img 
                        src="alfredo.jpg"
                        className="rounded-2xl h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}