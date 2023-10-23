import React, { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
      files:File
}

function DroppedSingleFile({ files}: Props) {
  return (
        <div className='bg-white shadow-md w-full h-16 flex'>
           {  files.type == ""
           }

         </div>
  )
}

export default DroppedSingleFile