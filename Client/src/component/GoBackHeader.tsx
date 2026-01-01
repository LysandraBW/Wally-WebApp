import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import Logo from "@/component/NavBar/Logo";
import clsx from "clsx";
import IconButton from "./Button/IconButton";

export default function GoBackHeader(props: {onGoBack: () => void;}) {
    return (
        <div className="grid grid-cols-3 items-center h-min gap-1 max-sm:flex max-sm:justify-between">
            <div>
                <IconButton 
                    size={12}
                    className="!shadow-none"
                    onClick={props.onGoBack}
                >
                    <ArrowLongLeftIcon/>
                </IconButton>
            </div>
        </div>
    )
}