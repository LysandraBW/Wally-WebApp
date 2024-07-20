'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const setToken = (data: any, name: string = 'JWT'): void => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET || '');
    cookies().set({
        name,
        value: token,
        httpOnly: true
    });
}

export const authorizeToken = async (callback: (...args: any[]) => Promise<boolean>, name: string = 'JWT'): Promise<any> => {
    const token = cookies().get(name)?.value;
    if (!token)
        return null;

    console.log(3);
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', async (err, data) => {
        // Error
        if (err)
            return null;

        // Authenticate
        if (!(await callback(data)))
            return null;

        // Authorized
        return data;
    });
    return data;
}