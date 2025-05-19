"use client";
import LoginForm from "../../../pages/employee/login/LoginForm";
import { useEffect, useState } from "react";
import { setCookie } from "@/utils/cookies/setCookie";
import { goToHome } from "@/utils/redirect/goToDashboard";
import Header from "@/pages/customer/schedule/Header";
import InlineMessage, { Style } from "@/component/Alert/InlineMessage";
import StandardNavigation from "@/views/Layout/Default/StandardNavigation";
import clsx from "clsx";
import NavBar from "@/component/NavBar/NavBar";
import { Tooltip } from "react-tooltip";

export default function Page() {
    const [sessionID, setSessionID] = useState<string>();

    useEffect(() => {
        if (!sessionID)
            return;
        setCookie("sessionID", sessionID);
        goToHome();
    }, [sessionID]);

    return (
        <div className="relative bg-white flex flex-col min-h-screen">
            <NavBar sticky={true} border={true}/>
            <div className="grid grid-cols-2 grow bg-gray-50">
                <div className="relative mx-16 py-20 bg-white border-l border-r border-r-gray-200 border-l-gray-200 shadow-lg- justify-center flex flex-col items-center gap-4">
                    <header className="flex flex-col items-center w-min">
                        <h3 className="text-center font-medium whitespace-nowrap">Log In</h3>
                    </header>
                    <div className="w-full max-w-[440px] flex justify-center">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full flex flex-col gap-4"
                        >
                            <LoginForm 
                                setSessionID={setSessionID}
                            />
                        </form>
                        {sessionID === "" && 
                            <Tooltip
                                isOpen={true}
                                anchorSelect="#errorPopup"
                                opacity={1}
                                place="bottom"
                                border={"1px solid #fcd34d"}
                                style={{
                                    backgroundColor: "#fffbeb",
                                    display: "flex",
                                    gap: "0rem",
                                    borderRadius: "6px",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    boxShadow: "0px 2px 2px 0px #00000010",
                                }}
                            >
                                <h6 className="text-02 tracking-wide text-gray-600">No appointment matches this information. Please try again.</h6>
                                <a href="/schedule" className="text-02 tracking-wide underline text-blue-500">Haven't scheduled an appointment?</a>
                            </Tooltip> 
                        }
                    </div>
                </div>
                <div className="bg-[url('../public/Sparks.jpg')]" style={{backgroundPosition: "center", backgroundSize: "cover"}}></div>
            </div>
        </div>
    )
}