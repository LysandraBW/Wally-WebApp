import { Dropdown } from "@/components/Input/Export";
import { Months, Years } from "@/process/Calendar/Helper";

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
                value={[props.year]}
                values={Years.map(y => [y, y.toString()])}
                label='Select a Year'
                defaultLabel='Years'
                onChange={(name, value) => {
                    props.onYearChange(value);
                }}
            />
            <Dropdown
                name='month'
                value={[props.month]}
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