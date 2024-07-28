import { getSessionID } from "@/lib/Cookies/Cookies";
import { GetAppointment } from "@/lib/Database/Export";
import { DB_Appointment, DB_AppointmentOverview } from "@/lib/Database/Types";
import { goTo } from "@/lib/Navigation/Redirect";
import { useEffect, useState } from "react";

interface OverviewProps {
    app: DB_AppointmentOverview
    close: () => any;
}

export default function Overview(props: OverviewProps) {
    const [appData, setAppData] = useState<DB_Appointment>();

    useEffect(() => {
        const load = async () => {
            const appData = await GetAppointment({
                SessionID: await getSessionID(),
                AppointmentID: props.app.AppointmentID
            });
            console.log(appData);
            if (!appData)
                return;
            setAppData(appData);
        }
        load();
    }, []);

    return (
        <div>
            <div onClick={() => props.close()}>x</div>
            <div>
                <div>{props.app.FName} {props.app.LName}</div>
                <div>{props.app.ModelYear} {props.app.Make} {props.app.Model}</div>
                <div>{props.app.CreationDate && props.app.CreationDate.toString()}</div>
                <div>{props.app.UpdationDate && props.app.UpdationDate.toString()}</div>
                <div>{props.app.StartDate && props.app.StartDate.toString()}</div>
                <div>{props.app.EndDate && props.app.EndDate.toString()}</div>
                <div>{props.app.Cost}</div>
                <div>{props.app.VIN}</div>
                <div>{props.app.Mileage}</div>
                <div>{props.app.LicensePlate}</div>
                <div>{props.app.Status}</div>
                <div>
                    {appData && appData.Notes.map((note, i) => (
                        <div key={i}>
                            <h1>{note.Head}</h1>
                            <p>{note.Body}</p>
                            {note.Attachments.map((attachment, i) => (
                                <div>
                                    {attachment.URL}
                                    <img key={i} src={attachment.URL}/>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={() => {
                    goTo(`/Employee/Dashboard/Update?AppID=${props.app.AppointmentID}`);
                }}>
                    Update Appointment
                </button>
            </div>
        </div>
    )
}