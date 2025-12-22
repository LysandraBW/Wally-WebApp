"use client";
import { InputState } from "@/features/Form/useForm/Input";
import { Instrumental } from "@/public/Font";
import clsx from "clsx";
import { ReactNode } from "react";

export interface FieldProps {
    input: ReactNode;
    label?: string;
    state?: InputState;
    wrapLabel?: boolean;
}

export function Field(props: FieldProps) {
    const Wrapper = props.wrapLabel ? "label" : "div";

    return (
        <Wrapper 
            className={clsx(
                "flex flex-col gap-[4px]", 
                props.state && props.state[0] === false && "error"
            )}
        >
            {/* Input Label */}
            {props.label &&
                <span 
                    className={clsx(
                        "text-base-700 font-normal text-sm",
                        "whitespace-nowrap tracking-wide"
                    )}
                >
                    {props.label}
                </span>
            }
            {/* Input */}
            {props.input}
            {/* Error Message */}
            {props.state && props.state[0] === false &&
                <span className="text-xs text-red-500 tracking-wide">
                    {props.state[1]}
                </span>
            }
        </Wrapper>
    )
}