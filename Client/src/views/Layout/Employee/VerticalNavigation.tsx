import clsx from "clsx";
import { ReactNode, useState } from "react";
import Logo from "../Default/Logo";
import ListIcon from "@/component/Icon/List";
import ViewList from "@/component/Icon/ViewList";
import Exposure from "@/component/Icon/Exposure";
import CalendarIcon from "@/component/Icon/Calendar";
import EditIcon from "@/component/Icon/Edit";
import PencilSquare from "@/component/Icon/PencilSquare";
import PencilSquareIcon from "@/component/Icon/PencilSquare";

export enum Pages {Dashboard, Events, View, Update};

interface VerticalNavigationProps {
    page: Pages;
    name: string;
    email: string;
    profilePictureURL: string;
}

export function NavLink({icon, link, selected}: {
    icon: ReactNode; 
    link: string;
    selected: boolean;
}) {
    return (
        <div 
            className={clsx(
                "flex items-center gap-2",
                "fill-gray-400 stroke-gray-400",
                selected && "fill-gray-950 stroke-gray-950"
            )}
        >
            {icon}
            <span 
                className={clsx(
                    "text-02 relative top-[0.5px]",
                    selected && "text-gray-950"
                )}
            >
                {link}
            </span>
        </div>
    )
}

// Links
// These contain the links listed
// on the vertical navigation. It
// doesn't need to be inside the component.
const navLinks: Array<[Pages, string, [ReactNode, string]]> = [
    [
        Pages.Dashboard, 
        "/employee/home/dashboard", 
        [(<ListIcon
            width="14"
            height="14"
            fill="inherit"
            stroke="inherit"
        />), "Dashboard"]
    ], 
    [
        Pages.View, 
        "/employee/home/view", 
        [(<ViewList
            width="14"
            height="14"
            fill="inherit"
            stroke="inherit"
        />), "View Appointment"]
    ],
    [
        Pages.Update, 
        "/employee/home/update", 
        [(<PencilSquareIcon
            width="14"
            height="14"
            fill="inherit"
            stroke="inherit"
        />), "Edit Appointment"]
    ],
    [   
        Pages.Events, 
        "/employee/home/events", 
        [(<CalendarIcon
            width="14"
            height="14"
            fill="inherit"
            stroke="inherit"
        />), "Events"]],
];

export default function VerticalNavigation(props: VerticalNavigationProps) {
    return (
        <div 
            className={clsx(
                "flex flex-col h-full min-h-screen w-[240px]",
                "border-r border-r-gray-200 fixed top-0"
            )}
        >
            {/* Logo */}
            <div className="p-4">
                <Logo/>
            </div>
            <div className="flex flex-col h-full justify-between p-4">
                {/* Tabs */}
                <div className="flex flex-col gap-2">
                    {navLinks.map((navLink, i) => (
                        <a 
                            key={i}
                            href={navLink[1]}
                            className={clsx(
                                "px-0 py-1",
                                "cursor-pointer",
                                "hover:bg-gray-50 rounded-md",
                                navLink[0] === props.page && `
                                    px-2
                                    border border-gray-200 
                                    rounded-md shadow-sm 
                                    hover:!bg-white
                                `
                            )}
                        >
                            <NavLink
                                icon={navLink[2][0]}
                                link={navLink[2][1]}
                                selected={navLink[0] === props.page}
                            />
                        </a>
                    ))}
                </div>
                {/* Profile */}
                <div 
                    className={clsx(
                        "w-full px-1 py-[0.25rem] flex gap-2 items-center",
                        "border border-gray-200 rounded-md"
                    )}
                >
                    {/* 
                    Profile Picture:
                    There's no functionality for a profile
                    picture right now. But I might add it later.
                    */}
                    <div 
                        className={clsx(
                            "w-9 h-9 aspect-square rounded",
                            "bg-gray-50 border border-gray-200",
                            props.profilePictureURL && `bg-[src(${props.profilePictureURL})]`
                        )}
                    />
                    {/*
                    Profile Information
                    */}
                    <div className="flex flex-col">
                        <span className="block text-02 text-gray-700 font-medium">
                            {props.name}
                        </span>
                        <span className="block text-01 relative top-[-2px]">
                            {props.email}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}