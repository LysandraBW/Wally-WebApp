import { Appointment as DB_Appointment } from "waltronics-types";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { toDisplayDate } from "@/utils/convert";
import { Fragment, useEffect, useState } from "react";
import PaymentItem from "./PaymentItem";
import ShowPart from "./PartItem";
import ServiceItem from "./ServiceItem";
import RepairItem from "./RepairItem";
import DiagnosisItem from "./DiagnosisItem";
import NoteItem from "./NoteItem";
import { NonScalarViewSection, ScalarViewSection } from "./ViewSection";
import Tabs from "@/component/Tabs/Tabs";
import CloseButton from "@/component/Button/CloseButton";

interface ViewProps {
    appointment: DB_Appointment;
    appointmentID: string;
    close: () => void;
}

export default function View(props: ViewProps) {
    const [tab, setTab] = useState("Contact");
    const [appointment, setAppointment] = useState<DB_Appointment>(props.appointment);

    return (
        <div>
            {appointment &&
                <div className="w-full">
                    <div className="col-start-1 row-start-1 row-span-2 border-t border-t-gray-300 border-x border-x-gray-300 bg-white py-4 px-4 flex justify-between items-center gap-1 border-b border-b-gray-300">
                        <div className="w-full">
                            <div className="flex w-full gap-2 items-center justify-between mb-1">
                                <h5 className="text-xl font-medium flex">Appointment</h5>
                                <CloseButton
                                    close={props.close}
                                />
                            </div>
                            <p className="tracking-wide text-xs font-medium">{props.appointmentID}</p>
                        </div>
                    </div>
                    <div className="row-start-3 row-span-1 col-start-1 col-span-1 border-x border-x-gray-300 bg-white">
                        <Tabs
                            tab={tab}
                            tabs={[
                                "Contact", 
                                "Dates", 
                                "Vehicle", 
                                "Finances", 
                                "Diagnoses", 
                                "Repairs", 
                                "Parts", 
                                "Services", 
                                "Notes"
                            ]}
                            onTabClick={setTab}
                        />
                    </div>
                    <table className="w-full">
                        <tbody className="w-full">
                            {/* Contact */}
                            {tab === "Contact" && 
                                <ScalarViewSection
                                    head="Contact"
                                    data={[
                                        ["First Name", `${appointment.FName}`],
                                        ["Last Name", `${appointment.LName}`],
                                        ["Email Address", appointment.Email],
                                        ["Phone Number", appointment.Phone]
                                    ]}
                                />
                            }
                            {/* Dates */}
                            {tab === "Dates" &&      
                                <ScalarViewSection
                                    head="Dates"
                                    data={[
                                        ["Status", appointment.Status],
                                        ["Start Date", toDisplayDate(appointment.StartDate) || "N/A"],
                                        ["End Date", toDisplayDate(appointment.EndDate) || "N/A"]
                                    ]}
                                />
                            }
                            {/* Vehicle */}
                            {tab === "Vehicle" &&
                                <ScalarViewSection
                                    head="Vehicle"
                                    data={[
                                        ["VIN", appointment.VIN],
                                        ["Model Year", appointment.ModelYear],
                                        ["Make", appointment.Make],
                                        ["Model", appointment.Model],
                                        ["License Plate", appointment.LicensePlate],
                                        ["Mileage", appointment.Mileage]
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
                                            ["Cost", appointment.Cost ? "$"+appointment.Cost.toFixed(2) : "N/A"]
                                        ]}
                                    />  
                                    {/* Payments */}
                                    <NonScalarViewSection 
                                        head="Payments"
                                        data={appointment.Payments.map(payment => (  
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
                                    data={appointment.Diagnoses.map(diagnosis => (
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
                                    data={appointment.Repairs.map(repair => (
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
                                    data={appointment.Parts.map(part => (
                                        <ShowPart
                                            part={part}
                                        />
                                    ))}
                                />
                            }
                            {/* Services */}
                            {tab === "Services" &&
                                <NonScalarViewSection
                                    head="Services"
                                    data={appointment.Services.map(service => (
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
                                    data={appointment.Notes.map(note => (
                                        <NoteItem 
                                            note={note}
                                        />
                                    ))}
                                />
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}