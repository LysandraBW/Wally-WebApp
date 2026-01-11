import Cell from "@/shared/appointment/Cell/Cell";
import PaddingCells from "@/shared/appointment/Cell/PaddingCells";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import { Fragment, ReactNode } from "react";

export function ViewSectionNonScalar({head, data}: {
    head: string;
    data: Array<ReactNode>;
}) {

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