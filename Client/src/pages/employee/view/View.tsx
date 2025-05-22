import { Appointment as DB_Appointment } from "waltronics-types";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { toDisplayDate } from "@/utils/convert";
import { useEffect, useState } from "react";
import ShowPayment from "./PaymentItem";
import ShowPart from "./PartItem";
import ServiceItem from "./ServiceItem";
import RepairItem from "./RepairItem";
import DiagnosisItem from "./DiagnosisItem";
import NoteItem from "./NoteItem";
import { NonScalarViewSection, ScalarViewSection } from "./ViewSection";
import Tabs from "@/component/Tabs/Tabs";

interface ViewProps {
    sessionID: string;
    appointmentID: string;
}

export default function View(props: ViewProps) {
    const [tab, setTab] = useState("Contact");
    const [appointment, setAppointment] = useState<DB_Appointment>();

    useEffect(() => {
        const load = async () => {
            const appointment = await SelectAppointment({
                sessionID: props.sessionID,
                appointmentID: props.appointmentID
            });
            setAppointment(appointment);
        }
        load();
    }, []);

    return (
        <div>
            {appointment &&
                <div>
                    <div className="p-4 border-b border-gray-200">
                        <h5 className="font-medium">Appointment</h5>
                    </div>
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
                    {/* Contact */}
                    {tab === "Contact" && 
                        <ScalarViewSection
                            head="Contact"
                            data={[
                                ["Full Name", `${appointment.FName} ${appointment.LName}`],
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
                                ["Start Date", toDisplayDate(appointment.StartDate)],
                                ["End Date", toDisplayDate(appointment.EndDate)]
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
                        <div>
                            {/* Cost */}
                            <ScalarViewSection
                                head="Cost"
                                data={[
                                    ["Cost", "$"+appointment.Cost.toFixed(2)]
                                ]}
                            />  
                            {/* Payments */}
                            <NonScalarViewSection 
                                head="Payments"
                                data={appointment.Payments.map(payment => (  
                                    <ShowPayment
                                        payment={payment}
                                    />
                                ))}
                            />        
                        </div>
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
                </div>
            }
        </div>
    )
}