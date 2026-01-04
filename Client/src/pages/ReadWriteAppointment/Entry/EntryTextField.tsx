import { TextProps } from "@/component/Form/Text/TextProps";
import EntryField from "@/pages/ReadWriteAppointment/Entry/EntryField";
import clsx from "clsx";

export default function EntryTextField(props: TextProps) {
    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    const onBlur = (event: any) => {
        props.onBlur && props.onBlur();
    }

    return (
        <EntryField
            label={props.label}
            input={
                <div className="w-full flex">
                    {props.prefix &&
                        <span className="p-2 text-xs text-base-500 tracking-wide font-medium bg-base-100 dark:bg-base-200 entry-border-r">
                            {props.prefix}
                        </span>
                    }
                    <input
                        type={props.type}
                        name={props.name}
                        value={props.value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder={props.placeholder}
                        className={clsx(
                            "w-full p-2",
                            "text-xs text-base-700 tracking-wide font-medium",
                            "bg-base-0 dark:bg-base-50 !rounded-none outline-none",
                            "field-hover dark:focus:bg-gray-800/10 focus:text-blue-500"
                        )}
                    />
                    {props.suffix &&
                        <span className="p-2 text-xs text-base-500 tracking-wide font-medium bg-base-100 entry-border-l">
                            {props.suffix}
                        </span>
                    }
                </div>
            }
            state={props.state}
        />
    )
}