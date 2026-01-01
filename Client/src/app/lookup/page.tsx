"use client";
import { useEffect, useState } from "react";
import Form from "@/app/lookup/Form";
import Report from "@/app/lookup/Report/Report";
import { startForm } from "@/app/lookup/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import LookupAppointment from "@/services/DB/Appointment/LookupAppointment";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import SelectProtectedAppointment, { ROLE_APPOINTMENT } from "@/services/DB/Appointment/SelectProtectedAppointment";
import Logo from "@/component/NavBar/Logo";
import { navigate } from "@/utils/navigate";
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
            const summary = await SelectProtectedAppointment(
                user.appointmentID, 
                ROLE_APPOINTMENT
            );
            setAppointment(summary);
        }
        load();
    }, [user]);


    const submitForm = async () => {
        const output = await LookupAppointment(form.getData());
        setUser(output);
    }


    const goBack = async () => {
        if (appointment)
            setAppointment(null);
        else
            navigate("/");
    }

    
    return (
        <div 
            className={clsx(
                "[--lWidth:40%] [--rWidth:60%]",
                "grid grid-cols-[var(--lWidth)_var(--rWidth)] max-lg:block",
                "h-full",
                appointment && "!block"
            )}
        >
            {!appointment &&
                <>
                    <div className="relative w-full h-full px-4 flex flex-col gap-4 justify-center">
                        <div className="w-full flex justify-center">
                            <Logo/>
                        </div>
                        <div className="w-full flex flex-col items-center gap-6">
                            <header className="text-center flex flex-col gap-1 items-center">
                                <h3 className="text-base-900 text-2xl tracking-tight font-medium">
                                    Lookup Appointment
                                </h3>
                                <p className="text-base-500 text-sm tracking-wide">
                                    Learn more about your appointment
                                </p>
                            </header>
                            <Form
                                user={user}
                                form={form}
                                submitForm={submitForm}
                            />
                        </div>
                    </div>
                    <div className="relative w-full h-full bg-black max-lg:!hidden">
                        <img
                            src="../patrick-mcgregor-NS0WZ8XnEdk-unsplash.jpg"
                            className="fixed top-0 w-[var(--rWidth)] h-screen object-cover object-center block dark:hidden max-lg:!hidden"
                        />
                        <img
                            src="../leila-barrani-RoDMT7O2Tx4-unsplash.jpg"
                            className="fixed top-0 w-[var(--rWidth)] h-screen object-cover object-center hidden dark:block max-lg:!hidden"
                        />
                    </div>
                </>
            }
            {appointment &&
                <Report
                    appointment={appointment}
                    closeAppointment={() => setAppointment(null)}
                />
            }
        </div>
    )
}