import Copy from "@/component/Copy/Copy";
import ScheduledHeader from "./ScheduledHeader";
import ConfettiGenerator from "confetti-js";
import { useEffect } from "react";
import CheckCircleIcon from "@/component/Icons/Icons/CheckCircleIcon";

interface SchedulePassedProps {
    output: [string, string];
}

export default function SchedulePassed(props: SchedulePassedProps) {
    useEffect(() => {
		const confettiSettings = { 
			target: 'my-canvas',
			props: ['circle', 'square'],
			rotate: true,
            colors: [[220, 38, 38], [37, 99, 235]],
			size: 1,
            max: 80,
            clock: 10,
		};

		const confetti = new ConfettiGenerator(confettiSettings);
		confetti.render();
	}, []);
    
    return (
        <div className="flex flex-col grow justify-center items-center relative">
            <canvas 
                id="my-canvas"
                className="w-[calc(100%+2rem)] h-[calc(100%+2rem)] absolute top-[-1rem] left-[-1rem] z-[0]"
            />
            <div className="w-15 h-15 mb-10 flex justify-center items-center">
                <CheckCircleIcon
                    class="size-20 drop-shadow/50 stroke-blue-500 stroke-1"
                />
            </div>
            <ScheduledHeader
                header="Appointment Scheduled"
                paragraph="Your appointment will be confirmed in 1-2 days. In the meantime, use the information below to check on your appointment. Thank you for trusting us at Waltronics."
            />
            {/* 
                The user can click these buttons to 
                copy their ID and email address.
            */}
            <div className="mt-4 relative flex flex-col gap-2 items-center justify-end">
                <Copy
                    label="ID"
                    value={props.output[0] || ""}
                />
                <Copy
                    label="Email"
                    value={props.output[1] || ""}
                />
            </div>
        </div>
    )
}