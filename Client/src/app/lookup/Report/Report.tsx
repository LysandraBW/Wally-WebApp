import { toDisplayDate } from "@/utils/convert";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import Tab from "./Tab";
import Logo from "@/component/NavBar/Logo";
import Note from "./Note";
import Tabs from "./Tabs";
import Card from "./Card";
import ClockIcon from "@/component/Icons/Icons/ClockIcon";
import CurrencyDollarIcon from "@/component/Icons/Icons/CurrencyDollarIcon";
import ArrowLeftStartOnRectangleIcon from "@/component/Icons/Icons/ArrowLeftStartOnRectangleIcon";
import CloseButton from "@/component/Button/CloseButton";
import Tag from "./Tag";
import CalendarIcon from "@/component/Icons/Icons/CalendarIcon";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import TruckIcon from "@/component/Icons/Icons/TruckIcon";

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
            <div className="px-[var(--horizontalPadding)] py-4 flex justify-between items-center border-b border-b-transparent dark:border-b-base-200">
                <Logo/>
                <CloseButton
                    size={12}
                    onClick={props.closeAppointment}
                />
            </div>
            <header 
                className={clsx(
                    "relative py-12 px-[var(--horizontalPadding)]",
                    "flex justify-between items-center gap-1 max-md:flex-col max-md:items-start max-md:gap-y-4",
                    "dark:border-b dark:border-b-base-200",
                    "bg-[url('../public/patrick-mcgregor-NS0WZ8XnEdk-unsplash.jpg')] bg-center bg-cover",
                    "after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r dark:after:bg-gradient-to-l after:from-blue-600 after:to-blue-500/97 dark:after:from-black dark:after:to-black/70"
                )}
            >
                <h1 className="relative z-20 text-4xl text-white font-medium md:whitespace-nowrap">
                    {props.appointment.FName} {props.appointment.LName}'s<br/>Appointment Report
                </h1>
                <div className="relative z-20 flex flex-col gap-2 justify-between items-end max-md:!items-start max-md:justify-center">
                    <Tag
                        Icon={<CalendarIcon className="size-3 stroke-inherit fill-inherit"/>}
                        text={`Made ${toDisplayDate(props.appointment.CreationDate, 'MMMM Do, YYYY hh:mm A')}`}
                    />
                    <Tag
                        Icon={<UserIcon className="size-3 stroke-inherit fill-inherit"/>}
                        text={`${props.appointment.AppointmentID}`}
                    />
                    <Tag
                        Icon={<TruckIcon className="size-3 stroke-inherit fill-inherit"/>}
                        text={`${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`}
                    />
                </div>
            </header>
            <div className="py-4 px-[var(--horizontalPadding)] border-b border-b-base-300 dark:border-b-base-200 grid grid-rows-2 grid-cols-2 gap-4 bg-gradient-to-b from-base-0 to-base-0 shadow-sm max-md:flex max-md:flex-wrap">
                <Card
                    title="Status"
                    Icon={
                        <ClockIcon 
                            className="size-3.5 stroke-inherit"
                        />
                    }
                    head={props.appointment.Status}
                    body={props.appointment.StatusDescription}
                />
                <Card
                    title="Cost"
                    Icon={
                        <CurrencyDollarIcon 
                            className="size-3.5 stroke-inherit"
                        />
                    }
                    head={props.appointment.Cost ? `$${props.appointment.Cost}` : "None"}
                    body={props.appointment.Cost ? "" : "We have not yet calculated the cost of your service(s). You can expect this informance when your servicing is complete."}
                />
                <Card
                    title="Start Date"
                    Icon={
                        <CalendarIcon
                            className="size-3 stroke-inherit"
                        />
                    }
                    head={toDisplayDate(props.appointment.StartDate) || "None"}
                    body={props.appointment.StatusID === 0 && "As your appointment is still pending, there is no date for you to bring in your vehicle. Well, until then!"}
                />
                <Card
                    title="End Date"
                    Icon={
                        <CalendarIcon
                            className="size-3 stroke-inherit"
                        />
                    }
                    head={toDisplayDate(props.appointment.EndDate) || "None"}
                    body={props.appointment.StatusID === 0 && "Well, you know what they say: An end date, the date when you can pick up your vehicle, will show when your appointment is scheduled or in progress."}
                />
            </div>
            <div className="py-4 px-[var(--horizontalPadding)] flex flex-col gap-4 h-[50vh] overflow-y-auto">
                <span className="block text-xs tracking-wide text-center font-medium text-base-500">
                    All Information
                </span>
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
                            ["Start Date", `${toDisplayDate(props.appointment.StartDate) || "None"}`],
                            ["End Date", `${toDisplayDate(props.appointment.EndDate) || "None"}`]
                        ]}
                    />
                }
                {tab === "Vehicle" &&
                    <Tab
                        data={[
                            ["Vehicle", `${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`],
                            ["VIN", `${props.appointment.VIN}`],
                            ["License Plate", `${props.appointment.LicensePlate || "None"}`],
                            ["Mileage", `${props.appointment.Mileage || "None"}`]
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
                    <div className="flex flex-col gap-4">
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