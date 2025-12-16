"use client";
import { useEffect, useState } from "react";
import LookupForm from "@/app/lookup/LookupForm";
import AppointmentDisplay from "@/app/lookup/AppointmentDisplay/AppointmentDisplay";
import NavBar from "@/component/NavBar/NavBar";
import { Tooltip } from "react-tooltip";
import { startForm } from "@/app/lookup/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import LookupAppointment from "@/services/DB/Appointment/LookupAppointment";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import SelectProtectedAppointment, { ROLE_APPOINTMENT } from "@/services/DB/Appointment/SelectProtectedAppointment";
import clsx from "clsx";

export interface ID {
    sessionID: string;
    appointmentID: string;
}

export default function Page() {
    const [user, setUser] = useState<ID|null>();
    const [appointment, setAppointment] = useState<DB_ProtectedAppointment|null>();
    const form = useForm("Lookup", startForm());


    useEffect(() => {
        const load = async () => {
            if (!user)
                return;
            const summary = await SelectProtectedAppointment(user.appointmentID, ROLE_APPOINTMENT);
            setAppointment(summary);
        }
        load();
    }, [user]);


    const submitForm = async () => {
        const output = await LookupAppointment(form.getData());
        setUser(output);
    }


    return (
        <div className="min-h-screen flex flex-col relative bg-white">
            <NavBar sticky={true} border={true} background={true} shadow={false}/>
            <div className={clsx("grow grid grid-cols-[50%_auto] relative", appointment && "max-md:grid-cols-1")}>
                <div className={clsx("flex flex-col items-center justify-center gap-8 relative py-16 px-16", appointment && "max-md:hidden")}>
                    <header className="flex flex-col items-center w-min">
                        <h3 className="text-center font-medium whitespace-nowrap">
                            Lookup Appointment
                        </h3>
                        <p className="max-w-[440px] text-center text-md tracking-wide text-gray-600">
                            Learn more about your appointment by entering 
                            the appointment's ID and associated email address.
                        </p>
                    </header>
                    <div className="flex flex-col w-[350px]">
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
                        {user === null && 
                            <Tooltip 
                                isOpen={true}
                                anchorSelect="#errorPopup"
                                opacity={1}
                                place="bottom"
                                border="1px solid #FCD34D"
                                style={{
                                    backgroundColor: "#FFFBEB",
                                    boxShadow: "0px 2px 2px 0px #00000010",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0rem",
                                    borderRadius: "6px",
                                    pointerEvents: "auto"
                                }}
                            >
                                <h6 className="text-02 text-gray-600 tracking-wide">
                                    No appointment matches this information. 
                                    Please try again.
                                </h6>
                                <a 
                                    href="/schedule" 
                                    className="text-02 text-blue-500 tracking-wide underline"
                                >
                                    Haven't scheduled an appointment?
                                </a>
                            </Tooltip> 
                        }
                    </div>
                </div>
                <div className="bg-gray-200 bg-cover bg-center bg-no-repeat">
                    {appointment &&
                        <div className="bg-gray-200 h-full w-full">
                            <AppointmentDisplay
                                appointment={appointment}
                                closeAppointment={() => setAppointment(null)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}