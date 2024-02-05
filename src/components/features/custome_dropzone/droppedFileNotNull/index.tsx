import React from 'react'
import DroppedSingleFile from './droppedSingleFile';
import * as SC from '../droppedFileNotNull/styles';
import { useDropFile } from '../../../../../stores/useDropFile';
import SelectFileNotNull from './shared/selectFileNotNull';

type Props = {}

function  DroppedFileNotNull({}: Props) {
  const droppedFiles = useDropFile((state: any) => state?.droppedFiles);

  return (
    <SC.SingleFileContainer  className=" ">
        <DroppedSingleFile />
        <SelectFileNotNull />
        
    </SC.SingleFileContainer>
  )
}

export default DroppedFileNotNull