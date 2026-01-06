"use client";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import { setCookie } from "@/utils/cookies/setCookie";
import { Tooltip } from "react-tooltip";
import { navigate } from "@/utils/navigate";
import { PAGE_DASHBOARD } from "@/utils/constants";
import Logo from "@/component/NavBar/Logo";

export default function Page() {
    const [sessionID, setSessionID] = useState<string>();

    useEffect(() => {
        if (!sessionID)
            return;
        setCookie("sessionID", sessionID);
        navigate(PAGE_DASHBOARD);
    }, [sessionID]);

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="grid grid-cols-[60%_40%] grow max-md:grid-cols-1">
                <div className="relative bg-[url('/pexels-kelly-1179532-4066863.jpg')] dark:bg-[url('/pexels-karoldach-409701.jpg')] bg-center bg-cover max-md:hidden">
                    <div className="relative top-8 left-8">
                        <Logo
                            white={true}
                        />
                    </div>
                </div>
                <div className="px-4 flex flex-col justify-center items-start gap-6">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="md:hidden">
                            <Logo/>
                        </div>
                        <header className="flex flex-col w-full">
                            <h3 className="text-base-900 text-2xl tracking-tight font-medium text-center mb-1">Welcome Back</h3>
                            <p className="text-sm text-gray-500 tracking-wide text-center">
                                Log in to your account here.
                            </p>
                        </header>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <LoginForm 
                            setSessionID={setSessionID}
                        />
                        {sessionID === "" && 
                            <Tooltip
                                isOpen={true}
                                anchorSelect="#errorPopup"
                                opacity={1}
                                place="bottom"
                                border="1px solid #FCF34D"
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
                                <h6 className="text-xs tracking-wide text-gray-500">
                                    No login matches this information. 
                                    Please try again.
                                </h6>
                            </Tooltip> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}