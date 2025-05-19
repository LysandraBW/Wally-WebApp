"use client";
import { InputState } from "@/features/Form/useForm/Input";
import clsx from "clsx";
import { ReactNode } from "react";

export interface FieldProps {
    input: ReactNode;
    label?: string;
    state?: InputState;
}

export function Field(props: FieldProps) {
    return (
        <label className={clsx("flex flex-col gap-0.5", props.state && props.state[0] === false && "error")}>
            {/* Input Label */}
            {props.label &&
                <span className={clsx(
                    "text-gray-950 font-normal text-03",
                    "whitespace-nowrap tracking-wide"
                )}>{props.label}</span>
            }
            {/* Input */}
            {props.input}
            {/* Error Message */}
            {props.state && props.state[0] === false &&
                <span className="text-01 text-red-500 font-medium">{props.state[1]}</span>
            }
        </label>
    )
}