import ArrowLeft from "@/component/Icon/ArrowLeft";
import clsx from "clsx";

interface LeftButton {
    onClick: () => void;
}

export default function LeftButton(props: LeftButton) {
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
                    // I cannot remember, for the life of me,
                    // what these classes were meant for.
                    // TODO: Figure it Out!
                    "field simple clickable",
                    "cursor-pointer",
                    "rounded",
                    "bg-white"
                )}
            >
                <ArrowLeft
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