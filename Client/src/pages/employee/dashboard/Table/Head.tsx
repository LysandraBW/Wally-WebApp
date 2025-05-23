import Checkbox from "@/component/Form/Checkbox/Checkbox";
import Direction from "./Direction";
import clsx from "clsx";
import { FilterManager } from "../managers/useFilterManager";
import { ToggleManager } from "../managers/useToggleManager";

// It would be nice to put this
// away in another file, but it's
// not absolutely important. I'm
// also undecided as to how I'd use
// the "DEF" files, so it'll be here for
// now.
const columns = [
    ["FName","First Name"], 
    ["LName", "Last Name"], 
    ["Make", "Make"], 
    ["Model", "Model"], 
    ["ModelYear", "Model Year"], 
    ["CreationDate", "Creation Date"], 
    ["StartDate", "Start Date"], 
    ["EndDate", "End Date"], 
    ["Cost", "Cost"], 
    [null, "VIN"], 
    [null, "Mileage"], 
    [null, "License Plate"], 
    [null, "Status"]
];

interface TableHeadProps {
    filterManager: FilterManager;
    toggleManager: ToggleManager;
}

export default function TableHead(props: TableHeadProps) {
    return (
        <thead className="border-b border-gray-200">
            <tr>
                <th
                    className={clsx(
                        "px-2 !border-l-0",
                        "border-r border-r-gray-200"
                    )}
                >
                    <Checkbox
                        name=""
                        value=""
                        checked={props.toggleManager.allSelected}
                        onChange={props.toggleManager.toggleAllSelections}
                    />
                </th>
                {columns.map((col, i) => (
                    <th 
                        key={i}
                        onClick={() => {
                            if (col[0] === null)
                                return;
                            props.filterManager.updateColumnDirection(col[0]);
                        }}
                        className={clsx(
                            "p-2 whitespace-nowrap",
                            "border-r border-r-gray-200",
                            i == columns.length - 1 && "!border-r-0"
                        )}
                    >
                        <div 
                            className={clsx(
                                "flex gap-2",
                                "justify-between items-center"
                            )}
                        >
                            <span className="text-02 font-medium">
                                {col[1]}
                            </span>
                            {col[0] !== null &&
                                <Direction
                                    direction={props.filterManager.columnDirections[col[0]]}
                                />
                            }
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}