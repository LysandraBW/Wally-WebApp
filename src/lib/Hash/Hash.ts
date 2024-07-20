'use server';
import CryptoJS from "crypto-js";

export const encrypt = (text: string): string => {
    const key = process.env.HASH_KEY;
    if (!key)
        throw 'Key DNE';
    return CryptoJS.AES.encrypt(text, key).toString();
}

export const decrypt = (cipherText: string): string => {
    const key = process.env.HASH_KEY;
    if (!key)
        throw 'Key DNE';
    const bytes  = CryptoJS.AES.decrypt(cipherText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}