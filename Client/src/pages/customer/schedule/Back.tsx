import ArrowLeft from "@/component/Icon/ArrowLeft";
import clsx from "clsx";

interface BackProps {
    // goBack: () => void;
}

export default function Back(props: BackProps) {
    return (
        <div className="pl-2 pb-2 border-b border-gray-200">
            <div className="icon">
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