import { Options } from "@/features/Form/DEF";
import StatusPairs from "@/services/DB/Procedure/Pairs/StatusPairs";
import { useEffect, useState } from "react";

export type Bit = "0"|"1";
export type FilterManager = ReturnType<typeof useFilterManager>;
export interface ColumnDirections {[columnName: string]: Bit|null;};

export default function useFilterManager() {
    const [search, setSearch] = useState("");
    const [deleted, setDeleted] = useState<Bit>("0");
    const [statusID, setStatusID] = useState<string|null>(null);
    const [statuses, setStatuses] = useState<Options>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [maxPageIndex, setMaxPageIndex] = useState(0);
    const [stringPageIndex, setStringPageIndex] = useState("");
    const [columnDirections, setColumnDirections] = useState<ColumnDirections>({});
    
    useEffect(() => {
        const load = async () => {
            const statuses = await StatusPairs();
            console.log(statuses);
            setStatuses([[null, "All"], ...statuses, ["-1", "Deleted"]]);
        }
        load();
    }, []);

    useEffect(() => {
        setStringPageIndex((pageIndex + 1).toString());
    }, [pageIndex]);

    const goToNextPage = () => {
        goToPage(pageIndex + 1);
    }

    const goToPrevPage = () => {
        goToPage(pageIndex - 1);
    }

    const goToPage = (pageIndex: number) => {
        if (pageIndex < 0 || pageIndex > maxPageIndex)
            return;
        setPageIndex(pageIndex);
    }

    const fixStringPageIndex = () => {
        const onlyDigits = /^\d+$/.test(stringPageIndex);
        if (!onlyDigits) {
            setStringPageIndex((pageIndex+1).toString());
            return;
        }

        let pIndex = parseInt(stringPageIndex) - 1;
        if (pIndex === pageIndex)
            return;

        pIndex = Math.min(Math.max(0, pIndex), maxPageIndex);
        goToPage(pIndex);
    }

    const updateStringPageIndex = (stringPageIndex: string) => {
        setStringPageIndex(stringPageIndex);
        const onlyDigits = /^\d+$/.test(stringPageIndex);
        if (!onlyDigits)
            return;

        const pageIndex = parseInt(stringPageIndex) - 1;
        goToPage(pageIndex);
    }

    const updateMaxPageIndex = (numberAppointments: number) => {
        const maxPageIndex = Math.ceil(numberAppointments/pageLength) - 1;
        setMaxPageIndex(maxPageIndex);
    }

    const updateColumnDirection = (columnName: string) => {
        const directionCycle = {"0": "1", "1": "-1", "-1": "0"};
        if (!columnName)
            return;
        const updatedColumnDirections = {...columnDirections};
        let nextDirection: any = directionCycle[columnDirections[columnName] || "-1"];
        if (nextDirection === "-1")
            nextDirection = null;
        updatedColumnDirections[columnName] = nextDirection;
        setColumnDirections(updatedColumnDirections);
    }

    const updateStatus = (statusID: null|string) => {
        // Deleted Status
        if (statusID === "-1")
            setDeleted("1");
        else
            setDeleted("0");
        setStatusID(statusID);
    }

    const filter = () => {
        return {
            search,
            deleted,
            statusID: 
                statusID === "-1" || statusID === null ? null : statusID,
            ...columnDirections,
            pageSize: pageLength,
            pageNumber: pageIndex
        }
    }

    return {
        search,
        deleted,
        statusID,
        statuses,
        pageIndex,
        pageLength,
        maxPageIndex,
        stringPageIndex,
        columnDirections,
        filter,
        goToNextPage,
        goToPrevPage,
        fixStringPageIndex,
        updateStringPageIndex,
        updateMaxPageIndex,
        updateColumnDirection,
        setSearch,
        setDeleted,
        setStatusID: updateStatus
    }
}