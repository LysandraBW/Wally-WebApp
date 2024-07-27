'use server';
import aws from "aws-sdk";
import crypto from 'crypto';

// Thanks to Sam Meech-Ward
// https://www.youtube.com/watch?v=yGYeYJpRWPM&list=LL&index=1

const region = process.env.REGION || '';
const bucketName = process.env.BKT || '';
const accessKeyId = process.env.AK || '';
const secretAccessKey = process.env.SAK || '';
const {}

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export async function generateURL(): Promise<string> {
    const rawBytes = crypto.randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const parameters = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });

    try {
        const URL = await s3.getSignedUrlPromise('putObject', parameters);
        return URL;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}

export async function uploadFile(URL: string, file: File): Promise<string> {
    try {
        await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: file
        });
    }
    catch (err) {
        console.error(err);
        return '';
    }

    const imageURL = URL.split('?')[0];
    return imageURL;
}