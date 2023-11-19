"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import * as SC from "./styles";
import SelectInput from "./selectInput";
import Coverzone from "./coverZone";
import { useDropFile } from "../../../../stores/useDropFile";
import { getDroppedFile } from "@/hooks/getDroppedFiles";
import DroppedFileNotNull from "./droppedFileNotNull";
import  {IStateContent} from '../../../../types/fileTypes'
import { getExtension } from "@/hooks/getFileExt";

interface IProps {};

function Customezone({}: IProps) {
  const [showDropZone, setShowDropZone] = useState<boolean>(false);
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);

  const updateDroppedFile = useDropFile(
    (state: any) => state?.updateDroppedFile
  );
  

useEffect(()=>{

  let dragArea = window.document.querySelector(".dragarea");
  let mainDash = dragArea?.parentElement?.parentElement?.parentElement;
  mainDash?.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropZone(true);
  });
  
  mainDash?.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropZone(false);
  });

},[showDropZone , setShowDropZone])  



  const fileInputRef = useRef<HTMLInputElement>(null);
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // do something with your files...
  };
  const onTargetClick = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {

  };

  const dropFiledata = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
   let files = getDroppedFile(ev);
   let filesUploadCollection:IStateContent[] = [];
   
   files.forEach((item , index)=>{
     let ext = getExtension(item.name);
    //  console.log(ext , item.name)
     let fileUploadData = {file:item , fileConversionFormat: "" , originalExt:ext , fileType:"" , fileIndex:index , isUploaded:false};
     filesUploadCollection.push(fileUploadData);

     
  })
  if(filesUploadCollection.length !== 0 ){
    updateDroppedFile(filesUploadCollection as IStateContent[]);
    setShowDropZone(false);
  }
  };

  const dragoverCoverZone = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropZone(true);
  };


  console.log(droppedFiles)

  return (
    <div className=" px-8 w-full h-fit">
      {droppedFiles.length == 0 ? (
      <>
            <Coverzone
            onDrop={(e) => dropFiledata(e)}
            onDragover={(e) => dragoverCoverZone(e)}
            isDropped={showDropZone}
          />
        <div className="dragarea" >
        <SC.DropZoneContainer className="w-full h-100  m-auto flex justify-center items-center">
          <SelectInput />
        </SC.DropZoneContainer>
        </div>
        </>

      ) : (
        // file not empty section
        <div className="dragarea">
            <Coverzone
              onDrop={(e) => dropFiledata(e)}
              onDragover={(e) => dragoverCoverZone(e)}
              isDropped={showDropZone}
            />
          <DroppedFileNotNull />
        </div>
      )}
    </div>
  );
}

export default Customezone;
