import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

interface CustomFile extends File {
  arrayBuffer(): Promise<ArrayBuffer>;
}

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
  //   signatureVersion: "v4",
});

async function uploadFileToS3(file: Buffer, fileName: string) {// , fileSaveDirectory, contentType) {
  const fileBuffer = file;
  fileName = fileName.replace(/ /g, "");

  // console.log("FILE NAME", fileBuffer);

  const params: PutObjectRequest = {
    Bucket: process.env.BUCKET_NAME || "default-bucket",
    Key: fileName,//  ${fileSaveDirectory}/${fileName},
    Body: fileBuffer,
    // ContentType: contentType,
  };

  const response = await s3.upload(params).promise();

  if (!response) {
    throw new Error("Upload failed");
  }

  // console.log("Response: ", response, "Response.key: ", response.Key);
  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.BUCKET_NAME,
    Key: response.Key,
  });
  return url.split("?")[0];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // console.log("FORM DATA", formData);
    const file = formData.get("file") as CustomFile;
    // const fileSaveDirectory = formData.get("fileSaveDirectory");
    // const contentType = formData.get("contentType");

    console.log("FILE", file);

    if (!file) {
      return NextResponse.json(
        {
          error: "No file selected",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadFileToS3(
      buffer,
      file.name,
      // fileSaveDirectory,
      // contentType
    );

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (err: any) {
    console.log("ERROR", err.message);
    return NextResponse.json({
      error: err.message,
    });
  }
} 