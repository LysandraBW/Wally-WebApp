import MinusIcon from "@/component/Icons/Icons/MinusIcon";
import clsx from "clsx";

export default function PhoneNumberDash(props: {error: boolean}) {
    return (
        <MinusIcon
            class={clsx(
                "w-4 h-4 stroke-base-300 stroke-[1.5px]",
                props.error && "stroke-red-500"
            )}
        />
    )
}