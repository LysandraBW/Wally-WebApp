import CheckIcon from "@/component/Icon/Check";
import { Label, Options, Value } from "@/features/Form/DEF";
import { ReactNode, Fragment } from "react";
import Checkbox from "../Checkbox/Checkbox";
import clsx from "clsx";
import { ReadWriteArrayInputProps } from "@/features/Form/DEF";
import ListElement from "./List/ListElement";

interface ListProps extends Pick<ReadWriteArrayInputProps, "values"> {
    options: Options|Array<[Value, Label, ReactNode]>;
    multiple: boolean;
    selectValue: (value: Value) => void;
}

export default function List(props: ListProps) {
    return (
        <ul 
            className="px-0 absolute top-[calc(100%+.25rem)] rounded-md border border-gray-300 bg-white w-full z-[120] shadow-sm"
        >
            {props.options.map(([value, label, node], i) => (
                <li
                    key={i}
                    onClick={(event) => {
                        event.stopPropagation();
                        props.selectValue(value);
                    }}
                    className={clsx(
                        "first:rounded-t-[6px] last:rounded-b-[6px]",
                        "px-2 py-1 flex justify-between items-center gap-2",
                        props.multiple && "!justify-normal",
                        "hover:bg-gray-50 hover:cursor-pointer",
                    )}
                >
                    {props.multiple && 
                        <Checkbox
                            name=""
                            value={value}
                            checked={props.values.includes(value)}
                            onChange={() => props.selectValue(value)}
                        />
                    }
                    {node && node}
                    {!node &&
                        <Fragment>
                            <span 
                                className={clsx(
                                    "text-gray-600",
                                    props.values.includes(value) && "font-medium text-gray-950"
                                )}
                            >
                                {label}
                            </span>
                        </Fragment>
                    }
                    {!props.multiple && props.values.includes(value) &&
                        <CheckIcon
                            width="16"
                            height="16"
                            color="#020617"
                        />
                    }
                </li>
            ))}
        </ul>
    )
}