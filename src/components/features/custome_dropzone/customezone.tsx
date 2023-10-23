"use client";

import React, { useRef, useEffect, useState } from "react";
import * as SC from "./styles";
import { FileDrop } from "react-file-drop";
import SelectInput from "./selectInput";
import Coverzone from "./coverZone";
import { useDropFile } from "../../../../stores/useDropFile";
import { getDroppedFile } from "@/hooks/getDroppedFiles";
import DroppedFileNotNull from "./droppedFileNotNull";

type Props = {};

function Customezone({}: Props) {
  const [showDropZone, setShowDropZone] = useState<boolean>(false);
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);
  const updateDroppedFile = useDropFile(
    (state: any) => state?.updateDroppedFile
  );
  console.log("dropped file");
  console.log(droppedFiles, updateDroppedFile);

  useEffect(() => {
    let dragArea = window.document.querySelector(".dragarea");
    let mainDash = dragArea?.parentElement?.parentElement;

    mainDash?.addEventListener("dragover", (e) => {
      e.preventDefault();
      setShowDropZone(true);
    });

    mainDash?.addEventListener("dragleave", (e) => {
      e.preventDefault();
      setShowDropZone(false);
    });
  }, [showDropZone]);

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
   let files = getDroppedFile(ev);
    updateDroppedFile(files);
  };

  const dragoverCoverZone = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowDropZone(true);
  };

  return (
    <div className=" px-8 w-full h-fit dragarea">
        {(droppedFiles.length == 0)?
              <SC.DropZoneContainer className="w-full h-100  m-auto flex justify-center items-center">
              {showDropZone ? (
                <Coverzone
                  onDrop={(e) => dropFiledata(e)}
                  onDragover={(e) => dragoverCoverZone(e)}
                />
              ) : (
                ""
              )}
              <SelectInput />
            </SC.DropZoneContainer>

            :
      // file not empty section 
            <DroppedFileNotNull />

        }

    </div>
  );
}

export default Customezone;
