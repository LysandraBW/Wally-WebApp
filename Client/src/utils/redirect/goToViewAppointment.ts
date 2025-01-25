"use server";
import { redirect } from 'next/navigation';

export async function goToViewAppointment(appointmentID: string) {
    redirect(`/employee/home/view?ApptID=${appointmentID}`);
}