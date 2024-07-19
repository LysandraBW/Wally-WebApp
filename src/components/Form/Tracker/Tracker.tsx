import Button from "@/components/Input/Button/Button";
import { useState } from "react";

interface TrackerProps {
    parts: Array<{
        part: React.ReactNode;
        partHeader: string;
    }>;
    submit: () => Promise<boolean>;
    continue: (part: number) => boolean;
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

                    // The End
                    if (nextPart > lastPart) {
                        if (props.continue(part) && await props.submit()) {
                            setPart(0);
                            return;
                        }
                    }

                    // Not the End
                    if (props.continue(part)) {
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