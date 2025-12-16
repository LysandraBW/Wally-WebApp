import clsx from "clsx";

export default function Flag(props: {seen: boolean, flagged: boolean, markAsFlagged: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "p-2 !border-l-0 border-r border-r-gray-300 border-b border-b-gray-300 cursor-pointer",
                !props.seen && "bg-white"
            )}
            onClick={props.markAsFlagged}
        >
            {!props.flagged &&
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" strokeWidth="1.25" fill="currentColor" className="bi bi-bookmark-fill fill-white stroke stroke-gray-300 cursor-pointer" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                </svg>
            }
            {props.flagged &&
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" className=" bi bi-bookmark-fill fill-red-500 stroke-red-600 cursor-pointer" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                </svg>
            }
        </div>
    )
}