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


function AllFileControls() {
    return (
        <div
          className=" border-b border-b-slate-300 rounded-sm  w-full h-12  flex justify-center items-center flex-row shadow-sm shadow-blue-200"
        >
          <div className=" w-full h-full flex justify-center items-center">
            <div className="w-fit flex justify-center items-center">
              <div className="w-fit h-fit text-sm text-slate-400 mx-2">change all :</div>
              <div className="w-fit h-fit">
                <SelectFileConversion onchange={(item:string)=>""} />
              </div>
            </div>
          </div>
        </div>
      );
}

export default AllFileControls