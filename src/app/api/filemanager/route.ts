import { writeFile, readFile, readdir, unlink } from "fs/promises";
import { promisify } from "util";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { join, extname, dirname } from "path";
import type { IFiles, IStateContent } from "../../../../types/fileTypes";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { ffmpegClient } from "@/libs/ffmpegClient";
import { randomUUID } from "crypto";
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
    // const objJson = JSON.stringify(allfileConvert)
    const jsonObject = await JSON.parse(String(alldata)) as IStateContent;
    let fileBlob = String(jsonObject.file).split(',')[1];
    let filePath = join("C:/Users/HP/Desktop/fileconvert/fileconverter/public/images/"+ randomUUID()+"."+jsonObject.originalExt)
     await writeFile(filePath,fileBlob,"base64")
    // const  file:IFiles = fileRequest.get("uploadedFileObject") as unknown as File;
    // const fileConvertionextension = fileRequest.get('fileconversionext') as string ;
    // const fileconversionURLType  = fileRequest.get("fileconversionURLType") as string
     console.log(filePath , __dirname)
    // if (!file) {
    //  return  NextResponse.json({ success: false });
    // }
    // const bytes = await file?.arrayBuffer();
    // const filedata = Buffer.from(bytes);
    // const convertURL = await ffmpegClient(file,filedata ,fileConvertionextension ,fileconversionURLType);

    return NextResponse.json(fileBlob);

  } catch {

    return NextResponse.json({ response: "not correct" });

  }
}
