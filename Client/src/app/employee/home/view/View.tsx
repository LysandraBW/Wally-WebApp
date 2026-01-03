import { Appointment as DB_Appointment } from "waltronics-types";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import CloseButton from "@/component/Button/CloseButton";
import { motion } from "motion/react";
import PaymentItem from "@/pages/items/PaymentItem";
import DiagnosisItem from "@/pages/items/DiagnosisItem";
import RepairItem from "@/pages/items/RepairItem";
import PartItem from "@/pages/items/PartItem";
import ServiceItem from "@/pages/items/ServiceItem";
import NoteItem from "@/pages/items/NoteItem";
import clsx from "clsx";
import Tabs from "@/pages/ReadWriteAppointment/Tabs";
import { NonScalarViewSection } from "./NonScalarViewSection";
import ScalarViewSection from "./ScalarViewSection";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";

interface ViewProps {
    appointment: DB_Appointment;
    appointmentID: string;
    close: () => void;
}

export default function View(props: ViewProps) {
    const [tab, setTab] = useState("Contact");
    const [tabs] = useState(["Contact", "Dates", "Vehicle", "Finances", "Diagnoses", "Repairs", "Parts", "Services", "Notes"])


    useEffect(() => {
        window.addEventListener("resize", resizeMainContent);
    }, []);


    const resizeMainContent = () => {
        const vNavBar = document.querySelector("#VNavBar");
        if (!vNavBar)
            return;
        const vNavBarRect = vNavBar.getBoundingClientRect();

        const tabs = document.querySelector("#Tabs");
        if (!tabs)
            return;
        const tabsRect = tabs.getBoundingClientRect();
        
        const mainContent = document.querySelector("#MainContent") as HTMLElement;
        const mainContentHeight = vNavBarRect.bottom - tabsRect.bottom;
        if (!mainContent)
            return;
        mainContent.style.maxHeight = `${mainContentHeight}px`;
    }


    return (
        <div className="w-full flex flex-col grow">
            <div className="px-2 py-4 flex justify-start gap-2 items-center border-b border-base-300 dark:border-base-200">
                <IconButton
                    size={14}
                    onClick={props.close}
                    className="dark:shadow-md"
                >
                    <ArrowLongLeftIcon
                        className="size-4 stroke-base-500"
                    />
                </IconButton>
                <h1 className="text-sm text-base-700 font-medium tracking-wide">
                    Appointment: {props.appointment.FName} {props.appointment.LName}'s {props.appointment.ModelYear} {props.appointment.Make} {props.appointment.Model}
                </h1>
                {/* <CloseButton
                    size={10}
                    onClick={props.close}
                /> */}
            </div>
            <div className="flex border-b border-base-300 dark:border-base-200">
                <div className="w-full px-2 py-2 border-r border-base-300 dark:border-base-200">
                    <span className="block text-xs text-base-500 tracking-wide">
                        ID
                    </span>
                    <span className="block text-xs text-base-700 tracking-wide font-medium">
                        {props.appointmentID}
                    </span>
                </div>
                <div className="w-full px-2 py-2 border-r border-base-300 dark:border-base-200">
                    <span className="block text-xs text-base-500 tracking-wide">
                        Created
                    </span>
                    <span className="block text-xs text-base-700 tracking-wide font-medium">
                        {toDisplayDate(props.appointment.CreationDate)}
                    </span>
                </div>
                <div className="w-full px-2 py-2 border-base-300 dark:border-base-200">
                    <span className="block text-xs text-base-500 tracking-wide">
                        Updated
                    </span>
                    <span className="block text-xs text-base-700 tracking-wide font-medium">
                        {toDisplayDate(props.appointment.UpdationDate)}
                    </span>
                </div>
            </div>
            <div 
                id="Tabs"
                className="p-2 flex gap-2 border-b border-base-300 dark:border-base-200"
            >
                <Tabs
                    tab={tab}
                    tabs={tabs}
                    onClick={setTab}
                />
            </div>
            <div
                id="MainContent"
                className="w-full h-min grid grid-cols-[min-content_auto] bg-base-0 dark:bg-base-50 overflow-y-auto"
            >
                {/* Contact */}
                {tab === "Contact" && 
                    <ScalarViewSection
                        data={[
                            ["First Name", `${props.appointment.FName}`],
                            ["Last Name", `${props.appointment.LName}`],
                            ["Email Address", props.appointment.Email],
                            ["Phone Number", props.appointment.Phone]
                        ]}
                    />
                }
                {/* Dates */}
                {tab === "Dates" &&      
                    <ScalarViewSection
                        data={[
                            ["Status", props.appointment.Status],
                            ["Start Date", toDisplayDate(props.appointment.StartDate) || "N/A"],
                            ["End Date", toDisplayDate(props.appointment.EndDate) || "N/A"]
                        ]}
                    />
                }
                {/* Vehicle */}
                {tab === "Vehicle" &&
                    <ScalarViewSection
                        data={[
                            ["VIN", props.appointment.VIN],
                            ["Model Year", props.appointment.ModelYear],
                            ["Make", props.appointment.Make],
                            ["Model", props.appointment.Model],
                            ["License Plate", props.appointment.LicensePlate],
                            ["Mileage", props.appointment.Mileage]
                        ]}
                    />
                }
                {/* Finances */}
                {tab === "Finances" && 
                    <Fragment>
                        {/* Cost */}
                        <ScalarViewSection
                            data={[
                                ["Cost", props.appointment.Cost ? "$"+props.appointment.Cost.toFixed(2) : "N/A"],
                                ["Amount Paid", props.appointment.Payments.length ? `$${props.appointment.Payments.map(payment => payment.Payment).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`: "N/A"]
                            ]}
                        />
                        {/* Payments */}
                        <NonScalarViewSection 
                            head="Payments"
                            data={props.appointment.Payments.map(payment => (  
                                <PaymentItem
                                    payment={payment}
                                />
                            ))}
                        />        
                    </Fragment>
                }
                {/* Diagnoses */}
                {tab === "Diagnoses" &&
                    <NonScalarViewSection 
                        head="Diagnoses"
                        data={props.appointment.Diagnoses.map(diagnosis => (
                            <DiagnosisItem 
                                diagnosis={diagnosis}
                            />
                        ))}
                    />
                }
                {/* Repairs */}
                {tab === "Repairs" &&
                    <NonScalarViewSection 
                        head="Repairs"
                        data={props.appointment.Repairs.map(repair => (
                            <RepairItem
                                repair={repair}
                            />
                        ))}
                    />
                }
                {/* Parts */}
                {tab === "Parts" &&
                    <NonScalarViewSection 
                        head="Parts"
                        data={props.appointment.Parts.map(part => (
                            <PartItem
                                part={part}
                            />
                        ))}
                    />
                }
                {/* Services */}
                {tab === "Services" &&
                    <NonScalarViewSection
                        head="Services"
                        data={props.appointment.Services.map(service => (
                            <ServiceItem
                                service={service}
                            />
                        ))}
                    />
                }
                {/* Notes */}
                {tab === "Notes" &&
                    <NonScalarViewSection 
                        head="Notes"
                        data={props.appointment.Notes.map(note => (
                            <NoteItem
                                note={note}
                            />
                        ))}
                    />
                }
            </div>
        </div>
    )
}