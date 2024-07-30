import { Segment, Text } from "@/components/Input/Export";
import { DB_Statuses } from "@/database/Info/Info";
import { DB_Status } from "@/database/Types";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import { useEffect, useState } from "react";

interface GeneralProps {
    form: {
        FName: string;
        LName: string;
        Email: string;
        Phone: string;
        StartDate: string;
        EndDate: string;
        StatusID: number;
    };
    changeHandler: (part: FormPart, name: string, value: any) => void;
}

export default function General(props: GeneralProps) {
    const [statuses, setStatuses] = useState<Array<[any, string]>>([]);

    useEffect(() => {
        const load = async () => {
            let statuses: Array<DB_Status> = await DB_Statuses();
            setStatuses(statuses.map(status => [status.StatusID, status.Status]));
        }
        load();
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