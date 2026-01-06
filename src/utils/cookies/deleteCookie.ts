"use server";
import { cookies } from "next/headers";

export const deleteCookie = async (name: string): Promise<void> => {
    (await cookies()).delete({
        name
    });
}