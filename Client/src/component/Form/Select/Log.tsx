import CrossIcon from "@/component/Icon/Icons/XMarkIcon";
import { OptionMap, Value, Values } from "@/features/Form/DEF";
import clsx from "clsx";

interface LogProps {
    values: Values;
    valueToLabel: OptionMap;
    defaultLabel: string;
    deleteValue: (value: Value) => void;
}

export default function Log(props: LogProps) {
    const deleteValue = (event: any, value: Value) => {
        event.stopPropagation();
        props.deleteValue(value);
    }

    return (
        <div className={clsx("h-full overflow-x-clip")}>
            {props.values.length !== 0 &&
                <ul className="flex gap-1 overflow-x-scroll scroll-hide h-full pl-1">
                    {props.values.map((value, i) => (
                        <li
                            key={i}
                            onClick={(e) => deleteValue(e, value)}
                            className="flex justify-between items-center gap-1 py-0 pr-1 pl-2 bg-gray-100 rounded whitespace-nowrap hover:bg-gray-50 cursor-pointer w-min"
                        >
                            <span className="text-01 tracking-wider">{props.valueToLabel[value]}</span>
                            <CrossIcon
                                top="0.05px"
                                width="13"
                                height="13"
                                fill="#9CA3AF"
                                color="#9CA3AF"
                                stroke="#9CA3AF"
                                strokeWidth="0.5"
                                cursor="pointer"
                            />
                        </li>
                    ))}
                </ul>
            }
            {props.values.length === 0 &&
                <p className="px-2 py-1">{props.defaultLabel}</p>
            }
        </div>
    )
}