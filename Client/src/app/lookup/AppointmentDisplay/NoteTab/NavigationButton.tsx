import ArrowLeft from "@/component/Icon/Icons/ArrowRight";
import ArrowRight from "@/component/Icon/Icons/ArrowLeft";

interface NavigationButtonProps {
    onClick: () => void;
    direction: "L" | "R";
}

export default function NavigationButton(props: NavigationButtonProps) {
    return (
        <button 
            onClick={props.onClick}
            className="!w-min flex flex-col gap-1 border-none cursor-pointer"
        >
            <div className="w-min p-1 field bg-white rounded cursor-pointer">
                {props.direction === "L" &&
                    <ArrowLeft
                        width="13"
                        height="13"
                        cursor="pointer"
                        stroke="#C3C3C3"
                        strokeWidth="0.5"
                    />
                }
                {props.direction === "R" &&
                    <ArrowRight
                        width="13"
                        height="13"
                        cursor="pointer"
                        stroke="#C3C3C3"
                        strokeWidth="0.5"
                    />
                }
            </div>
        </button>
    )
}