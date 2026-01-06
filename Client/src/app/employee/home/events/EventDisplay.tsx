
import { Events, Months } from "./_DEF";
import CloseButton from "@/component/Button/CloseButton";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import Person from "@/component/Icons/Icons/UserIcon";
import { toDisplayDate, toDisplayTime } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/components/Item";
import { toInteger } from "@/utils/convert";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import ArchiveBoxIcon from "@/component/Icons/Icons/ArchiveBoxIcon";
import getEventsWhen from "./getEventsWhen";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import { EllipsisIcon } from "lucide-react";
import EllipsisVerticalIcon from "@/component/Icons/Icons/EllipsisVerticalIcon";
import { Tooltip } from "react-tooltip";
import EventItem from "./EventItem";

interface EventDisplayProps<Items> {
    items: Events;
    onClose: (year: number, monthIndex: number, dateIndex: number) => void;
    year: number;
    monthIndex: number;
    dateIndex: number;
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

const today = Date();

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
    }, [props.items, props.year, props.monthIndex, props.dateIndex,]);

    
    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th'; // Exclude 11th, 12th, 13th from the last digit check
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };


    const [numEvents, setNumEvents] = useState(Object.keys(eventsWhen).length);

    useEffect(() => {
        setNumEvents(Object.keys(eventsWhen).length);
    }, [eventsWhen]);


    return (
        <div className="flex flex-col w-full">
            <div className="bg-base-0 dark:bg-[#121214] flex flex-col w-full justify-between py-4 px-2 gap-y-1 items-start border-base-300 dark:border-base-200 border-b">
                <h6 className="font-medium text-sm text-base-900">Events</h6>
                <span className="text-xs text-base-500 whitespace-nowrap tracking-wide">
                    {numEvents === 0 ? "No Events on " : (numEvents === 1 ? "1 Event on " : `${numEvents} Events on `)} {Months[props.monthIndex]} {props.dateIndex}{getOrdinalSuffix(props.dateIndex)}, {props.year}
                </span>
            </div>
            <div className="flex flex-col gap-4">
                {/* View/Update Events */}
                {Object.entries(eventsWhen).map(([itemID, item], i) => (
                    <Fragment key={i}>
                        <EventItem
                            i={i}
                            item={item}
                            idToName={idToName}
                            onDelete={() => props.onDelete(itemID)}
                            onUpdate={() => props.onUpdate(itemID)}
                        />
                    </Fragment>
                ))}
                {Object.keys(props.items).length === 0 &&
                    <div className="h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                        <ArchiveBoxIcon
                            className="size-6 stroke-gray-400"
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