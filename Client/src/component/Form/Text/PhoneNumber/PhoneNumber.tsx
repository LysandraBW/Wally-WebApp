"use client";
import DashIcon from "@/component/Icon/Dash";
import PhoneNumberPart from "./PhoneNumberPart";
import { useState, useEffect } from "react";
import { ReadWriteInputProps } from "@/features/Form/DEF";
import { Field } from "../../Field";

export default function PhoneNumber(props: ReadWriteInputProps) {
    const [phoneNumber1, setPhoneNumber1] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [phoneNumber3, setPhoneNumber3] = useState("");

    useEffect(() => {
        updatePhoneNumber(props.value);
    }, [props.value]);

    const updatePhoneNumber = (phoneNumber: string) => {
        let phoneNumberParts = phoneNumber.replaceAll("[^0-9-]", "").split("-");
        while (phoneNumberParts.length < 3)
            phoneNumberParts.push("");
        phoneNumberParts = phoneNumberParts.slice(0, 3);

        setPhoneNumber1(phoneNumberParts[0]);
        setPhoneNumber2(phoneNumberParts[1]);
        setPhoneNumber3(phoneNumberParts[2]);
    }
    
    const updatePhoneNumberPart = (part: 0|1|2, value: string) => {
        // Handling Auto-Fill Values
        if (part === 0 && value.length == 10) {
            props.onChange(props.name, `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`);
            return;
        }

        const phoneNumberParts = [phoneNumber1, phoneNumber2, phoneNumber3];
        phoneNumberParts[part] = value.replaceAll("[^0-9]", "").slice(0, part <= 1 ? 3 : 4);
        props.onChange(props.name, phoneNumberParts.filter(p => !!p).join("-"));

        if (part < 2 && phoneNumberParts[part].length === 3) {
            const nextPhoneNumber = document.getElementsByName(props.name + (part + 1).toString())[0];
            nextPhoneNumber && nextPhoneNumber.focus();
        }
        else if (part > 0 && phoneNumberParts[part].length === 0) {
            const prevPhoneNumber = document.getElementsByName(props.name + (part - 1).toString())[0];
            prevPhoneNumber && prevPhoneNumber.focus();
        }
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div className="flex items-center gap-1">
                    <PhoneNumberPart
                        part={0}
                        name={props.name}
                        value={phoneNumber1}
                        onBlur={props.onBlur}
                        onChange={updatePhoneNumberPart}
                    />
                    <DashIcon
                        fill="#E5E7EB"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                    />
                    <PhoneNumberPart
                        part={1}
                        name={props.name}
                        value={phoneNumber2}
                        onBlur={props.onBlur}
                        onChange={updatePhoneNumberPart}
                    />
                    <DashIcon
                        fill="#E5E7EB"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                    />
                    <PhoneNumberPart
                        part={2}
                        name={props.name}
                        value={phoneNumber3}
                        onBlur={props.onBlur}
                        onChange={updatePhoneNumberPart}
                    />
                </div>
            }
        />
    )
}