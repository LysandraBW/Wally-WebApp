'use server';
import aws from "aws-sdk";
import crypto from 'crypto';

const region = process.env.REGION || '';
const bucketName = process.env.BKT || '';
const accessKeyId = process.env.AK || '';
const secretAccessKey = process.env.SAK || '';

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export async function uploadFile(file: File): Promise<string> {
    const rawBytes = crypto.randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const parameters = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });

    const URL = await s3.getSignedUrlPromise('putObject', parameters);
    
    await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: file
    });

    const imageURL = URL.split('?')[0];
    return imageURL;
}