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

type Props = {};

function DroppedSingleFile({}: Props) {
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const updateDroppedFile = useDropFile((state: any) => state?.updateDroppedFile);
  // const {filetype , fileformat} = getFileType(file.type);

const changeFormat = (item:string, filetype:string , changeDataIndex:number)=>{
  let updateValue = droppedFiles.filter((droppedItem:IStateContent ,index:number)=>droppedItem.fileIndex ==changeDataIndex)
  let updateFilesCollection = droppedFiles.filter((droppedItems:IStateContent ,index:number)=>droppedItems.fileIndex !=changeDataIndex)
  let updateRealData = updateValue.map((updaterealitem:IStateContent  , inde:number)=>({...updaterealitem ,fileConversionFormat:item  ,fileType:filetype}))
  console.log(updateValue)
  console.log(updateFilesCollection)
  console.log(updateRealData)
// updateDroppedFile([...updateFilesCollection , ...updateRealData]);
//  let filedata =   droppedFiles.filter((item_obj:IStateContent , index:number )=>{
//     if(item_obj.fileIndex  == index)return {...item_obj , fileConversionFormat:filetype ,  }
//  });
  //  console.log(item,filetype,index)
}
  return (
    <div className="bg-transparent mb-3">
      {droppedFiles?.map((files:IStateContent, index: number) => {
  
        switch (getFileType(files?.file?.type).filetype.toLowerCase()) {
          case "image":
            return <RowTabDisplay key={index} image="image" files={files.file} index={index} onchange={(item:string)=>changeFormat(item , "image" , index)} />
            break;

          case "video":
            return <div className="" >
               {/* video components */}
               </div>;
        }
      })}
    </div>
  );
}

export default DroppedSingleFile;
