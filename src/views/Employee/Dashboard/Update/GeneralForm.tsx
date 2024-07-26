import { Segment, Text } from "@/components/Input/Export";
import { DB_Statuses } from "@/lib/Database/Info/Info";
import { DB_Status } from "@/lib/Database/Types";
import { Parts } from "@/process/Employee/Update/Form";
import { useEffect, useState } from "react";

interface GeneralProps {
    form: {
        FName: string;
        LName: string;
        Email: string;
        Phone: string;
        StartDate: Date;
        EndDate: Date;
        StatusID: number;
    };
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function General(props: GeneralProps) {
    const [statuses, setStatuses] = useState<Array<[any, string]>>([]);

    useEffect(() => {
        const loadStatuses = async () => {
            let statuses: Array<DB_Status> = await DB_Statuses();
            setStatuses(statuses.map(status => [status.StatusID, status.Status]));
        }
        loadStatuses();
    }, []);
    
    const changeHandler = (name: string, value: any) => {
        props.changeHandler('General', name, value);
    }

    return (
        <>
            <Text
                name={"FName"}
                value={props.form.FName}
                label={"First Name"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"LName"}
                value={props.form.LName}
                label={"Last Name"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"Email"}
                value={props.form.Email}
                label={"Email Address"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"Phone"}
                value={props.form.Phone}
                label={"Phone"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                type="datetime-local"
                name={"StartDate"}
                value={props.form.StartDate}
                label={"Start Date"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                type="datetime-local"
                name={"EndDate"}
                value={props.form.EndDate}
                label={"End Date"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Segment
                name={"StatusID"}
                value={props.form.StatusID}
                values={statuses}
                label={"StatusID"}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}