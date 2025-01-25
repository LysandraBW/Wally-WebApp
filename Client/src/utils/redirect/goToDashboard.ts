"use server";
import { redirect } from 'next/navigation';

export async function goToHome() {
    redirect(`/employee/home/dashboard`);
}