import { DB_AppointmentSummary } from "@/services/DB/Interface/Appointment";
import { useState } from "react";
import Tabs from "./CardTabs";
import CloseButton from "@/component/Button/CloseButton";
import clsx from "clsx";
import ContactTab from "./ContactTab";
import VehicleTab from "./VehicleTab";
import PaymentTab from "./PaymentTab";
import NotesTab from "./Note/NotesTab";
import { Satoshi } from "@/public/Font";

interface CardProps {
    appointment: DB_AppointmentSummary;
    closeAppointment: () => void;
}

export default function Card(props: CardProps) {
    const tabs = ["General", "Vehicle", "Payment", "Notes"];
    const [tab, setTab] = useState("General");

    return (
        <div 
            className={clsx(
                "relative z-20 min-w-[400px] w-fit h-[500px] overflow-y-auto",
                "shadow-xl bg-white flex flex-col"
            )}
        >
            <div 
                className={clsx(
                    "p-4 border-b- border-b-gray-200-",
                    "flex justify-between"
                )}>
                {/* Title */}
                <h6 
                    className={clsx(
                        "font-medium"
                    )}
                >
                    Appointment Information
                </h6>
                {/* Close Button */}
                <div className="h-min w-min">
                    <CloseButton
                        close={props.closeAppointment}
                    />
                </div>
            </div>
            {/* Tabs */}
            <Tabs
                tab={tab}
                tabs={tabs}
                selectTab={setTab}
            />
            {/* Data */}
            <div className="bg-white grow">
                <h4 className="bg-gray-50 pt-2 pl-4 pb-2 border-b border-b-gray-200 text-05 font-medium">Showing {tab} {tab !== "Notes" && "Information"}</h4>
                <div className="w-full grid grid-cols-[33%_66%]">
                    {tab === "General" &&
                        <ContactTab
                            appointment={props.appointment}
                        />
                    }
                    {tab === "Vehicle" &&
                        <VehicleTab
                            appointment={props.appointment}
                        />
                    }
                    {tab === "Payment" &&
                        <PaymentTab
                            appointment={props.appointment}
                        />
                    }
                </div>
                {tab === "Notes" &&
                    <NotesTab
                        appointment={props.appointment}
                    />
                }
            </div>
        </div>
    )
}