import React from 'react'
import DroppedSingleFile from './droppedSingleFile';
import * as SC from '../droppedFileNotNull/styles';
import { useDropFile } from '../../../../../stores/useDropFile';
import SelectFileNotNull from './shared/selectFileNotNull';
import AllFileControls from './shared/AllFileControls';

type Props = {}

function  DroppedFileNotNull({}: Props) {
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);

  return (
    <SC.SingleFileContainer  className=" ">
        <DroppedSingleFile />
        {(droppedFiles.length > 1) && 
        <AllFileControls />}
        <SelectFileNotNull />  
    </SC.SingleFileContainer>
  )
}

export default DroppedFileNotNull