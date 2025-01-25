"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const setCookie = async (name: string, data: any): Promise<void> => {
    const token = jwt.sign(data, process.env.ATS || '');
    (await cookies()).set({
        name,
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: true
    });
}