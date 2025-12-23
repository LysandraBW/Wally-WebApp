
import { Events, Months } from "./_DEF";
import CloseButton from "@/component/Button/CloseButton";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import Person from "@/component/Icons/Icons/UserIcon";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/components/Item";
import { toInteger } from "@/utils/convert";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import ArchiveBoxIcon from "@/component/Icons/Icons/ArchiveBoxIcon";
import getEventsWhen from "./getEventsWhen";

interface EventDisplayProps<Items> extends  DisplayProps<Items> {
    onClose: (year: number, monthIndex: number, dateIndex: number) => void;
    year: number;
    monthIndex: number;
    dateIndex: number;
}

export default function EventDisplay(props: EventDisplayProps<Events>) {
    const [idToName, setIDToName] = useState<OptionMap>({});
    const [eventsWhen, setEventsWhen] = useState<Events>(props.items);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            setIDToName(getValuesToLabels(employees));
        }
        load();
    }, []);

    useEffect(() => {
        setEventsWhen(getEventsWhen(props.year, props.monthIndex, props.dateIndex, props.items));
    }, [props.items]);

    return (
        <div className="flex flex-col gap-4 border border-gray-300 w-full">
            <div className="flex w-full justify-between p-4 gap-1 items-start border-b-gray-300 border-b">
                {/* Close Button, Title */}
                <div className="flex flex-col gap-0">
                    <h6 className="font-medium">Events</h6>
                    <span className="text-xs whitespace-nowrap tracking-wide font-medium">{Months[props.monthIndex]} {props.dateIndex}, {props.year}</span>
                </div>
                <div className="w-min">
                    <CloseButton
                        onClose={() => props.onClose(props.year, props.monthIndex, props.dateIndex)}
                    />
                </div>
            </div>
            <div className="p-4 py-0 pb-4 flex flex-col gap-4">
                {/* View/Update Events */}
                {Object.entries(eventsWhen).map(([itemID, item], i) => (
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
                                    [...item.Sharees.map((sharee, i) => (
                                        <Fragment>
                                            <Person
                                                    
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
                {Object.keys(props.items).length === 0 &&
                    <div className="h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                        <ArchiveBoxIcon
                            class="size-6 stroke-gray-400"
                        />
                        <span className="text-gray-400 tracking-wide font-medium text-04">
                            No Events Found
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}