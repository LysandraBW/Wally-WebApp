"use client";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import { setCookie } from "@/utils/cookies/setCookie";
import NavBar from "@/component/NavBar/NavBar";
import { Tooltip } from "react-tooltip";
import { navigate } from "@/utils/navigate";
import { PAGE_DASHBOARD } from "@/utils/constants";

export default function Page() {
    const [sessionID, setSessionID] = useState<string>();

    useEffect(() => {
        if (!sessionID)
            return;
        setCookie("sessionID", sessionID);
        navigate(PAGE_DASHBOARD);
    }, [sessionID]);

    return (
        <div className="relative min-h-screen flex flex-col bg-white">
            <NavBar sticky={true} border={true}/>
            <div className="grid grid-cols-2 grow">
                <div className="py-20 flex flex-col justify-center items-start justify-self-center gap-6 relative bg-white">
                    <header className="flex flex-col max-w-[400px]">
                        <h3 className="font-medium whitespace-nowrap">Log In</h3>
                        <p className="max-w-[440px] text-md text-gray-600 font-medium tracking-wide">
                            Welcome back!
                        </p>
                    </header>
                    <div className="w-full min-w-[350px] flex justify-center">
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
                                <h6 className="text-02 tracking-wide text-gray-600">
                                    No login matches this information. 
                                    Please try again.
                                </h6>
                            </Tooltip> 
                        }
                    </div>
                </div>
                <div className="bg-[url('../public/Sparks.jpg')] bg-center bg-cover"/>
            </div>
        </div>
    )
}