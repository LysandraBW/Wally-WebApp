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
        <div className="flex flex-col">
            {props.output[0] === "" &&
                <Fragment>
                    <Header
                        header="Something Went Wrong"
                        paragraph={`
                            Please try to schedule your appointment
                            again. If this error continues, please 
                            call us at 111-100-1000.
                        `}
                    />
                    <div className="flex justify-center py-4">
                        <div className="w-[400px]">
                            <Button
                                type="reset"
                                style="outlineBlack"
                                label="Try Again"
                                onClick={props.restart}
                            />
                        </div>
                    </div>
                </Fragment>
            }
            {props.output[0] !== "" &&
                <Fragment>
                    <Header
                        header="Appointment Scheduled"
                        paragraph={`
                            We have successfully received your request. 
                            Use the ID and email below to check on your
                            appointment. Your appointment will be officially
                            scheduled in 1-2 days. Thank you for trusting 
                            us at Waltronics.
                        `}
                    />
                    {/* 
                    The user can click these buttons to 
                    copy their ID and email address.
                    */}
                    <div className="flex flex-col gap-1 items-center py-4">
                        <Copy
                            value={props.output[0] || ""}
                            label={`ID: ${props.output[0]}`}
                        />
                        <Copy
                            value={props.output[1] || ""}
                            label={`Email: ${props.output[1]}`}
                        />
                    </div>
                </Fragment>
            }
        </div>
    )
}