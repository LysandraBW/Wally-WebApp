import ArrowLeft from "@/component/Icon/ArrowLeft";
import clsx from "clsx";

interface BackProps {
    // goBack: () => void;
}

export default function Back(props: BackProps) {
    return (
        <div className="">
            <div className="">
                <ArrowLeft
                    width="12"
                    height="12"
                    strokeWidth="1"
                    cursor="pointer"
                />
            </div>
        </div>
    )
}