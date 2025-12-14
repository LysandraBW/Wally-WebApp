
import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Events, Months } from "../events/_DEF";
import CloseButton from "@/component/Button/CloseButton";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import Person from "@/component/Icon/Person";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import { getCookie } from "@/utils/cookies/getCookie";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/Item/Item";
import { toInteger } from "@/utils/convert";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";

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
            const employees = await GetEmployeeNamePairs();
            setIDToName(getValuesToLabels(employees));
        }
        load();
    }, []);

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
                        close={props.onClose}
                    />
                </div>
            </div>
            <div className="p-4 py-0 pb-4 flex flex-col gap-4">
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
                                    [...item.Sharees.map((sharee, i) => (
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
                {Object.keys(props.items).length === 0 &&
                    <div className="h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <span className="text-gray-400 tracking-wide font-medium text-04">
                            No Events Found
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}