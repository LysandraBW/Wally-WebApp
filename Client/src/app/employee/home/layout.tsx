"use client";
import AuthenticatedEmployee from "@/services/DB/Employee/AuthenticatedEmployee";
import { navigate } from "@/utils/navigate";
import { PAGE_EMPLOYEE_LOGIN } from '@/utils/constants';
import { useEffect, createContext, useState, JSX } from "react";
import { Employee as DB_Employee } from "waltronics-types";
import clsx from "clsx";
import Logo from "@/component/NavBar/Logo";
import { Tooltip } from "react-tooltip";
import { DM_Sans, IBM, Instrumental, PublicSans } from "@/public/fonts/Font";
import ArrowLeftStartOnRectangle from "@/component/Icons/Icons/ArrowLeftStartOnRectangleIcon";
import Wrapper from "./Wrapper";
import SquaresPlusIcon from "@/component/Icons/Icons/SquaresPlusIcon";
import Squares2By2Icon from "@/component/Icons/Icons/Squares2By2Icon";
import AdjustmentsHorizontalIcon from "@/component/Icons/Icons/AdjustmentsHorizontalIcon";
import Bars3BottomLeftIcon from "@/component/Icons/Icons/Bars3BottomLeftIcon";
import CalendarIcon from "@/component/Icons/Icons/CalendarIcon";
import Tab from "./Tab";
import PencilSquareIcon from "@/component/Icons/Icons/PencilSquareIcon";
import Profile from "./Profile";
import SunIcon from "@/component/Icons/Icons/SunIcon";
import MoonIcon from "@/component/Icons/Icons/MoonIcon";
import ThemeButton from "./ThemeButton";

export const EmployeeContext = createContext<{employee?: DB_Employee, setCurrentPage?: (page: string) => void}>({});

export default function Page({children}: Readonly<{children: React.ReactNode}>) {
    const [employee, setEmployee] = useState<DB_Employee>();
    const [currPage, setCurrPage] = useState("Dashboard");
    const [authenticated, setAuthenticated] = useState<boolean>();
 

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
        <div 
            className={clsx(
                "h-full flex grow gap-x-4 p-4",
                Instrumental.className
            )}
        >
            {authenticated &&
                <EmployeeContext 
                    value={{employee, setCurrentPage: setCurrPage}}
                >
                    <Wrapper
                        id="VNavBar"
                        outerClassName="w-[192px_!important] min-w-[192px_!important]"
                        innerClassName="p-2 flex flex-col gap-2"
                    >
                        <div className="py-1 px-2 flex justify-center bg-base-0 dark:bg-base-50 border border-base-300 dark:border-base-200 rounded-[5px] shadow-sm">
                            <Logo
                                metallic={true}
                            />
                        </div>
                        <div className="w-full h-full pt-2 flex flex-col gap-2 border-t border-base-300 dark:border-base-200">
                            <Tab
                                icon={
                                    <Squares2By2Icon 
                                        className="size-4 stroke-inherit"
                                    />
                                }
                                name="Dashboard"
                                href="/employee/home/dashboard"
                                currentTab={currPage === "Dashboard"}
                            />
                            <Tab
                                icon={
                                    <Bars3BottomLeftIcon 
                                        className="size-4 stroke-inherit"
                                    />
                                }
                                name="View Appointment"
                                href="/employee/home/view"
                                currentTab={currPage === "View Appointment"}
                            />
                            <Tab
                                icon={
                                    <PencilSquareIcon 
                                        className="size-4 stroke-inherit"
                                    />
                                }
                                name="Edit Appointment"
                                href="/employee/home/update"
                                currentTab={currPage === "Edit Appointment"}
                            />
                            <Tab
                                icon={
                                    <CalendarIcon 
                                        className="size-4 stroke-inherit"
                                    />
                                }
                                name="Calendar"
                                href="/employee/home/events"
                                currentTab={currPage === "Calendar"}
                            />
                        </div>
                    </Wrapper>
                    <div className="h-full flex flex-col grow gap-y-4">
                        <Wrapper
                            id="HNavBar"
                            outerClassName="h-min"
                            innerClassName="h-min p-2 flex items-center justify-between gap-2 overflow-y-auto"
                        >
                            <span className="block text-xs text-base-400 tracking font-medium">
                                {currPage}
                            </span>
                            <div className="flex items-center gap-2">
                                {employee &&
                                    <Profile
                                        employee={employee}
                                    />
                                }
                            </div>
                        </Wrapper>
                        <Wrapper
                            outerClassName="!bg-base-300 dark:!bg-base-200"
                        >
                            {children}
                        </Wrapper>
                    </div>
                </EmployeeContext>
            }
        </div>
    );
}