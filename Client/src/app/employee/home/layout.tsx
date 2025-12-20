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
import ArrowLeftStartOnRectangle from "@/component/Icon/Icons/ArrowLeftStartOnRectangle";

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
                                "flex flex-col gap-2",
                                "col-start-1 col-span-1",
                                "row-start-2 row-span-1",
                                "bg-gray-100",
                                "border-r border-r-gray-300",
                            )}
                        >
                            {[
                                [
                                    "Dashboard", 
                                    "/employee/home/dashboard"
                                ], 
                                [
                                    "View Appointment", 
                                    "/employee/home/view"
                                ], 
                                [
                                    "Edit Appointment", 
                                    "/employee/home/update"
                                ], 
                                [
                                    "Calendar", 
                                    "/employee/home/events"
                                ]
                            ].map((value, i) => (
                                <a 
                                    key={i} 
                                    href={value[1] as string}
                                    className={clsx(
                                        "w-full block",
                                        "pr-2 px-2 py-2",
                                        "rounded-md",
                                        "transition-all group ",
                                        "cursor-pointer bg-gray-50 border border-gray-300 shadow-sm",
                                        currentPage !== value[0] && `
                                            hover:bg-gray-100 !py-1
                                        `,
                                        currentPage === value[0] && `
                                            !bg-white border !border-gray-300 shadow-sm
                                        `
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "flex items-center gap-1",
                                            "text-sm text-gray-400",
                                            "stroke-gray-400", 
                                            "group-hover:stroke-black group-hover:text-gray-700",
                                            currentPage === value[0] && "!text-gray-700 !font-medium !stroke-gray-700",
                                            currentPage !== value[0] && "!text-[0.75rem] tracking-wide"
                                        )}
                                    >
                                        {/* {value[2]} */}
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
                                                <ArrowLeftStartOnRectangle/>
                                                
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