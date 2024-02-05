'use client'

import { useEffect, useRef, useState } from 'react'
import * as SC from "../styles";
import { FiArrowRight } from "react-icons/fi";
import { FaDropbox, FaGoogleDrive } from "react-icons/fa";

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'



import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useDropFile } from "../../../../../../stores/useDropFile";
import { IStateContent } from "../../../../../../types/fileTypes";

type Props = {};

function SelectFileNotNull({}: Props) {

// state for ffmpeg
const [loaded, setLoaded] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const ffmpegRef = useRef(new FFmpeg())
const videoRef = useRef<HTMLVideoElement | null>(null)
const messageRef = useRef<HTMLParagraphElement | null>(null)
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const droppedFileConverted = useDropFile(
    (state: any) => state?.fileSendToServer
  );


  useEffect(()=>{
    (async () => {
     setIsLoading(true)
     const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
     const ffmpeg = ffmpegRef.current
     ffmpeg.on('log', ({ message }) => {
       if (messageRef.current) messageRef.current.innerHTML = message
     })
     // toBlobURL is used to bypass CORS issue, urls with the same
     // domain can be used directly.
     await ffmpeg.load({
       coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
       wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
     })
     setLoaded(true)
     setIsLoading(false)
   })()


  },[])


  const transcode = async () => {
    const ffmpeg = ffmpegRef.current
    // u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
    await ffmpeg.writeFile('input.avi', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi'))
    await ffmpeg.exec(['-i', 'input.avi', 'output.mp4'])
    const data = (await ffmpeg.readFile('output.mp4')) as any
      console.log(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  }

  const onconvert = async () => {
    // droppedFiles.forEach((data:IStateContent)=>{
      await transcode()
      console.log(loaded , isLoading);

    // })
    // droppedFileConverted(droppedFiles);
  };

  return (
    <SC.SharedFileSelector className="border-none overflow-hidden w-full h-20 border border-slate-800 grid grid-cols-5 flex-row justify-between items-center">
      <div className="col-span-3">
     
        {/* added for ffmpeg loader  */}
      {isLoading && (
        <span className="animate-spin ml-3">
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
          </svg>
        </span>
      )}


      </div>

      <div className=" col-span-2 grid grid-cols-5 justify-between items-center dragarea">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex justify-center items-center h-20 w-full col-span-1 backdrop-blur bg-black/40 cursor-pointer">
                <FaDropbox size={26} className="text-slate-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my Dropbox
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex justify-center items-center h-20 w-full col-span-1 backdrop-blur bg-black/40 cursor-pointer">
                <FaGoogleDrive size={26} className="text-slate-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my Google Drive
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="h-full w-full col-span-3 bg-red-600 cursor-pointer">
          <div
            onClick={() => onconvert()}
            className="justify-between px-1 items-center w-full h-20 bg-[#fd2929] z-10 flex border-red-500 "
          >
            <div className="w-fit h-fit text-md cursor-pointer capitalize font-semibold text-white px-2 ">
              convert
            </div>
            <div className="w-fit h-fit flex px-2 ">
              <FiArrowRight size={25} className="text-slate-300 " />
            </div>
          </div>
        </div>
      </div>
    </SC.SharedFileSelector>
  );
}

export default SelectFileNotNull;
