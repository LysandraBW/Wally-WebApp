'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const setToken = async (data: any, name: string = 'JWT'): Promise<void> => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET || '');
    cookies().set({
        name,
        value: token,
        httpOnly: true,
        sameSite: true
    });
}

export const getToken = async (name: string = 'JWT'): Promise<string | undefined> => {
    const token = cookies().get(name)?.value;
    return token;
}