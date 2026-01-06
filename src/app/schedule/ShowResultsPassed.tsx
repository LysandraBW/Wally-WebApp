import Copy from "@/component/Copy/Copy";
import CheckCircleIcon from "@/component/Icons/Icons/CheckCircleIcon";
import ShowResults from "./ShowResults";

interface ShowResultsPassedProps {
    output: [string, string];
}

export default function ShowResultsPassed(props: ShowResultsPassedProps) {
    return (
        <ShowResults
            Icon={
                <CheckCircleIcon
                    className="size-20 stroke-green-500 stroke-[1px]"
                />
            }
            head="Appointment Scheduled"
            body="Your appointment will be confirmed in 1-2 days. In the meantime, use the information below to check on your appointment. Please make sure to save this information as you will need it to check on your appointment. Thank you for trusting us at Waltronics."
            More={
                <div className="relative flex flex-col gap-2 items-center justify-end">
                    <Copy
                        label="ID"
                        value={props.output[0] || ""}
                    />
                    <Copy
                        label="Email"
                        value={props.output[1] || ""}
                    />
                </div>
            }
        />
    )
}