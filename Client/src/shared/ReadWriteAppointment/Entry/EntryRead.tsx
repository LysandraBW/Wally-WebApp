import { Fragment, ReactNode } from "react";

interface EntryCellsProps {
    label: ReactNode;
    value: ReactNode;
}

export default function EntryRead(props: EntryCellsProps) {
    return (
        <Fragment>
            <span className="block entry-size entry-padding entry-text text-center entry-border-b entry-border-r">
                {props.label}
            </span>
            <span className="block entry-size entry-padding entry-text entry-border-b">
                {props.value}
            </span>
        </Fragment>
    )
}