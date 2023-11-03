import React from "react";
import * as SC from "../styles";
import { FiArrowRight } from "react-icons/fi";
import { FaDropbox, FaGoogleDrive } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {};

function SelectFileNotNull({}: Props) {
  return (
    <SC.SharedFileSelector className="border-none overflow-hidden w-full h-20 border border-slate-800 grid grid-cols-5 flex-row justify-between items-center">
      <div className="col-span-3"></div>

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
            <TooltipContent className="bg-black">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my Google Drive
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="h-full w-full col-span-3 bg-red-600 cursor-pointer">
          <div className="justify-between px-1 items-center w-full h-20 bg-[#fd2929] z-10 flex border-red-500 ">
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
