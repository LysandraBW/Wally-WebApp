import { DB_AppointmentOverview } from "@/database/Types";
import { FilterType } from "@/process/Employee/Dashboard/Controller";
import { updateSortDirection } from "@/process/Employee/Dashboard/Helper";
import ColumnDirection from "./ColumnDirection";
import HeadCheckbox from "./HeadCheckbox";

interface HeadProps {
    appointments: Array<DB_AppointmentOverview>;
    filter: FilterType;
    checked: Array<string>;
    updateChecked: (checked: Array<string>) => any;
    updateFilter: (filter: FilterType) => any;   
}

export default function Head(props: HeadProps) {
    const sortableColumnNames = [['First Name', 'FName'], ['Last Name', 'LName'], ['Make', 'Make'], ['Model', 'Model'], ['Model Year', 'ModelYear'], ['Creation Date', 'CreationDate'], ['Start Date', 'StartDate'], ['End Date', 'EndDate'], ['Cost', 'Cost']];
    const unsortableColumnNames = [['VIN', 'VIN'], ['Mileage', 'Mileage'], ['License Plate', 'LicensePlate'], ['Status', 'Status']];

    const updateColumnDirection = async (columnName: string) => {
        const updatedFilter = Object.assign({}, props.filter, {[`${columnName}`]: updateSortDirection(props.filter[`${columnName}`])})
        await props.updateFilter(updatedFilter);
    }

    return (
        <thead>
            <tr>
                <td>
                    <HeadCheckbox
                        checked={props.checked}
                        appointments={props.appointments}
                        updateChecked={props.updateChecked}
                    />
                </td>
                <td></td>
                <td></td>
                {sortableColumnNames.map((columnName, i) => (
                    <td 
                        key={i}
                        onClick={() => updateColumnDirection(columnName[1])}
                    >
                        <span>{columnName[0]}</span>
                        <ColumnDirection 
                            sortDirection={props.filter[`${columnName[1]}`]}
                        />
                    </td>
                ))}
                {unsortableColumnNames.map((columnName, i) => (
                    <td key={i}>{columnName[0]}</td>
                ))}
                <td></td>
            </tr>
        </thead>
    )
}