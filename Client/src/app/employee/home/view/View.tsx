import { Appointment as DB_Appointment } from "waltronics-types";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useState } from "react";
import { NonScalarViewSection, ScalarViewSection } from "./ViewSection";
import CloseButton from "@/component/Button/CloseButton";
import { motion } from "motion/react";
import PaymentItem from "@/pages/items/PaymentItem";
import DiagnosisItem from "@/pages/items/DiagnosisItem";
import RepairItem from "@/pages/items/RepairItem";
import PartItem from "@/pages/items/PartItem";
import ServiceItem from "@/pages/items/ServiceItem";
import NoteItem from "@/pages/items/NoteItem";

interface ViewProps {
    appointment: DB_Appointment;
    appointmentID: string;
    close: () => void;
}

export default function View(props: ViewProps) {
    const [tab, setTab] = useState("Contact");
    const [tabs] = useState(["Contact", "Dates", "Vehicle", "Finances", "Diagnoses", "Repairs", "Parts", "Services", "Notes"])

    return (
        <motion.div className="w-full bg-gray-50 flex flex-col grow rounded-md">
            <div className="col-start-1 row-start-1 row-span-2 p-4 rounded-t-md border border-gray-300 bg-white flex justify-between items-center gap-1">
                <div className="w-full">
                    <div className="flex w-full gap-2 items-center justify-between mb-1">
                        <p className="text-05 text-black font-medium flex">Appointment</p>
                        <CloseButton
                            onClose={props.close}
                        />
                    </div>
                    <p className="tracking-wide text-xs font-medium-">{props.appointmentID}</p>
                </div>
            </div>
            <div className="row-start-3 row-span-1 col-start-1 col-span-1 border-x border-x-gray-300 bg-white">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <table className="w-full">
                <tbody className="w-full">
                    {/* Contact */}
                    {tab === "Contact" && 
                        <ScalarViewSection
                            head="Contact"
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
                            head="Dates"
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
                            head="Vehicle"
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
                                head="Cost"
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
                </tbody>
            </table>
            <div className="grow border-x border-b border-gray-300 rounded-b-md"></div>
        </motion.div>
    )
}