import { DB_AppointmentOverview } from "@/database/Types";
import { useEffect, useState } from "react";

interface HeadCheckboxProps {
    checked: Array<string>;
    appointments: Array<DB_AppointmentOverview>;
    updateChecked: (checked: Array<string>) => any;
}

export default function HeadCheckbox(props: HeadCheckboxProps) {
    const [uncheckedAppointmentIDs, setUncheckedAppointmentIDs] = useState(props.appointments.map(apt => apt.AppointmentID).filter(aptID => !props.checked.includes(aptID)).length);

    useEffect(() => {
        setUncheckedAppointmentIDs(props.appointments.map(apt => apt.AppointmentID).filter(aptID => !props.checked.includes(aptID)).length);
    }, [...props.appointments]);

    const updateChecked = () => {
        if (!props.checked.length)
            props.updateChecked(props.appointments.map(app => app.AppointmentID));
        else
            props.updateChecked([]);
    }

    return (
        <input
            type='checkbox'
            checked={!!props.appointments.length && !uncheckedAppointmentIDs}
            onChange={updateChecked}
        />
    )
}