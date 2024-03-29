import React, { ReactNode } from "react";
import Image from "next/image";
import { getFileType } from "@/hooks/geFileType";
import { useDropFile } from "../../../../../stores/useDropFile";
import { FaImage } from "react-icons/fa6";
import { getFileSize } from "@/hooks/getFileSize";
import { FiX, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import RowTabDisplay from "./shared/rowTabDisplay";
import { IStateContent } from "../../../../../types/fileTypes";
import { updatefile } from "@/hooks/updatefileCollection";

type Props = {};

function DroppedSingleFile({}: Props) {
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const deleteFile = useDropFile((state: any) => state?.deleteFile);

  const fileTypeToConvert = useDropFile(
    (state: any) => state?.fileTypeToConvert
  );

  const changeFormat = (
    item: string,
    filetype: string,
    changeDataIndex: number
  ) => {
    let updatedCollection = updatefile(
      item,
      filetype,
      changeDataIndex,
      droppedFiles
    );
    fileTypeToConvert(updatedCollection);
  };

  const closeSingleTab = (index: number) => {
    // console.log(file , index)
    deleteFile(index);
  };

  // console.log(droppedFiles);

  return (
    <div className="bg-transparent mb-3">
      {droppedFiles?.map((files: IStateContent, index: number) => {
        switch (getFileType(files?.file?.type).filetype.toLowerCase()) {
          case "image":
            return (
              <RowTabDisplay
                key={index}
                image="image"
                files={files.file}
                index={index}
                onchange={(item: string) => changeFormat(item, "image", index)}
                onclick={() => closeSingleTab(index)}
              />
            );
            break;

          case "video":
            return <div className="">{/* video components */}</div>;
            break;
          case "audio":
            break;
        }
      })}
    </div>
  );
}

export default DroppedSingleFile;
