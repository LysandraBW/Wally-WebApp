import { formatDate } from "@/utils/convert";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import Tab from "./Tab";
import Logo from "@/component/NavBar/Logo";
import Note from "./Note";
import Tabs from "./Tabs";
import Card from "./Card";
import CloseButton from "@/component/Button/CloseButton";
import Tag from "./Tag";

interface ReportProps {
    appointment: DB_ProtectedAppointment;
    closeAppointment: () => void;
}

export default function Report(props: ReportProps) {
    const tabs = ["General", "Vehicle", "Payment", "Notes"];
    const [tab, setTab] = useState("General");

    return (
        <div 
            className={clsx(
                "[--horizontalPadding:calc(12*0.25rem)] max-sm:[--horizontalPadding:calc(4*0.25rem)]",
                "bg-base-0 backdrop-blur-lg",
                "flex flex-col grow"
            )}
        >
            <div className="px-4 py-4 flex justify-between items-center border-b border-b-transparent dark:border-b-base-200">
                <Logo
                    svgClassName="dark:stroke-white dark:fill-white"
                />
                <CloseButton
                    size={12}
                    onClick={props.closeAppointment}
                />
            </div>
            <header 
                className={clsx(
                    "relative",
                    "flex flex-col max-md:flex-col max-md:items-start max-md:gap-y-4",
                    "dark:border-b dark:border-b-base-200",
                    "bg-[url('/Tire.jpg')] bg-center bg-cover",
                    "after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r dark:after:bg-gradient-to-l after:from-black after:to-blue-500/0 dark:after:from-black dark:after:to-black/100"
                )}
            >
                <h1 className="py-12 px-[var(--horizontalPadding)] relative z-20 text-4xl text-white font-medium md:whitespace-nowrap">
                    {props.appointment.FName} {props.appointment.LName}'s<br/>Appointment Report
                </h1>
                <div className="relative z-20 flex w-full border-t border-base-300 dark:border-base-200">
                    <Tag
                        k="Date Created"
                        v={`${formatDate(props.appointment.CreationDate, 'MMMM Do, YYYY hh:mm A')}`}
                    />
                    <Tag
                        k="Appointment ID"
                        v={`${props.appointment.AppointmentID}`}
                    />
                    <Tag
                        k="Vehicle"
                        v={`${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`}
                    />
                </div>
            </header>
            <div className="grid grid-rows-2 grid-cols-2 max-md:flex max-md:flex-wrap">
                <Card
                    title="Status"
                    head={props.appointment.Status}
                    body={props.appointment.StatusDescription}
                />
                <Card
                    title="Cost"
                    head={props.appointment.Cost ? `$${props.appointment.Cost}` : "None"}
                    body={props.appointment.Cost ? "" : "We have not yet calculated the cost of your service(s). You can expect this informance when your servicing is complete."}
                />
                <Card
                    title="Start Date"
                    head={formatDate(props.appointment.StartDate) || "None"}
                    body={props.appointment.StatusID === 0 && "As your appointment is still pending, there is no date for you to bring in your vehicle."}
                />
                <Card
                    title="End Date"
                    head={formatDate(props.appointment.EndDate) || "None"}
                    body={props.appointment.StatusID === 0 && "Well, you know what they say: An end date, the date when you can pick up your vehicle, will show when your appointment is scheduled or in progress."}
                />
            </div>
            <div className="flex flex-col h-[50vh] overflow-y-auto">
                <Tabs
                    tab={tab}
                    tabs={tabs}
                    setTab={setTab}
                />
                {tab === "General" &&
                    <Tab
                        data={[
                            ["Name", `${props.appointment.FName} ${props.appointment.LName}`],
                            ["Email", `${props.appointment.Email}`],
                            ["Phone", `${props.appointment.Phone}`],
                            ["Start Date", `${formatDate(props.appointment.StartDate) || "None"}`],
                            ["End Date", `${formatDate(props.appointment.EndDate) || "None"}`]
                        ]}
                    />
                }
                {tab === "Vehicle" &&
                    <Tab
                        data={[
                            ["Vehicle", `${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`],
                            ["VIN", `${props.appointment.VIN || "None"}`],
                            ["License Plate", `${props.appointment.LicensePlate || "None"}`],
                            ["Mileage", `${props.appointment.Mileage || "None"}`],
                            ["Services", 
                                <div className="flex flex-col gap-1">
                                    {props.appointment.Services.map((service, i) => (
                                        <div 
                                            key={i} 
                                        >
                                            - {service.Service}
                                        </div>
                                    ))}
                                </div>

                            ]
                        ]}
                    />
                }
                {tab === "Payment" &&
                    <Tab
                        data={[
                            ["Cost", `${props.appointment.Cost ? `$${props.appointment.Cost}` : "None"}`]
                        ]}
                    />
                }
                {tab === "Notes" &&
                    <div className="flex flex-col gap-4 p-4">
                        {props.appointment.Notes.map((note, i) => (
                            <Fragment key={i}>
                                <Note
                                    note={note}
                                />
                            </Fragment>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}