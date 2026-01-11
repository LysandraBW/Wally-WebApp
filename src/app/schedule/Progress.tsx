import ProgressBar from "./ProgressBar";

export default function Progress(props: {step: number; header: string;}) {
    return (
        <div className="p-[1px] bg-gradient-to-b from-blue-500 to-base-0  rounded-md">
            <div className="py-4 px-4 rounded-[6px] bg-gradient-to-b from-blue-100 dark:from-base-50 !to-base-0 flex flex-col gap-2">
                <div className="relative">
                    <span className="mb-1 block leading-[0.75rem] text-xs text-blue-500 dark:text-base-400">
                        STEP {props.step + 1}
                    </span>
                    <h6 className="leading-[1rem] font-medium text-blue-500 dark:text-white text-sm tracking-wide">
                        {props.header}
                    </h6>
                </div>
                <div className="h-2.5 flex justify-between gap-2">
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
        </div>
    )
}