import { writeFile, readFile, readdir, unlink} from "fs/promises";
import { promisify } from "util";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { join, extname, dirname } from "path";
import type { IFiles, IStateContent } from "../../../../types/fileTypes";
import { randomUUID } from "crypto";

import { object } from "zod";

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
    const outputFileMimeType = jsonObject.fileType+"/"+fileConverionType;
    let filePath = join("C:/Users/HP/Desktop/fileconvert/fileconverter/public/images/"+ fileName)
    let outputFileName = randomUUID()+"."+jsonObject.fileConversionFormat;
    let newFilePath = join("C:/Users/HP/Desktop/fileconvert/fileconverter/public/outputImages/"+ outputFileName)

    await writeFile(filePath,fileBlob,"base64");
    return NextResponse.json({filePath , fileName ,  outputFileMimeType , outputFileName , fileBlob ,  jsonObject , newFilePath });
  } catch {
    return NextResponse.json({ response: "not correct" });
  }
}
