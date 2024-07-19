"use server";
import { cookies } from 'next/headers';

export async function getCookie(cookie: string)
: Promise<any> {
    return cookies().get(cookie);
}

export async function setCookie(cookieName: string, cookieValue: string)
: Promise<void> {
    cookies().set(cookieName, cookieValue);
}

export async function delCookie(cookieName: string)
: Promise<void> {
    cookies().delete(cookieName);
}