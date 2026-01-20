"use client";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import { setCookie } from "@/utils/cookies/setCookie";
import { Tooltip } from "react-tooltip";
import { navigateToPage } from "@/utils/navigate";
import Logo from "@/component/NavBar/Logo";
import { PAGE_DASHBOARD } from "@/utils/constants";
import AuthenticatedEmployee from "@/services/db/Employee/AuthenticatedEmployee";
import clsx from "clsx";
import { getPreferredColorScheme } from "@/shared/colorScheme";

export default function Page() {
    const [sessionID, setSessionID] = useState<string>();
    const [colorScheme, setColorScheme] = useState("");
        
    useEffect(() => {
        const load = async () => {
            const colorScheme = getPreferredColorScheme(window);
            setColorScheme(colorScheme);
        }
        load();
    }, []);

    
    useEffect(() => {
        if (!sessionID)
            return;

        setCookie("sessionID", sessionID);
        navigateToPage(PAGE_DASHBOARD);
    }, [sessionID]);


    useEffect(() => {
        const load = async () => {
            const authenticated = await AuthenticatedEmployee();
            if (authenticated !== false)
                navigateToPage(PAGE_DASHBOARD);
        }
        load();
    }, []);
    

    return (
        <div 
            className={clsx(
                "relative min-h-screen flex flex-col",
                colorScheme,
                "bg-base-0"
            )}
        >
            <div className="grid grid-cols-[60%_40%] grow max-md:grid-cols-1">
                <div className="relative bg-[url('/pexels-kelly-1179532-4066863.jpg')] dark:bg-[url('/pexels-karoldach-409701.jpg')] bg-center bg-cover max-md:hidden">
                    <div className="relative top-8 left-8">
                        <Logo
                            white={true}
                        />
                    </div>
                </div>
                <div className="px-16 max-sm:px-4 flex flex-col justify-center items-center gap-6">
                    <div className="md:hidden w-full flex justify-center">
                        <Logo
                            svgClassName="dark:stroke-white dark:fill-white"
                        />
                    </div>
                    <div className="w-[min(calc(100%),400px)] flex flex-col gap-6">
                        <header className="flex flex-col w-full">
                            <h3 className="text-base-900 text-2xl tracking-tight font-medium text-center mb-1">
                                Welcome Back
                            </h3>
                            <p className="text-sm text-gray-500 tracking-wide text-center">
                                Log in to your account here.
                            </p>
                        </header>
                        <div className="w-full flex flex-col items-center">
                            <LoginForm 
                                sessionID={sessionID}
                                setSessionID={setSessionID}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}