import Indicator from "./Indicator";
import Button from "@/components/Input/Button/Button";
import { Fragment, useState } from "react";

interface TrackerProps {
    parts: Array<{
        part: React.ReactNode;
        partHeader: string;
        onContinue: () => Promise<boolean>;
    }>;
    onSubmit: () => Promise<boolean>;
}

export default function Tracker(props: TrackerProps) {
    const [part, setPart] = useState(0);

    const getLabel = () => {
        if (part === props.parts.length - 1)
            return `Submit`;
        return `Continue to ${props.parts[part+1].partHeader}`;
    }

    const goForward = async () => {
        const nextPart = part + 1;
        const lastPart = props.parts.length - 1;
        
        if (nextPart > lastPart) {
            if (await props.parts[part].onContinue() && await props.onSubmit()) {
                setPart(0);
                return;
            }
        }
        else if (await props.parts[part].onContinue()) {
            setPart(Math.min(nextPart, lastPart));
        }
    }

    const goBackward = () => {
        const prevPart = part - 1;
        setPart(Math.max(0, prevPart));
    }

    return (
        <Fragment>
            <Indicator
                partIndex={part}
                length={props.parts.length}
            />
            <div className='flex flex-col gap-y-8'>
                <div className='flex flex-col gap-y-8 h-min'>
                    {props.parts[part].part}
                </div>
                <div className='flex flex-col'>
                    <Button
                        label={getLabel()}
                        onClick={goForward}
                    />
                    {part > 0 && 
                        <span 
                            onClick={goBackward}
                            className='text-xs font-medium cursor-pointer !text-gray-500 mt-2'
                        >
                            Go Back
                        </span>
                    }
                </div>
            </div>
        </Fragment>
    )
}