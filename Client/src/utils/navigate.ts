"use server";
import { redirect } from 'next/navigation';

export const PAGE_APPOINTMENT = "Appointment";
export const PAGE_DASHBOARD = "Dashboard";
export const PAGE_EMPLOYEE_LOGIN = "EmployeeLogin";
export const PAGE_EDIT_APPOINTMENT = "EditAppointment";
export const PAGE_VIEW_APPOINTMENT = "ViewAppointment";

export async function navigate(page: string, data: {[k: string]: string} = {}) {
    if (page[0] == "/") {
        redirect(page);
        return;
    }

    switch (page) {
        case PAGE_APPOINTMENT: 
            redirect(`/employee/home/dashboard?aptID=${data.id}`); 
            return;
        case PAGE_DASHBOARD:
            redirect(`/employee/home/dashboard`); 
            return;
        case PAGE_EMPLOYEE_LOGIN: 
            redirect(`/employee/login`); 
            return;
        case PAGE_EDIT_APPOINTMENT:
            redirect(`/employee/home/edit?aptID=${data.appointmentID}`);
            return;
        case PAGE_VIEW_APPOINTMENT: 
            redirect(`/employee/home/view?aptID=${data.appointmentID}`);
            return;
    }
}