import { Service as DB_AppointmentService } from "waltronics-types";
import { ReactNode, useEffect, useState } from "react";
import { Service } from "../edit/service/service/_DEF";
import Item from "@/features/ItemManager/Item/Item";
import { toInteger } from "@/utils/convert";

interface ServiceItemProps {
    service: DB_AppointmentService | Service;
}

export default function ServiceItem(props: ServiceItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();

    useEffect(() => {
        const tags = [];
        if (props.service.Class) {
            tags.push(props.service.Class);
            tags.push(props.service.Division);
        }
        else {
            tags.push("Custom");
        }
        setTags([tags]);
    }, []);

    return (
        <Item
            ID={toInteger(props.service.AppointmentServiceID)}
            head={props.service.Service}
            tags={tags || []}
        />
    )
}