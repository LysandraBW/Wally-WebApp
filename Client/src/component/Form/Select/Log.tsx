import CrossIcon from "@/component/Icon/Cross";
import { OptionMap, Value, Values } from "@/features/Form/DEF";

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
        <div className="h-full overflow-x-clip">
            {props.values.length !== 0 &&
                <ul className="flex gap-1 overflow-x-scroll scroll-hide h-full">
                    {props.values.map((value, i) => (
                        <li
                            key={i}
                            onClick={(e) => deleteValue(e, value)}
                            className="field flex justify-between items-center gap-2 py-1 pr-1 pl-2 bg-gray-100 whitespace-nowrap hover:bg-gray-200 hover:border-gray-300 cursor-pointer w-min"
                        >
                            <span className="text-01">{props.valueToLabel[value]}</span>
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