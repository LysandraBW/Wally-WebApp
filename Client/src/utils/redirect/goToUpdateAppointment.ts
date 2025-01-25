"use server";
import { redirect } from 'next/navigation';

export async function goToUpdateAppointment(appointmentID: string) {
    redirect(`/employee/home/update?ApptID=${appointmentID}`);
}