import ProgressBar from "./ProgressBar";

export default function Progress(props: {step: number; header: string;}) {
    return (
        <div className="px-0 py-8 pt-5 border-y border-base-300 dark:border-base-200 flex flex-col gap-2">
            <div className="relative">
                <span 
                    className="mb-1 block leading-[0.75rem] text-xs text-base-500" 
                >
                    STEP {props.step + 1}
                </span>
                <h6 
                    className="leading-[1rem] font-medium text-base-900 text-base tracking-wide"
                >
                    {props.header}
                </h6>
            </div>
            <div className="h-2 flex justify-between gap-2">
                <ProgressBar
                    id="bar0"
                    rank={0}
                    step={props.step}
                    tooltipLabel="Contact Information"
                    canShowTooltip={props.step > 0}
                />
                <ProgressBar
                    id="bar1"
                    rank={1}
                    step={props.step}
                    tooltipLabel="Vehicle Information"
                    canShowTooltip={props.step > 1}
                />
                <ProgressBar
                    id="bar2"
                    rank={2}
                    step={props.step}
                    tooltipLabel="Service Information"
                    canShowTooltip={props.step > 2}
                />
            </div>
        </div>
    )
}