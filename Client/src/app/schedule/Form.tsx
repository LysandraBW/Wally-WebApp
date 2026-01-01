import PrimaryButton from "@/component/Button/PrimaryButton";
import ContactForm from "./ContactForm";
import Progress from "./Progress";
import ServiceForm from "./ServiceForm";
import VehicleForm from "./VehicleForm";
import SecondaryButton from "@/component/Button/SecondaryButton";
import { Fragment } from "react";

interface FormProps {
    step: number;
    stepData: any;
    contactForm: any;
    vehicleForm: any;
    serviceForm: any;
    goToPrevForm: any;
    goToNextForm: any;
    submitForm: any;
}


export default function Form(props: FormProps) {
    return (
        <div className="flex flex-col gap-4">
            <Progress
                step={props.step}
                header={props.stepData[props.step].header}
            />
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
            >
                {props.step === 0 && <ContactForm form={props.contactForm}/>}
                {props.step === 1 && <VehicleForm form={props.vehicleForm}/>}
                {props.step === 2 && <ServiceForm form={props.serviceForm}/>}
                <div className="flex mt-2 gap-4">
                    {props.step !== 0 &&
                        <SecondaryButton
                            className="w-full text-sm tracking-wide"
                            onClick={props.goToPrevForm} 
                        >
                            Previous
                        </SecondaryButton>
                    }
                    <PrimaryButton
                        className="w-full text-sm tracking-wide"
                        onClick={props.step === 2 ? props.submitForm : props.goToNextForm}
                    >
                        {props.step === 2 ? "Schedule" : `Continue to ${props.step == 0 ? "Vehicle" : "Service"}`}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}