'use server';
import aws from "aws-sdk";
import crypto from 'crypto';

// Thanks to Sam Meech-Ward
// https://www.youtube.com/watch?v=yGYeYJpRWPM&list=LL&index=1

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

// Converting the FileList to a FormData for Submission
export const fileListToFormData = (fileList: FileList): FormData => {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++)
        formData.append('Files', fileList[i]);
    return formData;
}

// Creating the URL for Uploading
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

// Uploading the File
export async function uploadFile(URL: string, data: File | FormData): Promise<string> {
    try {
        await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data
        });
    }
    catch (err) {
        console.error(err);
        return '';
    }

    const imageURL = URL.split('?')[0];
    return imageURL;
}