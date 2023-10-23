import React from 'react'
import DroppedSingleFile from './droppedSingleFile';
import * as SC from '../droppedFileNotNull/styles';

type Props = {}

function DroppedFileNotNull({}: Props) {
  return (
    <SC.SingleFileContainer className='flex flex-col justify-center items-center w-full min-h-fit  shadow  shadow-card'>
       <DroppedSingleFile />
    </SC.SingleFileContainer>
  )
}

export default DroppedFileNotNull