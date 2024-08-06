import Button from "@/components/Input/Button/Button";
import { useState } from "react";
import Indicator from "./Indicator";

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

    const getLabel = (): string => {
        if (part === props.parts.length - 1)
            return "Submit";
        return `Continue to ${props.parts[part+1].partHeader}`;
    }

    return (
        <div>
            <div>
                <div>
                    <header>
                        <h1>Action Header</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </header>
                    <Indicator
                        part={part}
                        parts={props.parts.map(p => p.partHeader)}
                    />
                    <div>
                        <div>
                            <h3>{props.parts[part].partHeader}</h3>
                        </div>
                        <div>
                            {props.parts[part].part}
                        </div>
                        <Button
                            label={getLabel()}
                            onClick={async () => {
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
                    </div>
                </div>
            </div>
        </div>
    )
    
}