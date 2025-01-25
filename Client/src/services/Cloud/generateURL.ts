"use server";
import aws from "aws-sdk";
import crypto from "crypto";

// Sam Meech-Ward
// youtube.com/watch?v=yGYeYJpRWPM&list=LL&index=1

const region = process.env.REGION || "";
const bucketName = process.env.BKT || "";
const accessKeyId = process.env.AK || "";
const secretAccessKey = process.env.SAK || "";
const signatureVersion = "v4";

const S3 = new aws.S3({
    region, 
    accessKeyId, 
    secretAccessKey, 
    signatureVersion
});

export async function generateURL(): Promise<string> {
    try {
        const rawBytes = crypto.randomBytes(16);
        const imageName = rawBytes.toString('hex');

        const parameters = {
            Key: imageName,
            Bucket: bucketName,
            Expires: 60
        };
    
        const url = await S3.getSignedUrlPromise('putObject', parameters);
        return url;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}