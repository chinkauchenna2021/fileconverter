'use client'

import { useEffect, useRef, useState } from 'react'
import * as SC from "../styles";
import { FiArrowRight } from "react-icons/fi";
import { FaDropbox, FaGoogleDrive, FaLessThan } from "react-icons/fa";

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useToast } from "@/components/ui/use-toast"



import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useDropFile } from "../../../../../../stores/useDropFile";
import { IStateContent } from "../../../../../../types/fileTypes";
import convertToaFileName from '@/hooks/convertToaFileName';
import MainFileContainer from './mainSelectFile';


type Props = {};

function SelectFileNotNull({}: Props) {

// state for ffmpeg
const [loaded, setLoaded] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const [converting , setConverting] = useState(true)
const ffmpegRef = useRef(new FFmpeg())
const videoRef = useRef<HTMLVideoElement | null>(null)
const messageRef = useRef<HTMLParagraphElement | null>(null)
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const convertedFiles = useDropFile((state: any) => state?.convertedFiles);
  const ffmpegFileLoadedState = useDropFile((state: any) => state?.ffmpegFileLoadedState);
  const droppedFileConverted = useDropFile(
    (state: any) => state?.fileSendToServer
  );
  const { toast } = useToast()


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


  useEffect(()=>{
    ffmpegFileLoadedState(loaded)
  },[ffmpegFileLoadedState, loaded])




  const transcode = async (file:File , oldFileName:string , newFileName:string , newFileMime:string) => {
    const ffmpeg = ffmpegRef.current
    // u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
    
    let dataURL =  URL.createObjectURL(file);
    await ffmpeg.writeFile(oldFileName, await fetchFile( String(dataURL)))
    await ffmpeg.exec(['-i', oldFileName, newFileName])
    const data = (await ffmpeg.readFile(newFileName)) as any
    return URL.createObjectURL(new Blob([data.buffer], { type: newFileMime }));
  }

  const onconvert = async () => {
    let returnConversion
      droppedFiles.forEach(async (data:IStateContent)=>{ 
       let  newFile  =  convertToaFileName(data.fileConversionFormat)
      const getFileMime = data.fileMode+"/"+data.fileConversionFormat ; 
      returnConversion  =  await transcode(data.file,  String(data.filename) , newFile,  getFileMime);
    })
    toast({
      title: "File conversion on-going",
      description: "Just hold on file conversion will be done in a minute",
    })

    if(returnConversion != null || returnConversion != undefined){
     setConverting(false)
    }
    if(loaded){
    toast({
      title: "File conversion completed",
      description: "File conversion is done and ready for download",
    })
    }

 console.log(loaded , isLoading , returnConversion , "converted successfully ");
  };

  return (
    <SC.SharedFileSelector className="border-none overflow-hidden flex  w-full h-20 border border-slate-800  flex-row justify-between items-center">
          <div className=" w-1/6   h-[40px]  px-5" >
           <MainFileContainer  />

          </div> 
      

       <div className='w-3/6'>

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
            <SC.AnimateArrow className="w-fit h-fit flex px-2 ">
              <FiArrowRight size={25} className="text-slate-300 " />
            </SC.AnimateArrow>
          </div>
        </div>
      </div>
      </div>
    </SC.SharedFileSelector>
  );
}

export default SelectFileNotNull;
