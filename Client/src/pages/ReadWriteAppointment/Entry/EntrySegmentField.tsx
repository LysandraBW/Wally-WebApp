import { OptionsWithNode, ReadWriteArrayInputProps } from "@/features/Form/DEF";
import clsx from "clsx";
import EntryField from "@/pages/ReadWriteAppointment/Entry/EntryField";

interface SegmentGridProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: OptionsWithNode;
}

export default function EntrySegmentField(props: SegmentGridProps) {
    return (
        <EntryField
            state={props.state}
            label={props.label}
            input={
                <div className="h-full flex justify-between shadow-sm">
                    {props.options && props.options.map((option, i) => (
                        <button 
                            key={i}
                            type="button"
                            onClick={() => props.onChange(props.name, [option[0]])}
                            className={clsx(
                                "w-full",
                                "flex items-center justify-center gap-2",
                                "border-r last:border-r-0 border-base-300 dark:border-base-200 rounded-none",
                                props.values.includes(option[0]) && "bg-base-200",
                                !props.values.includes(option[0]) && "hover:bg-base-50 dark:hover:bg-base-100",
                            )}
                        >
                            {option[2] && option[2]}
                            <span
                                className={clsx(
                                    "text-xs tracking-wide text-base-700",
                                    "whitespace-nowrap",
                                    props.values.includes(option[0]) && "!text-base-700 font-medium"
                                )}
                            >
                                {option[1]}
                            </span>
                        </button>
                    ))}
                </div>
            }
        />
    )
}