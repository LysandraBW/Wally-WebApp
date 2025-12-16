"use client";
import AuthenticatedEmployee from "@/services/DB/Employee/AuthenticatedEmployee";
import { navigate } from "@/utils/navigate";
import { PAGE_EMPLOYEE_LOGIN } from '@/utils/constants';
import { useEffect, createContext, useState, JSX } from "react";
import { Employee as DB_Employee } from "waltronics-types";
import clsx from "clsx";
import Logo from "@/component/NavBar/Logo";
import { Tooltip } from "react-tooltip";
import { DM_Sans, IBM, Instrumental } from "@/public/Font";

export const EmployeeContext = createContext<{employee?: DB_Employee, setCurrentPage?: (page: string) => void}>({});

export default function Page({children}: Readonly<{children: React.ReactNode}>) {
    const [employee, setEmployee] = useState<DB_Employee>();
    const [currentPage, setCurrentPage] = useState("Dashboard");
    const [authenticated, setAuthenticated] = useState<boolean>();
    const [openProfile, setOpenProfile] = useState(false);
 
    useEffect(() => {
        const load = async () => {
            const employee = await AuthenticatedEmployee();
            setAuthenticated(!!employee);
            if (employee)
                setEmployee(employee);
        }
        load();
    }, []);

    useEffect(() => {
        if (authenticated !== undefined && !authenticated)
            navigate(PAGE_EMPLOYEE_LOGIN);
    }, [authenticated]);

    return (
        <div className="flex flex-col grow">
            {authenticated &&
                <EmployeeContext value={{employee, setCurrentPage}}>
                    <div 
                        className={clsx(
                            "h-full",
                            "grow",
                            "grid grid-cols-[256px_calc(100%-256px)] grid-rows-[64px_calc(100%-64px)]"
                        )}
                    >
                        <div 
                            className={clsx(
                                "h-full w-full",
                                "flex items-center justify-center",
                                "row-start-1 row-span-1",
                                "col-start-1 col-span-1",
                                "bg-gray-200-",
                                "border-r border-r-gray-300",
                                "border-b border-b-gray-300",
                                "shadow"
                            )}
                        >
                            <Logo
                                svgClassName="fill-blue-600 stroke-blue-600"
                                textClassName={clsx(DM_Sans.className, "tracking-tighter font-black")}
                            />
                        </div>
                        <div 
                            className={clsx(
                                "h-full p-4",
                                "flex flex-col gap-4",
                                "col-start-1 col-span-1",
                                "row-start-2 row-span-1",
                                "bg-gray-100",
                                "border-r border-r-gray-300"
                            )}
                        >
                            {[
                                [
                                    "Dashboard", 
                                    "/employee/home/dashboard", 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 stroke-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                ], 
                                [
                                    "View Appointment", 
                                    "/employee/home/view",
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 stroke-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                    </svg>
                                ], 
                                [
                                    "Edit Appointment", 
                                    "/employee/home/edit",
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 stroke-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                    </svg>
                                ], 
                                [
                                    "Calendar", 
                                    "/employee/home/events",
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 stroke-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                ]
                            ].map((value, i) => (
                                <a 
                                    key={i} 
                                    href={value[1] as string}
                                    className={clsx(
                                        "w-full block",
                                        "pr-2 px-2 py-1",
                                        "bg-white",
                                        "border border-gray-300 rounded-md shadow-sm",
                                        "transition-all group hover:bg-gray-50",
                                        "cursor-pointer",
                                        currentPage !== value[0] && `
                                            !border-gray-300
                                        `,
                                        currentPage === value[0] && `
                                            !bg-blue-600 !border-blue-500
                                        `
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "flex items-center gap-2",
                                            "text-sm text-gray-400 font-normal",
                                            "tracking-wide",
                                            "stroke-gray-400", 
                                            "group-hover:stroke-black group-hover:text-black",
                                            currentPage === value[0] && "!text-white !font-medium !stroke-white"
                                        )}
                                    >
                                        {value[2]}
                                        {value[0] as string}
                                    </div>
                                </a>
                            ))}
                        </div>
                        <nav 
                            className={clsx(
                                "h-full w-full px-4",
                                "flex items-center justify-end",
                                "col-start-2 col-span-1",
                                "row-start-1 row-span-1",
                                "border-b border-b-gray-300",
                                "bg-gray-100"
                            )}
                        >
                            <div 
                                id="profile" 
                                className={clsx(
                                    "w-10 h-10 aspect-square",
                                    "border border-gray-300 rounded-md",
                                    "bg-white shadow-sm",
                                    "overflow-hidden",
                                    "cursor-pointer",
                                    "hover:bg-gray-50"
                                )}
                                tabIndex={0}
                                onClick={() => setOpenProfile(true)}
                                onBlur={(event) => {
                                    if (event.currentTarget.contains(event.relatedTarget))
                                        return;
                                    setOpenProfile(false);
                                }}
                            >
                                <Tooltip 
                                    anchorSelect="#profile" 
                                    isOpen={openProfile}
                                    opacity={1}
                                    place="bottom-end"
                                    border="1px solid #D1D5DB"
                                    style={{
                                        width: "300px",
                                        backgroundColor: "white",
                                        borderRadius: "6px",
                                        padding: 0,
                                        boxShadow: "0px 2px 2px 0px #00000010",
                                        zIndex: 200,
                                        pointerEvents: "auto"
                                    }}
                                >
                                    <div className="w-full cursor-auto">
                                        <div className="flex flex-col items-center p-4 ">
                                            <div className="aspect-square w-10 h-10 mb-2 rounded-lg border border-gray-300 bg-white shadow-sm"></div>
                                            <span className="tracking-wide font-medium text-black text-sm">{employee?.FName} {employee?.LName}</span>
                                            <span className="tracking-wider font-medium text-gray-400 text-xs">{employee?.Email}</span>
                                        </div>
                                        <div className="p-2 border-t border-t-gray-300 flex flex-col items-end">
                                            <button className="flex tracking-wide text-xs items-center gap-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-min whitespace-nowrap hover:cursor-pointer hover:bg-gray-50 hover:stroke-black hover:text-black stroke-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 stroke-inherit">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                                </svg>
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        </nav>
                        <section 
                            className={clsx(
                                "h-full",
                                "flex flex-col grow",
                                "col-start-2 col-span-1",
                                "row-start-2 row-span-1",
                                "overflow-x-hidden"
                            )}
                        >
                            {children}
                        </section>
                    </div>
                </EmployeeContext>
            }
        </div>
    );
}