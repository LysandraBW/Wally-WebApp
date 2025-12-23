"use client";
import DashIcon from "@/component/Icons/Icons/MinusIcon";
import PhoneNumberPart from "./PhoneNumberPart";
import { useState, useEffect } from "react";
import { ReadWriteInputProps } from "@/features/Form/DEF";
import { Field } from "../../Field";
import MinusIcon from "@/component/Icons/Icons/MinusIcon";
import clsx from "clsx";
import PhoneNumberDash from "./PhoneNumberDash";

interface PhoneNumberProps extends ReadWriteInputProps {
    forceUpdate?: number;
}

export default function PhoneNumber(props: PhoneNumberProps) {
    const [phoneNumber1, setPhoneNumber1] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [phoneNumber3, setPhoneNumber3] = useState("");

    useEffect(() => {
        updatePhoneNumber(props.value);
    }, [props.forceUpdate]);

    const updatePhoneNumber = (phoneNumber: string) => {
        // From the function below, the phone number values *should* have
        // been normalized to match [0-9]{3}-[0-9]{3}-[0-9]{4}.
        let phoneNumberParts = phoneNumber.replaceAll("[^0-9-]", "").split("-");
        
        while (phoneNumberParts.length < 3)
            phoneNumberParts.push("");
        phoneNumberParts = phoneNumberParts.slice(0, 3);

        setPhoneNumber1(phoneNumberParts[0]);
        setPhoneNumber2(phoneNumberParts[1]);
        setPhoneNumber3(phoneNumberParts[2]);
    }
    
    const handleAutoFill = (part: 0|1|2, value: string) => {
        if (part != 0)
            return false;

        if (/[0-9]{3}[0-9]{3}[0-9]{4}/.test(value)) {
            const updatedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
            props.onChange(props.name, updatedValue);
            updatePhoneNumber(updatedValue);
            return true;
        }
        
        if (/[0-9]{3}.[0-9]{3}.[0-9]{4}/.test(value)) {
            const updatedValue = `${value.slice(0, 3)}-${value.slice(4, 7)}-${value.slice(8, 12)}`;
            props.onChange(props.name, updatedValue);
            updatePhoneNumber(updatedValue);
            return true;
        }

        return false;
    }

    const handleAutoFocus = (part: 0|1|2, phoneNumberParts: string[]) => {
        const field = document.getElementsByName(props.name + (part).toString())[0] as any;
        const autoFocusNext = field && field.selectionStart == 3;
        const autoFocusPrev = field && field.selectionStart == 0;
        
        if (autoFocusNext && part < 2 && phoneNumberParts[part].length === 3) {
            const nextField = document.getElementsByName(props.name + (part + 1).toString())[0];
            nextField && nextField.focus();
        }
        
        if (autoFocusPrev && part > 0 && phoneNumberParts[part].length === 0) {
            const prevField = document.getElementsByName(props.name + (part - 1).toString())[0];
            prevField && prevField.focus();
        }
    }

    const updatePhoneNumberPart = (part: 0|1|2, value: string) => {
        const phoneNumberParts = [phoneNumber1, phoneNumber2, phoneNumber3];
        const setPhoneNumberPart = [setPhoneNumber1, setPhoneNumber2, setPhoneNumber3][part];
        
        // Update Part
        phoneNumberParts[part] = value.replaceAll("[^0-9]", "").slice(0, part < 2 ? 3 : 4);
        setPhoneNumberPart(phoneNumberParts[part]);

        // Update Value
        let phoneNumber = phoneNumberParts.join("-");
        props.onChange(props.name, phoneNumber);

        return phoneNumberParts;
    }

    const handlePhoneNumberPart = (part: 0|1|2, value: string) => {
        if (handleAutoFill(part, value))
            return;
        
        const phoneNumberParts = updatePhoneNumberPart(part, value);
        handleAutoFocus(part, phoneNumberParts);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div className="grid grid-cols-[repeat(5,auto)] gap-1 items-center">
                    <PhoneNumberPart
                        part={0}
                        name={props.name}
                        value={phoneNumber1}
                        onChange={handlePhoneNumberPart}
                    />
                    <PhoneNumberDash
                        error={(props.state && props.state[0] === false) as boolean}
                    />
                    <PhoneNumberPart
                        part={1}
                        name={props.name}
                        value={phoneNumber2}
                        onChange={handlePhoneNumberPart}
                    />
                    <PhoneNumberDash
                        error={(props.state && props.state[0] === false) as boolean}
                    />
                    <PhoneNumberPart
                        part={2}
                        name={props.name}
                        value={phoneNumber3}
                        onChange={handlePhoneNumberPart}
                    />
                </div>
            }
        />
    )
}