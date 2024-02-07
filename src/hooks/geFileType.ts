import React from 'react'


interface IReturnType{
    filetype:string;
    fileformat:string
}

export const getFileType =(resourceType:string):IReturnType=>{
        let image = resourceType.split("/");
        return {filetype:image[0] , fileformat:image[1]};

};