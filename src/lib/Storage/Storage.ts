'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const setCookie = async (name: string, data: any): Promise<void> => {
    const token = jwt.sign(data, process.env.ATS || '');
    cookies().set({
        name,
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: true
    });
}

export const getCookie = async (name: string): Promise<any | undefined> => {
    const token = cookies().get(name);
    if (!token)
        return undefined;
    const data = jwt.verify(token.value, process.env.ATS || '');
    return data;
}

export const setSessionID = async (data: any): Promise<void> => {
    await setCookie('SessionID', data);
}

export const getSessionID = async (): Promise<any | undefined> => {
    return await getCookie('SessionID');
}