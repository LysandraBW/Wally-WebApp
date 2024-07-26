import { DB_AppointmentOverview } from "@/lib/Database/Types";
import { goTo } from "@/lib/Navigation/Redirect";

interface OverviewProps {
    app: DB_AppointmentOverview
    close: () => any;
}

export default function Overview(props: OverviewProps) {
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
                <button onClick={() => {
                    goTo(`/Employee/Dashboard/Update?AppID=${props.app.AppointmentID}`);
                }}>
                    Update Appointment
                </button>
            </div>
        </div>
    )
}