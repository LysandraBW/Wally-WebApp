"use client";
import { TextProps } from "@/component/Form/Text/DEF";
import clsx from "clsx";
import { Fragment, useState } from "react";

export default function TextFieldGrid(props: TextProps) {
    const [error, setError] = useState(props.state && !props.state[0]);

    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    return (
        <Fragment>
            <tr className="max-h-[32px] p-0">
                <td className={clsx("w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300", (props.state && !props.state[0]) && "border-b-0-")}>{props.label}</td>
                <td className={clsx("p-0 border border-gray-300", (props.state && !props.state[0]) && "border-b-0-")}>
                     <input
                        type={props.type}
                        name={props.name}
                        value={props.value}
                        onBlur={props.onBlur}
                        onChange={onChange}
                        placeholder={props.placeholder}
                        className="focus:bg-blue-50 focus:text-black text-03 text-gray-600 tracking-wider px-4 outline-none w-full h-[32px]"
                    />
                </td>
            </tr>
            {(props.state && props.state[0] === false) &&
                <tr className="min-h-[24px] p-0 bg-red-100/50">
                    <td className="bg-gray-50 w-[150px] px-4 border border-gray-300"></td>
                    <td className="px-4 py-1 text-red-500 border border-gray-300 font-medium tracking-wide text-01">
                        {props.state[1]}
                    </td>
                </tr>
            }
        </Fragment>
    )
}