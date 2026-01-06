"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<any> => {
    console.log("getCookie")
    console.log("Name", name)
    const token = (await cookies()).get(name);
    console.log("Token", token);
    if (!token)
        return null;
    console.log("Token Value", token.value);
    return jwt.verify(token.value, process.env.ATS || '');
}