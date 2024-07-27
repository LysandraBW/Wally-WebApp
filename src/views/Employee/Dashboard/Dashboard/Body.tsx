import Appointment from "./Appointment";
import { UpdateLabel } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { DB_AppointmentOverview, DB_EmployeeLabels, DB_Label } from "@/lib/Database/Types";
import { updateLabels } from "@/lib/Database/Appointment/Label/Helper";

interface BodyProps {
    search: string;
    setOpen: (app: DB_AppointmentOverview) => void;
    current: Array<DB_AppointmentOverview>;
    deleteHandler: (IDs: Array<string>) => void;
    checked: Array<string>;
    setChecked: (checked: Array<string>) => any;
    labelMeta: {[labelName: string]: DB_Label};
    allLabels: DB_EmployeeLabels;
    setLabels: (label: DB_EmployeeLabels) => any;
}

export default function Body(props: BodyProps) {
    const highlightEntry = (entry: string): React.ReactNode => {
        if (!entry || !props.search)
            return entry;

        const upperEntry = entry.toUpperCase();
        const upperSearch = props.search.toUpperCase();

        if (upperEntry.includes(upperSearch))
            return entry;

        const index = upperEntry.indexOf(upperSearch);

        const lString = entry.substring(0, index);
        const rString = entry.substring(index + props.search.length);
        const mString = entry.substring(index, index + props.search.length);

        return (
            <span>
                {lString}<b>{mString}</b>{rString}
            </span>
        )
    }

    const checkApp = (appID: string) => {
        let updatedValue = [...props.checked];
        const index = props.checked.indexOf(appID);

        if (index > -1) updatedValue.splice(index, 1);
        else            updatedValue.push(appID);

        props.setChecked(updatedValue);
    }

    const updateLabel = async (appID: string, labelName: string) => {
        let labelID = props.labelMeta[`${labelName}`].LabelID
        if (labelID === -1) 
            return;

        const updatedLabels = await updateLabels({...props.allLabels}, appID, labelID); 
        const output = await UpdateLabel({SessionID: await getSessionID(), AppointmentID: appID, LabelID: labelID});
        if (!output)
            return;

        props.setLabels(updatedLabels);
    }

    return (
        <tbody>
            {props.current.map((app, i) => (
                <tr 
                    key={app.AppointmentID}
                    onClick={() => props.setOpen(app)}
                >
                    <Appointment
                        app={app}
                        updateLabel={updateLabel}
                        labelMeta={props.labelMeta}
                        labels={props.allLabels[`${app.AppointmentID}`] || []}
                        highlight={highlightEntry}
                        checkAppointment={checkApp}
                        checked={props.checked.includes(app.AppointmentID)}
                        deleteAppointment={props.deleteHandler}
                    />  
                </tr>                  
            ))}
        </tbody>
    )
}