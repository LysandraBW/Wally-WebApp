import crypto from "crypto";

export default function randomKey() {
    const rawBytes = crypto.randomBytes(16);
    return rawBytes.toString('hex');
}