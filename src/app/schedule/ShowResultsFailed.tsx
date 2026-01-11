import XCircleIcon from "@/component/Icons/Icons/XCircleIcon";
import ShowResults from "./ShowResults";
import PrimaryButton from "@/component/Button/PrimaryButton";

interface ShowResultsFailedProps {
    restart: () => void;
}

export default function ShowResultsFailed(props: ShowResultsFailedProps) {
    return (
        <ShowResults
            Icon={
                <XCircleIcon
                    className="size-20 stroke-red-500 stroke-[1px]"
                />
            }
            head="Something Went Wrong..."
            body="Please try to schedule your appointment again. If this issue continues, please call us at 407-931-2518."
            More={
                <PrimaryButton 
                    onClick={props.restart}
                    className="w-[min(100%,200px)]"
                >
                    Try Again
                </PrimaryButton>
            }
        />
    )
}