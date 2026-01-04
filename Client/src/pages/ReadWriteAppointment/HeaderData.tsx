export default function HeaderData(props: any) {
    return (
        <div className="w-full px-2 py-2 border-r border-base-300 dark:border-base-200 last:border-r-0">
            <span className="block text-xs text-base-500 tracking-wide">
                {props.k}
            </span>
            <span className="block text-xs text-base-700 tracking-wide font-medium">
                {props.v}
            </span>
        </div>
    )
}