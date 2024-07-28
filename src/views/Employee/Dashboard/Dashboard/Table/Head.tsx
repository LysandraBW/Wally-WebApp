import { DB_AppointmentOverview } from "@/lib/Database/Types";
import { FilterStructure } from "@/process/Employee/Dashboard/Form";

interface HeadProps {
    filter: FilterStructure;
    updateFilter: (filter: FilterStructure) => any;   
    checked: Array<string>;
    current: Array<DB_AppointmentOverview>;
    setChecked: (checked: Array<string>) => any;
}

export default function Head(props: HeadProps) {
    const updateColumnSort = async (columnName: string) => {
        const map = (v: any) => {
            if (v === 0) return null;
            if (v === 1) return 0;
            return 1;
        }

        const updatedFilter = {
            ...props.filter,
            [`${columnName}`]: map([props.filter[`${columnName}`]])
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
                        checked={!!props.current.length && !props.current.map(app => app.AppointmentID).filter(appID => !props.checked.includes(appID)).length}
                        onChange={() => {
                            if (!props.checked.length)
                                props.setChecked(props.current.map(app => app.AppointmentID));
                            else
                                props.setChecked([]);
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