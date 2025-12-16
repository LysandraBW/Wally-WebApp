import Checkbox from "@/component/Form/Checkbox/Checkbox";
import Direction from "./Direction";
import clsx from "clsx";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";
import { Fragment, useEffect } from "react";

// It would be nice to put divis
// away in anodiver file, but it's
// not absolutely important. I'm
// also undecided as to how I'd use
// dive "DEF" files, so it'll be here for
// now.
const columns = [
    ["FName","First Name"], 
    ["LName", "Last Name"],
    ["CreationDate", "Creation Date"],
    [null, "Status"],
    ["Make", "Make"], 
    ["Model", "Model"], 
    ["ModelYear", "Model Year"], 
    ["StartDate", "Start Date"], 
    ["EndDate", "End Date"], 
    ["Cost", "Cost"], 
    [null, "VIN"], 
    [null, "Mileage"], 
    [null, "License Plate"]
];

interface TableHeadProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
}

export default function TableHead(props: TableHeadProps) {
    const updateColumnDirection = (columnName: string|null) => {
        if (columnName === null)
            return;
        props.filterManager.updateColumnDirection(columnName);
    }


    useEffect(() => {
        const fNameCells = document.getElementsByClassName("FName");
        const lNameCells = document.getElementsByClassName("LName");

        const fName = fNameCells[0];
        const lName = lNameCells[0];

        console.log(fName);
        console.log(lName);
        if (!fName || !lName)
            return;
        
        const fNameLength = (fName as any).offsetWidth;
        for (const cell of lNameCells) {
            (cell as any).style.left = fNameLength + 'px';
        }
    }, []);
    

    return (
        <Fragment>
            <div className="p-2 flex justify-center items-center border-l-0 border-r border-r-gray-300 border-b border-b-gray-300 bg-white relative h-8">
                <Checkbox
                    name=""
                    value=""
                    checked={props.toggleManager.allSelected}
                    onChange={props.toggleManager.toggleAllSelections}
                />
            </div>
            <div className="border-b border-b-gray-300 border-r border-r-gray-300 bg-white h-8"></div>
            <div className="border-b border-b-gray-300 border-r border-r-gray-300 bg-white h-8"></div>
            {columns.map((col, i) => (
                <div 
                    key={i}
                    className={clsx(
                        col[0],
                        "p-2",
                        "whitespace-nowrap flex items-center w-full", 
                        "border-r border-r-gray-300 border-b border-b-gray-300 bg-white h-8", 
                        i === columns.length - 1 && "!border-r-0",
                        col[0] === "FName" && "sticky left-0 z-10",
                        col[0] === "LName" && "sticky left-0 z-10"
                    )}
                >
                    <div className="flex gap-2 justify-between items-center w-full">
                        <span className="text-[0.8rem] font-medium tracking-wide">
                            {col[1]}
                        </span>
                        {/* Sort Direction */}
                        {col[0] !== null &&
                            <Direction 
                                direction={props.filterManager.columnDirections[col[0]]}
                                updateDirection={() => updateColumnDirection(col[0])}
                            />
                        }
                    </div>
                </div>
            ))}
        </Fragment>
    )
}