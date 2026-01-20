"use client";
import { useEffect, useState } from "react";
import Form from "@/app/lookup/Form";
import Report from "@/app/lookup/Report/Report";
import { startForm } from "@/app/lookup/_DEF";
import useForm from "@/features/Form/useForm/useForm";
import LookupAppointment from "@/services/db/Appointment/LookupAppointment";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";
import SelectProtectedAppointment, { ROLE_APPOINTMENT } from "@/services/db/Appointment/SelectProtectedAppointment";
import Logo from "@/component/NavBar/Logo";
import { navigateToPage } from "@/utils/navigate";
import clsx from "clsx";
import { getPreferredColorScheme } from "@/shared/colorScheme";


export interface ID {
    sessionID: string;
    appointmentID: string;
}


export default function Page() {
    const [user, setUser] = useState<ID|null>();
    const [appointment, setAppointment] = useState<DB_ProtectedAppointment|null>();
    const form = useForm("Lookup", startForm());

    const [colorScheme, setColorScheme] = useState("");
    
    useEffect(() => {
        const load = async () => {
            const colorScheme = getPreferredColorScheme(window);
            setColorScheme(colorScheme);
        }
        load();
    }, []);

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

    
    return (
        <div 
            className={clsx(
                "[--lWidth:40%] [--rWidth:60%]",
                "grid grid-cols-[var(--lWidth)_var(--rWidth)] max-lg:block",
                "h-full",
                appointment && "!block",
                colorScheme,
                "bg-base-0"
            )}
        >
            {!appointment &&
                <>
                    <div className="relative w-full h-full px-8 flex flex-col ">
                        <div className="pt-8">
                            <Logo
                                svgClassName="dark:stroke-white dark:fill-white"
                            />
                        </div>
                        <div className="relative w-full grow px-12 flex flex-col items-center justify-center gap-6">
                            <div className="flex flex-col items-center gap-4 w-[min(100%,400px)]">
                                <header className="text-center flex flex-col gap-1 items-center">
                                    <h3 className="text-base-900 text-2xl tracking-tight font-medium">
                                        Find Your Appointment
                                    </h3>
                                    <p className="text-base-500 dark:text-base-400 text-sm tracking-wide">
                                        Learn more about your appointment
                                    </p>
                                </header>
                            </div>
                            <div className="flex flex-col items-center w-[min(100%,400px)]">
                                <Form
                                    user={user}
                                    form={form}
                                    submitForm={submitForm}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-full bg-black max-lg:!hidden">
                        <img
                            src="../patrick-mcgregor-NS0WZ8XnEdk-unsplash.jpg"
                            className="fixed top-0 w-[var(--rWidth)] h-screen object-cover object-center block dark:hidden max-lg:!hidden"
                        />
                        <img
                            src="../patrick-mcgregor-NS0WZ8XnEdk-unsplash.jpg"
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