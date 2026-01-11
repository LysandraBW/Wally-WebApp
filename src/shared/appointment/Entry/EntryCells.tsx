import { Fragment, ReactNode } from "react";

interface EntryCellsProps {
    label: string;
    cells: ReactNode;
}

export default function EntryCells(props: EntryCellsProps) {
    return (
        <Fragment>
            <span className="block entry-size entry-padding entry-text text-center entry-border-b entry-border-r">
                {props.label}
            </span>
            <span className="block entry-size entry-text entry-border-b grid grid-cols-5 auto-rows-[100px] !overflow-y-visible">
                {props.cells}
            </span>
        </Fragment>
    )
}