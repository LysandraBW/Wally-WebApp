"use client";
import { useEffect, useState } from "react";
import { DB_AppointmentSummary } from "@/services/DB/Interface/Appointment";
import SelectAppointmentSummary from "@/services/DB/Procedure/Appointment/SelectAppointmentSummary";
import InlineMessage, { Style } from "@/component/Alert/InlineMessage";
import Cover from "@/views/Absolute/Cover";
import Header from "@/views/Header/Header";
import StandardNavigation from "@/views/Layout/Default/StandardNavigation";
import clsx from "clsx";
import LookupForm from "@/pages/customer/lookup/LookupForm";
import Card from "@/pages/customer/lookup/Card/Card";
import NavBar from "@/component/NavBar";
import { Tooltip } from "react-tooltip";

export interface ID {
    sessionID: string;
    appointmentID: string;
}

export default function Page() {
    const [person, setPerson] = useState<ID|null>();
    const [appointment, setAppointment] = useState<DB_AppointmentSummary|null>();

    useEffect(() => {
        const load = async () => {
            if (!person)
                return;
            const summary = await SelectAppointmentSummary(person);
            setAppointment(summary);
        }
        load();
    }, [person]);

    return (
        <div className="relative bg-white flex flex-col min-h-screen">
            <NavBar sticky={true} border={true}/>
            <div className="relative pt-16 pb-8 px-16">
                <div className="flex flex-col justify-self-center w-[440px]">
                    <header className="flex flex-col items-center border-b- border-b-gray-200- pb-8">
                        <h3 className="text-center font-medium">Lookup Appointment</h3>
                        <p className="text-center text-md tracking-wide max-w-[440px] text-gray-400">Find any updates about your appointment by entering the appointment's ID and associated email address.</p>
                    </header>
                    {/* Form */}
                    <div className={clsx(
                        "flex flex-col justify-self-center py-4"
                    )}>
                        {/* 
                        The output of this form consists of 2
                        IDs: an appointment ID and a session ID.
                        If something went wrong, the "person"
                        is set to NULL.
                        */}
                        <LookupForm
                            setPerson={setPerson}
                        />
                        {/* Error Message */}
                        {person === null && 
                            // <div className="mt-2">
                            //     <InlineMessage
                            //         style={Style.Error}
                            //         message={`
                            //             No appointment matches this 
                            //             information. Please try again.
                            //         `}
                            //         closeMessage={() => setPerson(undefined)}    
                            //     />    
                                
                            // </div>
                            <Tooltip 
                                isOpen={true}
                                anchorSelect="#errorPopup"
                                opacity={1}
                                place="bottom"
                                border={"1px solid #fcd34d"}
                                style={{
                                    backgroundColor: "#fffbeb",
                                    boxShadow: "0px 2px 2px 0px #00000010",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0rem",
                                    borderRadius: "6px",
                                }}
                            >
                                <h6 className="text-02 tracking-wide text-gray-600">No appointment matches this information. Please try again.</h6>
                                <a href="/schedule" className="text-02 tracking-wide underline text-blue-500">Haven't scheduled an appointment?</a>
                            </Tooltip> 
                        }
                    </div>
                    {/* Appointment Information */}
                    {appointment &&
                        // <Cover>
                            <div className="absolute top-[0px] left-0 w-full flex h-[calc(100vh-54px)] items-center justify-center bg-black/10 backdrop-blur">
                                <Card
                                    appointment={appointment}
                                    closeAppointment={() => setAppointment(null)}
                                />
                            </div>
                        // </Cover>
                    }
                </div>
            </div>
        </div>
    )
}