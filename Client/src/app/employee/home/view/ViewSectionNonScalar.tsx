import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import { Fragment, ReactNode } from "react";

export function ViewSectionNonScalar({head, data}: {
    head: string;
    data: Array<ReactNode>;
}) {

    const arrN = (n: number) => {
        const arr = [];
        for (let i = 0; i < n; i++)
            arr.push(i);
        return arr;
    }


    return (
        <EntryCells
            label={head}
            cells={
                <>
                    {
                        data.map((item, i) => (
                            <Fragment key={i}>
                                <Cell>
                                    {item}
                                </Cell>
                            </Fragment>
                        ))
                    }
                    <PaddingCells
                        offset={0}
                        numberCells={data.length}
                    />
                </>
            }
        />
    )
}