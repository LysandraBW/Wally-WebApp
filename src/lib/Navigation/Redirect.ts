"use server";
import { redirect } from 'next/navigation';

export async function goTo(url: string) {
    redirect(url);
}

export async function goToEmployeeLogin() {
    redirect(`/Employee/Login`);
}

export async function goToDashboard() {
    redirect(`/Employee/Dashboard/Dashboard`);
}

export async function goToApt(aptID: string | null) {
    if (!aptID)
        throw 'Appointment ID is NULL';
    redirect(`/Employee/Dashboard/Dashboard?AptID=${aptID}`);
}

export async function goToUpdateApt(aptID: string | null) {
    if (!aptID)
        throw 'Appointment ID is NULL';
    redirect(`/Employee/Dashboard/Update?AptID=${aptID}`);
}