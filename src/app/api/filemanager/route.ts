import { writeFile, readFile, readdir, unlink} from "fs/promises";
import { promisify } from "util";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { join, extname, dirname } from "path";
import type { IFiles, IStateContent } from "../../../../types/fileTypes";
import { FfmpegClient } from "../../../libs/ffmpegClient";
import { randomUUID } from "crypto";
import { object } from "zod";

// import {upcast} from "upcast"
const executeProcess = promisify(exec);

interface IState {
  data: IStateContent[];
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  try {
    const fileRequest = await request.formData();
    const alldata =  await fileRequest.get("uploadedFileObject");
    const jsonObject = await JSON.parse(String(alldata)) as IStateContent;
    let fileBlob =  String(jsonObject.file).split(',')[1];
    let fileName =  randomUUID()+"."+jsonObject.originalExt ;
    const fileConverionType = jsonObject.fileConversionFormat;
    const mimeType = jsonObject.fileType+"/"+fileConverionType;
    let filePath = join("C:/Users/HP/Desktop/fileconvert/fileconverter/public/images/"+ fileName)
    let outputFileName = randomUUID()+"."+jsonObject.fileConversionFormat;
    let newFilePath = join("C:/Users/HP/Desktop/fileconvert/fileconverter/public/images/"+ outputFileName)

    await writeFile(filePath,fileBlob,"base64");

    await FfmpegClient(filePath , fileName ,newFilePath ,outputFileName)
  //  const returndata =  await ffmpeg.exec(['-i',fileName, outputPath])
  //   const data = await ffmpeg.readFile('readFile', outputPath)
    const returndata = "nice"
    
    //  let baseFile =  base64ToFile(jsonObject.file as any);
    // let url = URL.createObjectURL(fileBlob as any)
    // console.log(baseFile)
    // let blobFile =   await uploadImage(jsonObject.file as any , jsonObject.filename as string ) as unknown  as File
    //  const newfile =  urltoFile(String(jsonObject.file) , jsonObject.file as any , jsonObject.fileType) ;
    //  await writeFile(filePath,fileBlob,"base64");
    //  console.log(blobFile)
    // const  file:IFiles = fileRequest.get("upload edFileObject") as unknown as File;
    // const fileConvertionextension = fileRequest.get('fileconversionext') as string ;
    // const fileconversionURLType  = fileRequest.get("fileconversionURLType") as string
    // const filesObject = new File([fileBlob] , "image" ,{type:jsonObject.fileType})
    // const newFile = await blobToFile(fileBlob,fileName)
    //  console.log(filePath , newFile)
    // if (!file) {
    //  return  NextResponse.json({ success: false });
    // }
    // const bytes = await file?.arrayBuffer();
    // const filedata = Buffer.from(bytes);
    // fileName: string,
    // filedata:  Blob,
    // conversionexttype: FileconversionType,
    // convesionURLType: FileURLType
    // const convertURL = await ffmpegClient(jsonObject.filename as string,fileBlob as any ,jsonObject.fileConversionFormat ,jsonObject.fileType);
    return NextResponse.json({returndata});
  } catch {

    return NextResponse.json({ response: "not correct" });

  }
}
