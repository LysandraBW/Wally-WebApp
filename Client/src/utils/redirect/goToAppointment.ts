"use server";
import { redirect } from 'next/navigation';

export async function goToAppointment(id: string) {
    redirect(`/Employee/Dashboard/Dashboard?AptID=${id}`);
}