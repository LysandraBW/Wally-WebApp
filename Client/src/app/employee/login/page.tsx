"use client";
import LoginForm from "../../../pages/employee/login/LoginForm";
import { useEffect, useState } from "react";
import { setCookie } from "@/utils/cookies/setCookie";
import { goToHome } from "@/utils/redirect/goToDashboard";
import Header from "@/views/Header/Header";
import InlineMessage, { Style } from "@/component/Alert/InlineMessage";
import StandardNavigation from "@/views/Layout/Default/StandardNavigation";
import clsx from "clsx";

export default function Page() {
    const [sessionID, setSessionID] = useState<string>();

    useEffect(() => {
        if (!sessionID)
            return;
        setCookie("sessionID", sessionID);
        goToHome();
    }, [sessionID]);

    return (
        <div>
            <StandardNavigation/>
            <div className="flex flex-col py-4">
                <Header
                    header="Log In"
                    paragraph="Login to your account."
                />
                <div 
                    className={clsx(
                        "flex",
                        "justify-center"
                    )}>
                    <div
                        className="w-[400px] py-4"
                    >
                        <LoginForm 
                            setSessionID={setSessionID}
                        />
                        {sessionID === "" && 
                            <InlineMessage
                                style={Style.Error}
                                message="Login didn't work. Try again."
                                closeMessage={() => {
                                    setSessionID(undefined);
                                }}    
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}