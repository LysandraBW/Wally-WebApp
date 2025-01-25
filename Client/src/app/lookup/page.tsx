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
        <div>
            <StandardNavigation/>
            <div className="min-h-screen">
                    {/* Header */}
                    <Header
                        header="Lookup Appointment"
                        paragraph={`
                            Enter the ID and email address 
                            associated with your appointment
                            to learn more.
                        `}
                    />
                    {/* Form */}
                    <div className={clsx(
                        "flex flex-col justify-self-center py-4",
                        "min-w-[400px] max-w-[50%] w-[400px]"
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
                            <InlineMessage
                                style={Style.Error}
                                message={`
                                    No appointment matches this 
                                    information. Please try again.
                                `}
                                closeMessage={() => setPerson(undefined)}    
                            />
                        }
                    </div>
                {/* Appointment Information */}
                {appointment &&
                    <Cover>
                        <Card
                            appointment={appointment}
                            closeAppointment={() => setAppointment(null)}
                        />
                    </Cover>
                }
            </div>
        </div>
    )
}