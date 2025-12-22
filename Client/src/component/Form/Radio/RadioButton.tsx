import clsx from "clsx";

export default function RadioButton(props: {checked: boolean}) {
    return (
        <div 
            className={clsx(
                "aspect-square w-3 h-3 p-0.5",
                "flex items-center justify-center",
                "surface border rounded-full",
                props.checked && "!bg-blue-500 !border-blue-500"
            )}
        >
            {props.checked &&
                <div className="w-1.5 h-1.5 aspect-square bg-white rounded-full"/>
            }
        </div>
    )
}