import { DB_AppointmentSummary } from "@/database/Types";
import { toString } from "@/lib/Helper";

interface AptSummaryProps {
    info: DB_AppointmentSummary;
}

export default function AptSummary(props: AptSummaryProps) {
    return (
        <div>
            <b><i>Summary</i></b>
            <div>{props.info.AppointmentID}</div>
            <div>{props.info.CreationDate.toString()}</div>
            <div>{props.info.UpdationDate.toString()}</div>
            <div>{props.info.CustomerID}</div>
            <div>{props.info.FName}</div>
            <div>{props.info.LName}</div>
            <div>{props.info.Email}</div>
            <div>{props.info.Phone}</div>
            <div>{toString(props.info.StartDate)}</div>
            <div>{toString(props.info.EndDate)}</div>
            <div>{props.info.Status}</div>
            <div>{props.info.Make}</div>
            <div>{props.info.Model}</div>
            <div>{props.info.ModelYear}</div>
            <div>{props.info.VIN}</div>
            <div>{props.info.LicensePlate}</div>
            <div>{props.info.Mileage}</div>
            <div>{props.info.Cost}</div>
            <div><b>Services</b></div>
            {props.info.Services.map((Service, i) => (
                <div key={i}>
                    {Service.Service}
                </div>
            ))}
            <div><b>Diagnosis</b></div>
            {props.info.Diagnoses.map((Diagnosis, i) => (
                <div key={i}>{Diagnosis.Code} {Diagnosis.Message}</div>
            ))}
            <div><b>Repairs</b></div>
            {props.info.Repairs.map((Repair, i) => (
                <div key={i}>
                    {Repair.Repair}
                </div>
            ))}
            <div><b>Notes</b></div>
            {props.info.Notes.map((Note, i) => (
                <div key={i}>
                    {Note.Head}
                    {Note.Body}
                </div>
            ))}
        </div>
    )
}