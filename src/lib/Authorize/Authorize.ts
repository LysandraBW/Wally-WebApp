'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const setSessionID = async (data: any, name: string = 'SessionID'): Promise<void> => {
    const token = jwt.sign(data, process.env.ATS || '');
    cookies().set({
        name,
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: true
    });
}

export const getSessionID = async (
    name: string = 'SessionID'
): Promise<any | undefined> => {
    const token = cookies().get(name)?.value;
    if (!token)
        return undefined;

    const data = jwt.verify(token, process.env.ATS || '');
    return data;
}