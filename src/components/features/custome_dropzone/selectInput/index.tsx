import React, { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as SC from '@/components/features/custome_dropzone/selectInput/style'
import { FiFolderPlus } from "react-icons/fi";
import { FaDropbox , FaGoogleDrive } from "react-icons/fa";
import { IStateContent } from '../../../../../types/fileTypes';
import { getExtension } from '@/hooks/getFileExt';
import { useDropFile } from '../../../../../stores/useDropFile';
import { getFileInput } from '@/hooks/getDroppedFiles';
import { EventEmitter } from 'stream';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// import DropboxChooser from 'react-dropbox-chooser'
// FaDropbox
type Props = {}


function SelectInput({}: Props) {

const updateDroppedFile = useDropFile((state)=>state.updateDroppedFile);

  // const { openFilePicker, filesContent, loading, errors } = useFilePicker({
  //   readAs: 'DataURL',
  //   accept: '*',
  //   multiple: true,
  //   validators: [
  //     new FileAmountLimitValidator({ max: 10 }),
  //     // new FileTypeValidator(['jpg', 'png']),
  //     new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
  //     // new ImageDimensionsValidator({
  //     //   maxHeight: 900, // in pixels
  //     //   maxWidth: 1600,
  //     //   minHeight: 600,
  //     //   minWidth: 768,
  //     // }),
  //   ],
  // });

  // useEffect(()=>{

  //    let filesUploadCollection = [];
  //     filesContent.map((data , index)=>{
  //         let ext = getExtension(String(data.name))
  //         let fileUploadData = {file:data.content , fileConversionFormat: "" ,filename:data.name, originalExt:ext , fileType:ext, fileMode:"image" , fileIndex:index , isUploaded:false};
  //         filesUploadCollection.push(fileUploadData); 
  //         updateDroppedFile(filesUploadCollection);
  //       console.log(data , index , fileUploadData , filesUploadCollection)
  //     })       
  // },[filesContent, updateDroppedFile])
  let filesUploadCollection:IStateContent[] = [];
  const openFilePicker = (evt:React.ChangeEvent<HTMLInputElement>) =>{
        evt.preventDefault();
    let fileCollection = getFileInput(evt.target)
    fileCollection.map((item:any, index:number)=>{
      let ext = getExtension(item.name);
      //  console.log(ext , item.name)  
       let fileUploadData = {file:item , fileConversionFormat: "" ,filename:item.name, originalExt:ext , fileType:item.type, fileMode:"image" , fileIndex:index , isUploaded:false};
       filesUploadCollection.push(fileUploadData);
       
    })
      // console.log(evt.);
      if(filesUploadCollection.length > 0){
        updateDroppedFile(filesUploadCollection);
      }
}

  return (
      <SC.SelectBar className="min-w-[520px] h-[70px] rounded-md hover:cursor-pointer hover:shadow-lg hover:shadow-black">
           <div className='w-full h-full flex justify-center items-center'>
                  <div className='w-3/6 h-full flex justify-center items-center text-white font-medium capitalize text-xl'  >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="picture" type="file" multiple className='text-white outline-none border-0'  onChange={(evt) => openFilePicker(evt)}  style={{backgroundColor:"transparent" , border:"none"}}/>
                  </div>
                    </div>
                  <div className='w-3/6 flex justify-evenly h-5/6 px-2 gap-1'>
                   <TooltipProvider>
                   <Tooltip >
                  <TooltipTrigger>
                  <div className='w-full  h-[100%] justify-center flex items-center'><FiFolderPlus size={26}  className="text-white" /></div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my Folder
              </span>
            </TooltipContent>
              </Tooltip>
              <Tooltip >
                  <TooltipTrigger>
                  <div className='w-full  h-[100%]  justify-center flex items-center hover:bg-[rgba(0,0,0,0.05)]'>
                    <FaDropbox size={26}  className="text-white" /></div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my Dropbox
              </span>
            </TooltipContent>
            </Tooltip>
            <Tooltip>
                  <TooltipTrigger>
                  <div  className='w-full h-[100%] justify-center flex items-center'><FaGoogleDrive size={26}  className="text-white" /></div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
              <span className="w-full text-xs bg-black text-white rounded-sm px-3 py-2">
                Save files to my GoogleDrive
              </span>
            </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                  </div>

           </div>

      </SC.SelectBar>
  )
}

export default SelectInput