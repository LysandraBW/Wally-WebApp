import Copy from "@/component/Copy/Copy";
import Button from "@/component/Form/Button/Button";
import Header from "@/views/Header/Header";
import { Fragment } from "react";

interface ResultsProps {
    output: [string,string];
    restart: () => void;
}

export default function Results(props: ResultsProps) {
    return (
        <div className="flex flex-col items-center justify-center pt-1 grow">
            {props.output[0] === "" &&
                <Fragment>
                    <div className="flex justify-center items-center mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-24 drop-shadow/50 stroke-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <Header
                        header="Something Went Wrong"
                        paragraph={`
                            Please try to schedule your appointment
                            again. If this error continues, please 
                            call us at 000-000-0000.
                        `}
                    />
                    <div className="flex justify-center py-4 mt-2">
                        <div className="min-w-[200px]">
                            <button onClick={props.restart} className="rounded-lg px-4 py-2 w-full !bg-white text-black border border-gray-200 text-05 tracking-wide font-medium shadow">Try Again</button>
                        </div>
                    </div>
                </Fragment>
            }
            {props.output[0] !== "" &&
                <Fragment>
                    <div className="flex justify-center items-center mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="currentColor" className="size-24 drop-shadow/50 stroke-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <Header
                        header="Appointment Scheduled"
                        paragraph={
                            <>
                                We have successfully received your request.
                                Use the information below to lookup your
                                appointment. Your appointment will be confirmed in 1-2 days. Thank you for trusting 
                                us at Waltronics.
                            </>
                        }
                    />
                    {/* 
                    The user can click these buttons to 
                    copy their ID and email address.
                    */}
                    <div className="flex flex-col gap-2 items-center justify-end mt-8">
                        <Copy
                            value={props.output[0] || ""}
                            label={`ID`}
                        />
                        <Copy
                            value={props.output[1] || ""}
                            label={`Email`}
                        />
                    </div>
                </Fragment>
            }
        </div>
    )
}