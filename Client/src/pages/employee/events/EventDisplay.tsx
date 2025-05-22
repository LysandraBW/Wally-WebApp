
import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Events, Months } from "../events/_DEF";
import CloseButton from "@/component/Button/CloseButton";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import Person from "@/component/Icon/Person";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import { getCookie } from "@/utils/cookies/getCookie";
import GetEmployeeNamePairs from "@/services/DB/Procedure/Employee/GetEmployeeNamePairs";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/Item/Item";
import { toInteger } from "@/utils/convert";

interface EventDisplayProps<Items> extends  DisplayProps<Items> {
    onClose: () => void;
    year: number;
    monthIndex: number;
    dateIndex: number;
}

export default function EventDisplay(props: EventDisplayProps<Events>) {
    const [idToName, setIDToName] = useState<OptionMap>({});

    useEffect(() => {
        const load = async () => {
            const sessionID = await getCookie("sessionID");
            const employees = await GetEmployeeNamePairs(sessionID);
            setIDToName(getValuesToLabels(employees));
        }
        load();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Close Button, Title */}
            <div className="w-full justify-end">
                <CloseButton
                    close={props.onClose}
                />
            </div>
            <div>
                <h6 className="w-full">Events</h6>
                <span>Events on {Months[props.monthIndex]} {props.dateIndex}, {props.year}</span>
            </div>
            {/* View/Update Events */}
            {Object.entries(props.items).map(([itemID, item], i) => (
                <div key={i}>
                    <UpdateItem
                        canDelete={true}
                        canEdit={true}
                        onUpdate={() => props.onUpdate(itemID)}
                        onDelete={() => props.onDelete(itemID)}
                    >
                        <Item
                            ID={toInteger(item.EventID)}
                            head={
                                <div className="flex flex-col">
                                    <p className="bold small">{item.Name}</p>
                                    <span className="color-4">{item.Summary}</span>
                                </div>
                            }
                            tags={[
                                [toDisplayDate(item.Date)],
                                [item.Sharees.map((sharee, i) => (
                                    <Fragment>
                                        <Person
                                                width="14"
                                                height="14"
                                                fill="#94a3b8"
                                                stroke="#94a3b8"
                                                strokeWidth="0.25"
                                            />
                                            {idToName[sharee]}
                                            {item.EmployeeID === sharee && 
                                                <span className="text-blue-500 medium">
                                                    Creator
                                                </span>
                                            }
                                    </Fragment>
                                ))]
                            ]}
                        />
                    </UpdateItem>
                </div>
            ))}
        </div>
    )
}