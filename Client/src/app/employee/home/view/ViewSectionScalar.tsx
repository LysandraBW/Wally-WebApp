import EntryRead from "@/shared/ReadWriteAppointment/Entry/EntryRead";
import { Fragment, ReactNode } from "react";

export default function ViewSectionScalar({data}: {
    data: Array<[ReactNode, ReactNode]>;
}) {
    return (
        <Fragment>
            {data.map(([key, value], i) => (
                <Fragment key={i}>
                    <EntryRead
                        label={key}
                        value={value}
                    />
                </Fragment>
            ))}
        </Fragment>
    )
}