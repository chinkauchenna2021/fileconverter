import { writeFile, readFile, readdir, unlink } from "fs/promises";
import { promisify } from "util";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { join, extname, dirname } from "path";
import type { IFiles, IStateContent } from "../../../../types/fileTypes";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { ffmpegClient } from "@/libs/ffmpegClient";
import { randomUUID } from "crypto";
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
    const allfileConversion = fileRequest.get("uploadedFileObject");
    const jsonObject = JSON.parse(String(allfileConversion));
    console.log(jsonObject.data);
    // const  file:IFiles = fileRequest.get("uploadedFileObject") as unknown as File;
    // const fileConvertionextension = fileRequest.get('fileconversionext') as string ;
    // const fileconversionURLType  = fileRequest.get("fileconversionURLType") as string

    // if (!file) {
    //  return  NextResponse.json({ success: false });
    // }
    // const bytes = await file?.arrayBuffer();
    // const filedata = Buffer.from(bytes);
    // const convertURL = await ffmpegClient(file,filedata ,fileConvertionextension ,fileconversionURLType);

    return NextResponse.json(jsonObject);
  } catch {
    return NextResponse.json({ response: "not correct" });
  }
}
