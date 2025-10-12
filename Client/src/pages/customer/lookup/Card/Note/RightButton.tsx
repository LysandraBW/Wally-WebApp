import ArrowRight from "@/component/Icon/ArrowRight";
import clsx from "clsx";

interface RightButton {
    onClick: () => void;
}

export default function RightButton(props: RightButton) {
    return (
        <button 
            onClick={props.onClick}
            className={clsx(
                "!w-min",
                "flex flex-col gap-1",
                "border-none",
                "cursor-pointer"
            )}
        >
            <div 
                className={clsx(
                    "w-min p-1",
                    "field simple clickable",
                    "bg-white",
                    "rounded",
                    "cursor-pointer"
                )}
            >
                <ArrowRight
                    width="13"
                    height="13"
                    cursor="pointer"
                    stroke="#C3C3C3"
                    strokeWidth="0.5"
                />
            </div>
        </button>
    )
}