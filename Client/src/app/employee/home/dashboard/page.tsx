"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/pages/employee/dashboard/Dashboard";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";

export default function Page() {
    return (
        <div className="">
            {/* <EmployeeLayout
                page={Pages.Dashboard}
                path={[[
                    "/employee/home/dashboard", "Dashboard"
                ]]}
            > */}
                <Dashboard/>
            {/* </EmployeeLayout> */}
        </div>
    )
}