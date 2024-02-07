import React from "react";
import { FaImage } from "react-icons/fa6";
import { getFileSize } from "@/hooks/getFileSize";
import { FiX, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SelectFileConversion from "./selectFileConversion";

type Props = {
  index: number;
  files: File;
  image: string;
  onchange:(item:string)=>void;
  onclick:()=>void;

};

function RowTabDisplay({ index, files , onchange , onclick  }: Props) {
  return (
    <div
      key={index}
      className=" border-b border-b-slate-300 rounded-sm bg-dark w-full h-14 grid grid-cols-6 flex-row shadow-sm shadow-blue-200"
    >
      <div className="col-span-2 flex justify-start items-center">
        <div className="w-fit h-fit flex space-x-5 justify-between mx-4">
          <FaImage
            className="text-blue-500 hover:text-blue-600 transition-colors"
            size={25}
          />
          <div className="h-fit text-slate-600 tracking-wide text-sm font-light">
            {files.name}
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full h-full flex justify-center items-center">
        <div className="w-fit flex justify-center items-center">
          <div className="w-fit h-fit text-sm text-slate-400 mx-2">to:</div>
          <div className="w-fit h-fit">
            <SelectFileConversion onchange={(item:string)=>onchange(item)} />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex">
        <div className="w-4/5 flex items-center justify-evenly space-x-2 ">
          <div className="w-fit h-fit text-xs px-2 py-[3px] rounded-sm border border-1 border-green-400 text-green-400 ">
            Ready
          </div>
          <div className="mx-10 text-xs  text-slate-500">
            {getFileSize(files.size)}
          </div>
        </div>

        <div  className="w-full h-full justify-end flex items-center">
          <div onClick={()=>onclick()} className="w-fit h-fit rounded-sm cursor-pointer p-1 hover:border hover:border-slate-500 mx-2">
            <FiX  className="text-slate-400 hover:text-slate-500 " size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowTabDisplay;
