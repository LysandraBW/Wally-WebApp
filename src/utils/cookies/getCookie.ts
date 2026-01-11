"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<any> => {
    const token = (await cookies()).get(name);
    if (!token)
        return null;
    return jwt.verify(token.value, process.env.ATS || '');
}