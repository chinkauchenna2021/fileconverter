import React, { ReactNode } from "react";
import Image from "next/image";
import { getFileType } from "@/hooks/geFileType";
import { useDropFile } from "../../../../../stores/useDropFile";
import { FaImage } from "react-icons/fa6";
import { getFileSize } from "@/hooks/getFileSize";
import { FiX, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import RowTabDisplay from "./shared/rowTabDisplay";

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
            return <RowTabDisplay image="image" files={files} index={index} />
            break;

          case "video":
            return <div className="">
               {/* video components */}
               </div>;
        }
      })}
    </div>
  );
}

export default DroppedSingleFile;
