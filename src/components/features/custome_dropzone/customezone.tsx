"use client";

import React, { useRef, useEffect, useState } from "react";
import * as SC from "./styles";
import { FileDrop } from "react-file-drop";
import SelectInput from "./selectInput";
import Coverzone from "./coverZone";
import { useDropFile } from "../../../../stores/useDropFile";
import { getDroppedFile } from "@/hooks/getDroppedFiles";
import DroppedFileNotNull from "./droppedFileNotNull";

interface IProps {};

function Customezone({}: IProps) {
  const [showDropZone, setShowDropZone] = useState<boolean>(false);
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const updateDroppedFile = useDropFile(
    (state: any) => state?.updateDroppedFile
  );
  
    let dragArea = window.document.querySelector(".dragarea");
    let mainDash = dragArea?.parentElement?.parentElement?.parentElement;
    console.log(mainDash)
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



  const fileInputRef = useRef<HTMLInputElement>(null);
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // do something with your files...
  };
  const onTargetClick = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.log(e);
  };

  const dropFiledata = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
   let files = getDroppedFile(ev);
    updateDroppedFile(files);
    setShowDropZone(false);
  };

  const dragoverCoverZone = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropZone(true);
    console.log("from drag cover " + showDropZone)
  };

  return (
    <div className=" px-8 w-full h-fit dragarea">
      {droppedFiles.length == 0 ? (
        <SC.DropZoneContainer className="w-full h-100  m-auto flex justify-center items-center">
          <Coverzone
              onDrop={(e) => dropFiledata(e)}
              onDragover={(e) => dragoverCoverZone(e)}
              isDropped={showDropZone}
            />
          <SelectInput />
        </SC.DropZoneContainer>
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
