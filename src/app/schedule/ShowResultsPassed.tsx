import Copy from "@/component/Copy/Copy";
import ShowResults from "./ShowResults";
import SmileIcon from "@/component/Icons/Icons/SmileIcon";

interface ShowResultsPassedProps {
    output: [string, string];
}

export default function ShowResultsPassed(props: ShowResultsPassedProps) {
    return (
        <ShowResults
            Icon={
                <SmileIcon
                    className="size-14 stroke-green-500 stroke-[1px]"
                />
            }
            head="Appointment Requested"
            body={
                <>
                    We'll contact you in 1-2 days to finish scheduling. In the mean time, you can use the information below to check your appointment. Thank you for trusting us at Waltronics.
                </>
            }
            More={
                <div className="relative flex flex-col gap-2 items-center w-full">
                    <Copy
                        label="Email"
                        value={props.output[1] || ""}
                    />
                    <Copy
                        label="ID"
                        value={props.output[0] || ""}
                    />
                </div>
            }
            success={true}
        />
    )
}