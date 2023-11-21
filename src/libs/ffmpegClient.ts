"use client"

import { writeFile, readFile, readdir, unlink } from "fs/promises";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { join, extname, dirname } from "path";
import { useRef, useState , useEffect } from "react";
import { randomUUID } from "crypto";
import prisma from "./prismaClientGlobal";
// import { getSessionIfNotNull } from "./auth";
import { getFilename } from "@/hooks/getFilename";


type Ifiles = File | null;
type Filedata = Buffer;
type FileconversionType = string;
type FileURLType = string;

export const FfmpegClient = async (originalFileDir:string , originalFileName:string ,conversionFiledir:string , fileconversionName:string) => {
  
  
  (async(originalFileName ,fileconversionName)=>{
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();
      ffmpeg.FS('writeFile',originalFileName, await fetchFile(originalFileDir));
      await ffmpeg.run('-i', originalFileName, fileconversionName);
      await writeFile(conversionFiledir, ffmpeg.FS('readFile', fileconversionName));
    })(originalFileName ,fileconversionName)
 

  }
