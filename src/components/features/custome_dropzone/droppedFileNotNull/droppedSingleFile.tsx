import React, { ReactNode } from "react";
import Image from "next/image";
import { getFileType } from "@/hooks/geFileType";
import { useDropFile } from "../../../../../stores/useDropFile";
import { FaImage } from "react-icons/fa6";
import { getFileSize } from "@/hooks/getFileSize";
import { FiX , FiArrowRight } from "react-icons/fi";

type Props = {};

function DroppedSingleFile({}: Props) {
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  // const {filetype , fileformat} = getFileType(file.type);
  return (
    <div className="bg-transparent mb-3">
      {droppedFiles?.map((files: File, index: number) => {
        console.log(files);
        switch (getFileType(files.type).filetype.toLowerCase()) {
          case "image":
            return (
              <div key={index} className=" border-b border-b-slate-300 rounded-sm bg-white w-full h-14 grid grid-cols-6 flex-row shadow-sm shadow-blue-200">
                <div className="col-span-3 flex justify-start items-center">
                  <div className="w-fit h-fit flex space-x-5 justify-between mx-4">
                    <FaImage
                      className="text-blue-200 hover:text-blue-400 transition-colors"
                      size={25}
                    />
                    <div className="h-fit text-slate-600 tracking-wide text-sm font-light">
                      {files.name}
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex w-fit"></div>
                </div>
                <div className="col-span-2 flex">
                  <div className="w-4/5 flex items-center justify-evenly space-x-2 ">
                    <div className="w-fit h-fit text-xs px-2 py-[3px] rounded-sm border border-1 border-green-400 text-green-400 ">
                      Ready
                    </div>
                    <div className="mx-7 text-xs text-slate-500">
                      {getFileSize(files.size)}
                    </div>
                  </div>

                  <div className="w-full h-full justify-end flex items-center">
                    <div className="w-fit h-fit rounded-sm cursor-pointer p-1 hover:border hover:border-slate-500 mx-2">
                      <FiX
                        className="text-slate-400 hover:text-slate-500 "
                        size={30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
            break;
        }
      })}
    </div>
  );
}

export default DroppedSingleFile;
