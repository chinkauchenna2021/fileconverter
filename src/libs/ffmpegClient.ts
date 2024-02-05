"use client"

import { writeFile, readFile, readdir, unlink } from "fs/promises";
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { join, extname, dirname } from "path";
import { useRef, useState , useEffect } from "react";
// import { randomUUID } from "crypto";
// import prisma from "./prismaClientGlobal";
// import { getSessionIfNotNull } from "./auth";
// import { getFilename } from "@/hooks/getFilename";


export const FfmpegClient = async (fileName:string , filePath:string ,outputFileName:string ,outputFileMimeType:string) => {
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ffmpegRef = useRef(new FFmpeg())
  const [loadingState , setLoadingState] = useState<string>()

    const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.7/dist/umd'
    const ffmpeg = ffmpegRef.current
    ffmpeg.on('log', ({ message }) => {
     setLoadingState(message)
     console.log(message)
    })
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    })

    // u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
    await ffmpeg.writeFile(fileName, await fetchFile(filePath))
    await ffmpeg.exec(['-i', fileName, outputFileName])
    const data = (await ffmpeg.readFile(outputFileName)) as any
 const convertURL  =  URL.createObjectURL(new Blob([data.buffer], { type: outputFileMimeType }))
 return convertURL
  // return { blobURL: url  , loaded:loaded , isLoading:isLoading , loadingState:loadingState}
  }

