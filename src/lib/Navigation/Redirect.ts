"use server";
import { redirect } from 'next/navigation';

export async function goTo(url: string): Promise<void> {
    redirect(url);
}