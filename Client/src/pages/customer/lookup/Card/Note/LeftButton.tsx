import ArrowLeft from "@/component/Icon/ArrowLeft";

interface LeftButton {
    onClick: () => void;
}

export default function LeftButton(props: LeftButton) {
    return (
        <button 
            onClick={props.onClick}
            className="!w-min border-none flex flex-col gap-1 cursor-pointer"
        >
            <div className="w-min p-1 rounded field simple clickable bg-white cursor-pointer">
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