import { InputState } from "@/features/Form/useForm/Input";
import { Fragment, ReactNode } from "react";

interface EntryFieldProps {
    label: ReactNode;
    input: ReactNode;
    state?: InputState;
}

export default function EntryField(props: EntryFieldProps) {
    return (
        <Fragment>
            <span className="block entry-size entry-padding entry-text text-center entry-border-b entry-border-r">
                {props.label}
            </span>
            <span className="block entry-size entry-text entry-border-b">
                {props.input}
            </span>
        </Fragment>
    )
}