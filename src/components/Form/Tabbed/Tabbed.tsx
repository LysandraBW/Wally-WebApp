import Button from "@/components/Input/Button/Button";
import { useState } from "react";

interface TabbedProps {
    parts: Array<{
        part: React.ReactNode;
        partHeader: string;
    }>;
    save: (part: number) => any;
    reset: (part: number) => any;
}

export default function Tabbed(props: TabbedProps) {
    const [part, setPart] = useState(0);

    return (
        <>
            {/* Tabs */}
            <div>
                {props.parts.map((part, i) => (
                    <span 
                        key={i}
                        onClick={() => {
                            setPart(i)
                        }}>
                            {part.partHeader}
                    </span>
                ))}
            </div>

            {/* Form */}
            {props.parts[part].part}

            {/* Button */}
            <Button
                label={`Save ${props.parts[part].partHeader}`}
                onClick={() => props.save(part)}
            />
            <Button
                label="Reset"
                onClick={() => props.reset(part)}
            />
        </>
    )
    
}