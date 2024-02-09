import React from 'react'
import * as SC from './styles'
import { AiOutlinePlus } from "react-icons/ai";
import { useDropFile } from '../../../../../../../stores/useDropFile';
import { getFileInput } from '@/hooks/getDroppedFiles';
import { IStateContent } from '../../../../../../../types/fileTypes';
import { getExtension } from '@/hooks/getFileExt';


type Props = {}

function MainFileContainer({}: Props) {
    const updateDroppedFile = useDropFile((state)=>state.updateDroppedFile);

    let filesUploadCollection:IStateContent[] = [];
    const addMoreFiles = (event: React.ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault();
        let fileCollection = getFileInput(event.target)
        fileCollection.map((item:any, index:number)=>{
            let ext = getExtension(item.name);
            //  console.log(ext , item.name)  
             let fileUploadData = {file:item , fileConversionFormat: "" ,filename:item.name, originalExt:ext , fileType:item.type, fileMode:"image" , fileIndex:index , isUploaded:false};
             filesUploadCollection.push(fileUploadData);
        })

        if(filesUploadCollection.length > 0){
            updateDroppedFile(filesUploadCollection);
    
          }
}
  return ( 
        <SC.SelectContainer className="min-w-26 relative  h-full cursor-pointer  backdrop-blur-lg bg-white flex flex-row justify-evenly items-center" >
              <SC.SelectFile onChange={(event)=>addMoreFiles(event)}  className="absolute top-0 left-0 w-full h-full" type="file" />
             <SC.IconHolder >
             <AiOutlinePlus size={20} />
             </SC.IconHolder>
             <SC.TextHolder className="text-indigo-950 tracking-wide text-sm">
                      Add File
             </SC.TextHolder>
        </SC.SelectContainer> 
  )
}

export default MainFileContainer;