import React from 'react'
import { Dropzone, FileMosaic } from "@dropzone-ui/react";

type Props = {}

function Dropzones({}: Props) {

    const [files, setFiles] = React.useState([]);
    const updateFiles = (incommingFiles:any) => {
        console.log(incommingFiles)
      setFiles(incommingFiles);
    };

  return (
     <div>



     </div>


  //   <Dropzone onChange={updateFiles} value={files} onError={()=>{}} className=' border-2 border-blue-300 '>
  //   {files.map((file:any) => (
  //     <FileMosaic {...file} preview/>
  //   ))}
  // </Dropzone>
  )
}

export default Dropzones