import Button from "@/components/input/button/Button";
import { useState } from "react";

interface UpdateFormProps {
    parts: Array<{
        part: React.ReactNode;
        header: string;
        onSave: () => any;
        onReset: () => any;
    }>;
}

export default function UpdateForm(props: UpdateFormProps) {
    const [part, setPart] = useState(0);

    return (
        <>
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
            {props.parts[part].part}
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