import clsx from "clsx";
import ButtonProps from "./_DEF";

interface CallToActionButtonProps extends ButtonProps {
    label: string;
}

export default function CallToActionButton(props: CallToActionButtonProps) {
    return (
        <div
            onClick={props.onClick}
            className={clsx(
                "border-beam-wrapper [--parent-width:108px] [--parent-height:36px]",
                "bg-blue-500",
                "rounded-[12px]",
                "transition-all",
                "shadow-[0px_0px_5px_0px_hsl(217deg_91%_60%/17%),0px_5px_5px_2px_hsl(217deg_100%_60%/14%),0px_10px_5px_5px_hsl(217deg_100%_60%/8%)]",
                "dark:shadow-[0px_0px_5px_0px_hsl(231deg_48%_48%/17%),0px_5px_5px_2px_hsl(231deg_100%_48%/20%),0px_10px_5px_5px_hsl(231deg_100%_48%/10%)]",
                props.class
            )}
        >
            <button className="border-beam-content bg-blue-700 hover:bg-[#0b42d9] rounded-[11px] transition-all">
                <h6 className="text-md font-medium text-white">
                    {props.label}
                </h6>
            </button>
        </div>
    )
}