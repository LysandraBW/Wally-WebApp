"use client";
import { useEffect, useState } from "react";
import { Field } from "../Field";
import { TextProps } from "./TextProps";
import clsx from "clsx";

export default function Text(props: TextProps) {
    const [hadFocus, setHadFocus] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (props.state && props.state[0] === false && (!props.value.length || !hadFocus))
            setShowErrorMessage(true)
    }, [props.state, props.value]);

    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    const onBlur = (event: any) => {
        setShowErrorMessage(true);
        props.onBlur && props.onBlur();
    }

    const onFocus = (event: any) => {
        setHadFocus(true);
    }

    return (
        <Field
            label={props.label}
            state={showErrorMessage ? props.state : [null, ""]}
            wrapLabel={true}
            smaller={props.smaller}
            input={
                <div className="w-full flex">
                    {props.prefix &&
                        <div 
                            className={clsx(
                                "bg-base-100 field-text field-padding",
                                "field-border !rounded-r-none !border-r-0",
                                props.smaller && "!text-xs"
                            )}
                        >
                            {props.prefix}
                        </div>
                    }
                    <input
                        type={props.type}
                        name={props.name}
                        value={props.value}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onChange={onChange}
                        placeholder={props.placeholder}
                        className={clsx(
                            "w-full field-hover field-border field-background field-padding field-border field-focus field-text !cursor-auto",
                            props.prefix && "!rounded-l-none",
                            props.suffix && "!rounded-r-none",
                            props.smaller && "!text-xs"
                        )}
                    />
                    {props.suffix &&
                        <div 
                            className={clsx(
                                "bg-base-100 field-text field-padding",
                                "field-border !rounded-l-none !border-l-0",
                                props.smaller && "!text-xs"
                            )}
                        >
                            {props.suffix}
                        </div>
                    }
                </div>
            }
        />
    )
}