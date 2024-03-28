import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

interface CustomFile extends File {
    arrayBuffer(): Promise<ArrayBuffer>;
}

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
    //   signatureVersion: "v4",
});

async function uploadFileToS3(
    file: Buffer,
    fileName: string,
    fileSaveDirectory: string,
    userId?: string // Optional user ID
) {
    // , fileSaveDirectory, contentType) {
    const fileBuffer = file;
    fileName = fileName.replace(/ /g, '');

    const params: PutObjectRequest = {
        Bucket: process.env.BUCKET_NAME || 'default-bucket',
        Key: userId
            ? `${fileSaveDirectory}/${fileName}-${userId}`
            : `${fileSaveDirectory}/${fileName}`,
        Body: fileBuffer,
        // ContentType: contentType,
    };

    const response = await s3.upload(params).promise();

    if (!response) {
        throw new Error('Upload failed');
    }

    const url = s3.getSignedUrl('getObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: response.Key,
    });
    return url.split('?')[0];
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as CustomFile;
        const fileSaveDirectory = formData.get('fileSaveDirectory') as string;
        const userId = formData.get('userId') as string | undefined;

        if (!file) {
            throw new Error('No file selected');
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const url = await uploadFileToS3(
            buffer,
            file.name,
            fileSaveDirectory,
            userId
            // contentType
        );

        return NextResponse.json({
            success: true,
            url,
        });
    } catch (err: any) {
        throw new Error(err.message);
    }
}

async function deleteFileFromS3(url: string) {
    const keyRegex = /https:\/\/.*?\/(.*)/;

    const keyMatch = url.match(keyRegex);

    if (!keyMatch) {
        throw new Error('Invalid URL format');
    }

    const key = keyMatch[1];

    const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
    };

    await s3.deleteObject(params).promise();
}

export async function DELETE(request: Request) {
    try {
        const { url } = await request.json();
        if (!url) {
            throw new Error('URL is required');
        }

        await deleteFileFromS3(url);

        return NextResponse.json({
            success: true,
        });
    } catch (err: any) {
        throw new Error(err.message);
    }
}
