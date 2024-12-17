import { Dropdown } from "@/components/input/export";
import { Months, Years } from "@/process/Employee/Calendar/Constant";

interface SearchProps {
    year: number;
    month: number;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
}

export default function Search(props: SearchProps) {
    return (
        <div>
            <Dropdown
                name='year'
                selectedValues={[props.year]}
                values={Years.map(y => [y, y.toString()])}
                label='Select a Year'
                defaultLabel='Years'
                onChange={(name, value) => {
                    props.onYearChange(value);
                }}
            />
            <Dropdown
                name='month'
                selectedValues={[props.month]}
                values={Months.map((m, i) => [i, m])}
                label='Select a Month'
                defaultLabel='Months'
                onChange={(name, value) => {
                    props.onMonthChange(value);
                }}
            />
        </div>
    )
}