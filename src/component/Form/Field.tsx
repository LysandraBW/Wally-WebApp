"use client";
import { InputState } from "@/features/Form/useForm/Input";
import clsx from "clsx";
import { ReactNode } from "react";

export interface FieldProps {
    input: ReactNode;
    label?: string;
    state?: InputState;
    wrapLabel?: boolean;
    smaller?: boolean;
}

export function Field(props: FieldProps) {
    const Wrapper = props.wrapLabel ? "label" : "div";

    return (
        <Wrapper 
            className={clsx(
                "h-full flex flex-col gap-[2px]",
                "cursor-default", 
                props.state && props.state[0] === false && "error"
            )}
        >
            {/* Input Label */}
            {props.label &&
                <span 
                    className={clsx(
                        "block",
                        "text-base-700 font-normal text-sm",
                        "whitespace-nowrap tracking-wide",
                        props.state && props.state[0] === false && "text-red-500",
                        props.smaller && "text-xs"
                    )}
                >
                    {props.label}
                </span>
            }
            {/* Input */}
            {props.input}
            {/* Error Message */}
            {props.state && props.state[0] === false &&
                <span className="block text-xs text-red-500 tracking-wide">
                    {props.state[1]}
                </span>
            }
        </Wrapper>
    )
}