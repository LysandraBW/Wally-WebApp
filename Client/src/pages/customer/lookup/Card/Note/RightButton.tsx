import ArrowRight from "@/component/Icon/ArrowRight";

interface RightButton {
    onClick: () => void;
}

export default function RightButton(props: RightButton) {
    return (
        <button 
            onClick={props.onClick}
            className="!w-min border-none flex flex-col gap-1 cursor-pointer"
        >
            <div className="w-min p-1 rounded field simple clickable bg-white cursor-pointer">
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