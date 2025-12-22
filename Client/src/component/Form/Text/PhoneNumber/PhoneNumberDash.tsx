import MinusIcon from "@/component/Icon/Icons/MinusIcon";
import clsx from "clsx";

export default function PhoneNumberDash(props: {error: boolean}) {
    return (
        <MinusIcon
            class={clsx(
                "w-4 h-4 stroke-base-500 stroke-[2.5px]",
                props.error && "stroke-red-500"
            )}
        />
    )
}