import { useState } from "react";
import AppointmentDisplayTabs from "./AppointmentDisplayTabs";
import CloseButton from "@/component/Button/CloseButton";
import clsx from "clsx";
import ContactTab from "./ContactTab";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import { Instrumental } from "@/public/Font";
import VehicleTab from "./VehicleTab";
import PaymentTab from "./PaymentTab";
import NoteTab from "./NoteTab/NoteTab";

interface AppointmentDisplayProps {
    appointment: DB_ProtectedAppointment;
    closeAppointment: () => void;
}

export default function AppointmentDisplay(props: AppointmentDisplayProps) {
    const tabs = ["General", "Vehicle", "Payment", "Notes"];
    const [tab, setTab] = useState("General");

    return (
        <div 
            className={clsx(
                "w-full h-full",
                "flex flex-col",
                "relative z-20",
                "overflow-y-auto",
                "bg-gray-50 border border-gray-200 border-t-0",
                "max-md:border-t-0"
            )}
        >
            <div 
                className={clsx(
                    "p-2 px-2",
                    "flex justify-end items-center",
                    "bg-gray-50",
                    "border-b border-b-gray-200"
                )}
            >
                <div className="h-min w-min">
                    <CloseButton
                        onClose={props.closeAppointment}
                    />
                </div>
            </div> 
            {/* Appointment ID */}
            <div 
                className={clsx(
                    "p-1 px-4",
                    "flex justify-left items-center",
                    "bg-gray-50",
                    "tracking-wide"
                )}
            >
                <p 
                    className={clsx(
                        Instrumental.className, 
                        "text-md text-left text-gray-600 font-medium"
                    )}
                >
                    APPT. {props.appointment.AppointmentID}
                </p>
            </div> 
            {/* Tabs */}
            <AppointmentDisplayTabs
                tab={tab}
                tabs={tabs}
                selectTab={setTab}
            />
            {/* Data */}
            <div className="bg-gray-50 flex flex-col grow">
                {/* Showing Tab */}
                <h4 
                    className={clsx(
                        Instrumental.className, 
                        "pt-2 pl-4 pb-2",
                        "border-b border-b-gray-200",
                        "text-04 text-gray-600 font-medium",
                        "tracking-wide",
                        "bg-gray-50"
                    )}
                >
                    Showing {tab} {tab !== "Notes" && "Information"}
                </h4>
                {/* Showing Data */}
                <div 
                    className={clsx(
                        "w-full",
                        tab !== "Notes" && "grid grid-cols-[33%_auto]"
                    )}
                >
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
                    {tab === "Notes" &&
                        <NoteTab
                            appointment={props.appointment}
                        />
                    }
                </div>
            </div>
        </div>
    )
}