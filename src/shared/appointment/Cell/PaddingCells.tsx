import { Fragment, useEffect, useState } from "react";
import Cell from "./Cell";

export const generateNArray = (n: number) => {
    const arr = [];
    for (let i = 0; i < n; i++)
        arr.push(i);
    return arr;
}

export function padArray<T>(arrLength: number, paddingValue: T): T[] {
    const arr: T[] = [];
    if (arrLength < 10) {
        return [...Array(10 - arrLength).fill(paddingValue)];
    }
  
    const remainder = arrLength % 5;
    if (remainder === 0) {
        return [];
    }
  
    const paddingNeeded = 5 - remainder;
    return [...Array(paddingNeeded).fill(paddingValue)];
}

export default function PaddingCells(props: {numberCells: number; offset?: number}) {
    const [nArray, setNArray] = useState<Array<number>>([]);

    useEffect(() => {
        const n = props.numberCells + (props.offset || 0);
        if (n <= 10)
            setNArray(generateNArray(10 - n));
        else
            setNArray(generateNArray(n % 5));
    }, [props.numberCells]);

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