import { Fragment, useEffect, useState } from "react";
import Cell from "./Cell";

export const generateNArray = (n: number) => {
    const arr = [];
    for (let i = 0; i < n; i++)
        arr.push(i);
    return arr;
}

export default function PaddingCells(props: {numberCells: number; offset?: number}) {
    const [nArray, setNArray] = useState<Array<number>>([]);

    useEffect(() => {
        const n = props.numberCells + (props.offset || 0);
        if (n <= 10)
            setNArray(generateNArray(10 - n));
        else
            setNArray(generateNArray(n % 5));
    }, []);

    return (
        <>
            {
                nArray.map((i) => (
                    <Fragment key={i}>
                        <Cell>
                            <></>
                        </Cell>
                    </Fragment>
                ))
            }
        </>
    )
}