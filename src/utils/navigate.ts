"use server";
import { redirect } from 'next/navigation';
import { PAGE_APPOINTMENT, PAGE_DASHBOARD, PAGE_EDIT_APPOINTMENT, PAGE_EMPLOYEE_LOGIN, PAGE_LOOKUP_APPOINTMENT, PAGE_SCHEDULE_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from './constants';

export async function navigateToPage(page: "/" | typeof PAGE_SCHEDULE_APPOINTMENT | typeof PAGE_LOOKUP_APPOINTMENT | typeof PAGE_DASHBOARD | typeof PAGE_APPOINTMENT | typeof PAGE_EMPLOYEE_LOGIN | typeof PAGE_EDIT_APPOINTMENT | typeof PAGE_VIEW_APPOINTMENT, data: {[k: string]: string} = {}) {
    if (page[0] == "/") {
        redirect(page);
    }
    else if (page === PAGE_APPOINTMENT) {
        redirect(`/employee/home/dashboard?appointmentID=${data.appointmentID}`); 
    }
    else if (page === PAGE_DASHBOARD) {
        redirect(`/employee/home/dashboard`); 
    }
    else if (page === PAGE_EMPLOYEE_LOGIN) {
        redirect(`/employee/login`); 
    }
    else if (page === PAGE_EDIT_APPOINTMENT) {
        redirect(`/employee/home/update?appointmentID=${data.appointmentID}`);
    }
    else if (page === PAGE_VIEW_APPOINTMENT) {
        redirect(`/employee/home/view?appointmentID=${data.appointmentID}`);
    }
    else if (page === PAGE_SCHEDULE_APPOINTMENT) {
        redirect(`/schedule`);
    }
    else if (page === PAGE_LOOKUP_APPOINTMENT) {
        redirect(`/lookup`);
    }
}