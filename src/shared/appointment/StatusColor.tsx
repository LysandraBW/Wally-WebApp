import clsx from "clsx";

export default function StatusColor(props: {status: string}) {
    return (
        <div 
            className={clsx(
                "w-1 h-1",
                props.status === "Pending" && "bg-yellow-400",
                props.status === "Scheduled for Evaluation" && "bg-lime-500",
                props.status === "Scheduled for Service" && "bg-green-500",
                props.status === "In Evaluation" && "bg-cyan-500",
                props.status === "In Service" && "bg-blue-500",
                props.status === "Completed" && "bg-indigo-600",
            )}
        
        />
    )
}