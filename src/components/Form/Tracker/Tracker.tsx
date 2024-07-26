import Button from "@/components/Input/Button/Button";
import { useState } from "react";

interface TrackerProps {
    parts: Array<{
        part: React.ReactNode;
        partHeader: string;
        onContinue: () => boolean;
    }>;
    submit: () => Promise<boolean>;
}

export default function Tracker(props: TrackerProps) {
    const [part, setPart] = useState(0);

    const getLabel = (): string => {
        if (part === props.parts.length - 1)
            return "Submit";
        return `Continue to ${props.parts[part+1].partHeader}`;
    }

    return (
        <>
            {props.parts[part].part}
            <Button
                label={getLabel()}
                onClick={async () => {
                    const nextPart = part + 1;
                    const lastPart = props.parts.length - 1;
                    
                    if (nextPart > lastPart) {
                        if (props.parts[part].onContinue() && await props.submit()) {
                            setPart(0);
                            return;
                        }
                    }
                    else if (props.parts[part].onContinue()) {
                        setPart(Math.min(nextPart, lastPart));
                    }
                }}
            />
            {part > 0 && 
                <span 
                    onClick={() => {
                        const prevPart = part - 1;
                        setPart(Math.max(0, prevPart));
                    }}>
                        Go Back
                </span>
            }
        </>
    )
    
}