import { Label } from "@/lib/Database/Info/Info";
import Appointment from "./Appointment";
import { QuickAppointment } from "@/lib/Database/Appointment/Appointment"
import { UpdateLabel } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Authorize/Authorize";

interface BodyProps {
    search: string;
    setOpen: (app: QuickAppointment) => void;
    current: Array<QuickAppointment>;
    deleteHandler: (IDs: Array<string>) => void;
    checked: Array<string>;
    setChecked: (checked: Array<string>) => any;
    metaLabel: {[labelName: string]: Label};
    allLabels: {[appID: string]: {[label: string]: number}};
    setLabels: (label: {[appID: string]: {[label: string]: number}}) => any;
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
        let labelID = props.metaLabel[`${labelName}`].LabelID
        if (labelID === -1) 
            return;

        let labelValue = props.allLabels[`${appID}`] ? props.allLabels[`${appID}`][`${labelName}`] || 0 : 0;

        const output = await UpdateLabel({SessionID: await getSessionID(), AppointmentID: appID, LabelID: labelID});
        if (!output)
            return;

        props.setLabels({
            ...props.allLabels,
            [`${appID}`]: {
                ...props.allLabels[`${appID}`],
                [`${labelName}`]: 1 - labelValue
            }
        });
    }

    return (
        <tbody>
            {props.current.map((app, i) => (
                <tr 
                    key={app.AppointmentID}
                    onClick={() => props.setOpen(app)}
                >
                    <Appointment
                        updateLabel={updateLabel}
                        labels={props.allLabels[`${app.AppointmentID}`] || {}}
                        app={app}
                        labelMeta={props.metaLabel}
                        highlight={highlightEntry}
                        checkAppointment={checkApp}
                        deleteAppointment={props.deleteHandler}
                        checked={props.checked.includes(app.AppointmentID)}
                    />  
                </tr>                  
            ))}
        </tbody>
    )
}