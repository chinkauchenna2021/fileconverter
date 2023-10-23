import React from 'react'


type FileType = {
    resourceType:string
}

export const getFileType =({resourceType}:FileType):string=>{
   let image = resourceType.split("/");
   return image[0];
};