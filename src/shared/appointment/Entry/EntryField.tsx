import { InputState } from "@/features/Form/useForm/Input";
import { CircleQuestionMarkIcon } from "lucide-react";
import { Fragment, ReactNode, useState } from "react";
import { Tooltip } from "react-tooltip";

export interface EntryFieldProps {
    label: ReactNode;
    input: ReactNode;
    state?: InputState;
    tip?: ReactNode;
}

export default function EntryField(props: EntryFieldProps) {
    return (
        <Fragment>
            <div className="w-full entry-size entry-padding entry-border-b entry-border-r">
                <div className="w-full flex gap-2 items-center justify-center">  
                    <span className="block entry-text text-center">
                        {props.label}
                    </span>
                    {props.tip &&
                        <Fragment>
                            <CircleQuestionMarkIcon
                                id={`${props.label}-ToolTip`}
                                className="size-3 stroke-base-700"
                            />
                            <Tooltip
                                anchorSelect={`#${props.label}-ToolTip`}
                                opacity={1}
                                place="bottom"
                                border="1px solid var(--base-0300)"
                                style={{
                                    display: "flex",
                                    gap: "0rem",
                                    borderRadius: "6px",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    boxShadow: "0px 2px 2px 0px #00000010"
                                }}
                                className="!bg-base-0 max-w-[200px] !flex dark:!hidden"
                            >
                                <h6 className="text-[0.6rem] tracking-wide text-center text-base-500 dark:text-base-400">
                                    {props.tip}
                                </h6>
                            </Tooltip> 
                            <Tooltip
                                anchorSelect={`#${props.label}-ToolTip`}
                                opacity={1}
                                place="bottom"
                                border="1px solid var(--base-0200)"
                                style={{
                                    display: "flex",
                                    gap: "0rem",
                                    borderRadius: "6px",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    boxShadow: "0px 2px 2px 0px #00000010"
                                }}
                                className="!bg-base-50 max-w-[200px] !hidden dark:!flex"
                            >
                                <h6 className="text-[0.6rem] tracking-wide text-center text-base-400">
                                    {props.tip}
                                </h6>
                            </Tooltip> 
                        </Fragment>
                    }
                </div>
            </div>
            <div className="w-full grid grid-rows-[auto_min-content]">
                <span className="block entry-size entry-text entry-border-b">
                    {props.input} 
                </span>
                {props.state?.[0] === false &&
                    <span className="bg-red-100 dark:bg-red-500/10 text-red-500 text-xs tracking-wide entry-padding !py-1 entry-border-b">
                        {props.state[1]}
                    </span>
                }
            </div>
        </Fragment>
    )
}