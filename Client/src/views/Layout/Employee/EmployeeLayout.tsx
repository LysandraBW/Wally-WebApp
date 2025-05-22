import { Fragment, ReactNode, useEffect, useState } from "react";
import VerticalNavigation, { Pages } from "./VerticalNavigation";
import { Employee as DB_Employee } from "waltronics-types";
import BreadCrumb from "./BreadCrumb";
import clsx from "clsx";
import SelectEmployee from "@/services/DB/Employee/SelectEmployee";

interface EmployeeLayoutProps {
    page: Pages;
    path: Array<[string, ReactNode]>;
    children?: ReactNode;
}

export default function EmployeeLayout(props: EmployeeLayoutProps) {
    const [employee, setEmployee] = useState<DB_Employee>();

    useEffect(() => {
        const load = async () => {
            const employee = await SelectEmployee();
            if (!employee)
                return;
            setEmployee(employee);
        }
        load();
    }, []);

    return (
        <div className="grid grid-cols-[240px_auto] overflow-x-clip relative">
            {employee &&
                <Fragment>
                    <VerticalNavigation
                        page={props.page}
                        name={`${employee.FName} ${employee.LName}`}
                        email={employee.Email}
                        profilePictureURL=""
                    />
                    <div 
                        className={clsx(
                            "flex flex-col",
                            "overflow-x-scroll scroll-hide",
                            "col-start-2 min-h-screen"
                        )}
                    >
                        <BreadCrumb
                            path={props.path}
                        />
                        <div>
                            {props.children}
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}