"use server";
import { redirect } from 'next/navigation';

export async function goToEmployeeLogin() {
    redirect(`/Employee/Login`);
}