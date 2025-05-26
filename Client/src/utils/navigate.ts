"use server";
import { redirect } from 'next/navigation';
import { PAGE_APPOINTMENT, PAGE_DASHBOARD, PAGE_EMPLOYEE_LOGIN, PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from './constants';

export async function navigate(page: string, data: {[k: string]: string} = {}) {
    if (page[0] == "/") {
        redirect(page);
    }
    else if (page === PAGE_APPOINTMENT) {
        redirect(`/employee/home/dashboard?appointmentID=${data.id}`); 
    }
    else if (page === PAGE_DASHBOARD) {
        redirect(`/employee/home/dashboard`); 
    }
    else if (page === PAGE_EMPLOYEE_LOGIN) {
        console.log(2);
        redirect(`/employee/login`); 
    }
    else if (page === PAGE_EDIT_APPOINTMENT) {
        redirect(`/employee/home/edit?appointmentID=${data.appointmentID}`);
    }
    else if (page === PAGE_VIEW_APPOINTMENT) {
        redirect(`/employee/home/view?appointmentID=${data.appointmentID}`);
    }
}