import { DB_AppointmentOverview } from "@/database/Types";
import { FilterStructure } from "@/process/Employee/Dashboard/Interface";

interface HeadProps {
    currentAppointments: Array<DB_AppointmentOverview>;
    checkedAppointments: Array<string>;
    updateChecked: (checked: Array<string>) => any;
    filter: FilterStructure;
    updateFilter: (filter: FilterStructure) => any;   
}

export default function Head(props: HeadProps) {
    const columnSortChange = (v: any) => {
        if (v === 0) 
            return null;
        if (v === 1) 
            return 0;
        return 1;
    }

    const updateColumnSort = async (columnName: string) => {
        const updatedFilter = {
            ...props.filter,
            [`${columnName}`]: columnSortChange(props.filter[`${columnName}`])
        }

        await props.updateFilter(updatedFilter);
    }

    const columnSortIcon = (columnName: string) => {
        if (props.filter[columnName] === 1) 
            return '∧';
        else if (props.filter[columnName] === 0) 
            return '∨';
        return '-';
    }

    return (
        <thead>
            <tr>
                <td>
                    <input 
                        type='checkbox'
                        checked={!!props.currentAppointments.length && !props.currentAppointments.map(app => app.AppointmentID).filter(appID => !props.checkedAppointments.includes(appID)).length}
                        onChange={() => {
                            if (!props.checkedAppointments.length)
                                props.updateChecked(props.currentAppointments.map(app => app.AppointmentID));
                            else
                                props.updateChecked([]);
                        }}
                    />
                </td>
                <td></td>
                <td></td>
                <td onClick={() => updateColumnSort("FName")}>FName {columnSortIcon('FName')}</td>
                <td onClick={() => updateColumnSort("LName")}>LName {columnSortIcon('LName')}</td>
                <td onClick={() => updateColumnSort("Make")}>Make {columnSortIcon('Make')}</td>
                <td onClick={() => updateColumnSort("Model")}>Model {columnSortIcon('Model')}</td>
                <td onClick={() => updateColumnSort("ModelYear")}>ModelYear {columnSortIcon('ModelYear')}</td>
                <td onClick={() => updateColumnSort("CreationDate")}>CreationDate {columnSortIcon('CreationDate')}</td>
                <td onClick={() => updateColumnSort("StartDate")}>StartDate {columnSortIcon('StartDate')}</td>
                <td onClick={() => updateColumnSort("EndDate")}>EndDate {columnSortIcon('EndDate')}</td>
                <td onClick={() => updateColumnSort("Cost")}>Cost {columnSortIcon('Cost')}</td>
                <td>VIN</td>
                <td>Mileage</td>
                <td>License Plate</td>
                <td>Status</td>
                <td></td>
            </tr>
        </thead>
    )
}