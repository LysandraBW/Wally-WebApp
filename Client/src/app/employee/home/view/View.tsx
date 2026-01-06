import { Appointment as DB_Appointment } from "waltronics-types";
import { toDisplayDate, toMoney } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import PaymentItem from "@/pages/items/PaymentItem";
import DiagnosisItem from "@/pages/items/DiagnosisItem";
import RepairItem from "@/pages/items/RepairItem";
import PartItem from "@/pages/items/PartItem";
import ServiceItem from "@/pages/items/ServiceItem";
import NoteItem from "@/pages/items/NoteItem";
import Tabs from "@/pages/ReadWriteAppointment/Tabs";
import { ViewSectionNonScalar } from "./ViewSectionNonScalar";
import ViewSectionScalar from "./ViewSectionScalar";
import Header from "@/pages/ReadWriteAppointment/Header";
import resizeMainContent from "@/pages/ReadWriteAppointment/resizeMainContent";
import { useRouter, useSearchParams } from "next/navigation";

interface ViewProps {
    appointment: DB_Appointment;
    appointmentID: string;
    close: () => void;
}

export default function View(props: ViewProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [tab, setTab] = useState("General");
    const [tabs] = useState(["General", "Vehicle", "Finances", "Diagnoses", "Parts", "Repairs", "Services", "Notes"])


    useEffect(() => {
        if (searchParams) {
            const tab = searchParams.get("tab") || "";
            setTab(tab || "General");
        }
    }, []);


    const handleTabChange = async (tab: string) => {
        setTab(tab);
        const URL = `/employee/home/view?appointmentID=${props.appointmentID}&tab=${tab}`;
        router.replace(URL);
    }


    return (
        <div className="w-full flex flex-col grow">
            <Header
                close={props.close}
                goToEdit={true}
                appointment={props.appointment}
                appointmentID={props.appointmentID}
            />
            <Tabs
                tab={tab}
                tabs={tabs}
                onClick={handleTabChange}
            />
            <div
                id="MainContent"
                className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50 overflow-y-auto"
            >
                {/* Contact */}
                {tab === "General" && 
                    <ViewSectionScalar
                        data={[
                            ["First Name", `${props.appointment.FName}`],
                            ["Last Name", `${props.appointment.LName}`],
                            ["Email Address", props.appointment.Email],
                            ["Phone Number", props.appointment.Phone],
                            ["Status", props.appointment.Status],
                            ["Start Date", toDisplayDate(props.appointment.StartDate) || "N/A"],
                            ["End Date", toDisplayDate(props.appointment.EndDate) || "N/A"]
                        ]}
                    />
                }
                {/* Vehicle */}
                {tab === "Vehicle" &&
                    <ViewSectionScalar
                        data={[
                            ["VIN", props.appointment.VIN ? props.appointment.VIN.toUpperCase() : "N/A"],
                            ["Model Year", props.appointment.ModelYear],
                            ["Make", props.appointment.Make],
                            ["Model", props.appointment.Model],
                            ["License Plate", props.appointment.LicensePlate ? props.appointment.LicensePlate.toUpperCase() : "N/A"],
                            ["Mileage", (props.appointment.Mileage !== undefined && props.appointment.Mileage !== null) ? `${props.appointment.Mileage.toLocaleString()} miles` : ""]
                        ]}
                    />
                }
                {/* Finances */}
                {tab === "Finances" && 
                    <Fragment>
                        {/* Cost */}
                        <ViewSectionScalar
                            data={[
                                ["Cost", toMoney(props.appointment.Cost.toFixed(2)) || "N/A"],
                                ["Amount Paid", props.appointment.Payments.length ? toMoney(props.appointment.Payments.map(payment => payment.Payment).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) : "N/A"]
                            ]}
                        />
                        {/* Payments */}
                        <ViewSectionNonScalar 
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
                    <ViewSectionNonScalar 
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
                    <ViewSectionNonScalar 
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
                    <ViewSectionNonScalar 
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
                    <ViewSectionNonScalar
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
                    <ViewSectionNonScalar 
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