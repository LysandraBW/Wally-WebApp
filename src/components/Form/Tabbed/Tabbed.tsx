import Button from "@/components/Input/Button/Button";
import { useState } from "react";

interface TabbedProps {
    parts: Array<{
        part: React.ReactNode;
        header: string;
        onSave: () => any;
        onReset: () => any;
    }>;
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
                            {part.header}
                    </span>
                ))}
            </div>

            {/* Form */}
            {props.parts[part].part}

            {/* Button */}
            <Button
                label={`Save ${props.parts[part].header}`}
                onClick={() => props.parts[part].onSave()}
            />
            <Button
                label="Reset"
                onClick={() => props.parts[part].onReset()}
            />
        </>
    )
    
}