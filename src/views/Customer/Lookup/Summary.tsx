import { Summary as SummaryData } from "@/lib/Form/Customer/Lookup/Submit";

interface SummaryProps {
    info: SummaryData;
}

export default function Summary(props: SummaryProps) {
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
            <div>{props.info.StartDate}</div>
            <div>{props.info.EndDate}</div>
            <div>{props.info.Status}</div>
            <div>{props.info.Make}</div>
            <div>{props.info.Model}</div>
            <div>{props.info.ModelYear}</div>
            <div>{props.info.VIN}</div>
            <div>{props.info.LicensePlate}</div>
            <div>{props.info.Mileage}</div>
            <div>{props.info.Cost}</div>
            <div><b>Services</b></div>
            {props.info.Services.map((service, i) => (
                <div key={i}>
                    {service.Service}
                </div>
            ))}
            <div><b>Diagnosis</b></div>
            {props.info.Diagnosis.map((diagnosis, i) => (
                <div key={i}>{diagnosis.Code} {diagnosis.Diagnosis}</div>
            ))}
            <div><b>Fixes</b></div>
            {props.info.Fixes.map((fix, i) => (
                <div key={i}>
                    {fix.Fix}
                </div>
            ))}
        </div>
    )
}