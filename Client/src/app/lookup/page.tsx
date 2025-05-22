"use client";
import { useEffect, useState } from "react";
import LookupForm from "@/pages/customer/lookup/LookupForm";
import Card from "@/pages/customer/lookup/Card/Card";
import NavBar from "@/component/NavBar/NavBar";
import { Tooltip } from "react-tooltip";
import { startForm } from "@/pages/customer/lookup/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import LookupAppointment from "@/services/DB/Appointment/LookupAppointment";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import SelectProtectedAppointment, { ROLE_APPOINTMENT } from "@/services/DB/Appointment/SelectProtectedAppointment";

export interface ID {
    sessionID: string;
    appointmentID: string;
}

export default function Page() {
    const [person, setPerson] = useState<ID|null>();
    const [appointment, setAppointment] = useState<DB_ProtectedAppointment|null>();
    
    const form = useForm("Lookup", startForm());

    useEffect(() => {
        const load = async () => {
            if (!person)
                return;
            const summary = await SelectProtectedAppointment(person.appointmentID, ROLE_APPOINTMENT);
            setAppointment(summary);
        }
        load();
    }, [person]);

    const submitForm = async () => {
        const output = await LookupAppointment(form.getData());
        setPerson(output);
    }

    return (
        <div className="relative bg-white flex flex-col min-h-screen">
            <NavBar sticky={true} border={true}/>
            <div className="relative py-16 px-16 flex flex-col items-center gap-8">
                <header className="flex flex-col items-center w-min">
                    <h3 className="text-center font-medium whitespace-nowrap">Lookup Appointment</h3>
                    <p className="text-center text-md tracking-wide max-w-[440px] text-gray-600">Learn more about your appointment by entering the appointment's ID and associated email address.</p>
                </header>
                {/* Form */}
                <div className={"flex flex-col w-[350px]"}>
                    {/* 
                        The output of this form consists of 2
                        IDs: an appointment ID and a session ID.
                        If something went wrong, the "person"
                        is set to NULL.
                    */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-full flex flex-col gap-4"
                    >
                        <LookupForm
                            form={form}
                            submitForm={submitForm}
                        />
                    </form>
                    {/* Error Message */}
                    {person === null && 
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
                    <div className="absolute top-[0px] left-0 w-full flex h-[calc(100vh-54px)] items-center justify-center bg-black/10 backdrop-blur">
                        <Card
                            appointment={appointment}
                            closeAppointment={() => setAppointment(null)}
                        />
                    </div>
                }
            </div>
        </div>
    )
}