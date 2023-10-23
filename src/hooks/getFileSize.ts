import React from 'react';

export const getFileSize = (fileSize:number):string=>{
    const FILE_CONVERSION_VALUE = 1024 ; 
return (Math.floor((fileSize / FILE_CONVERSION_VALUE) / FILE_CONVERSION_VALUE) == 0)? Math.floor((fileSize / FILE_CONVERSION_VALUE))+" KB" : Math.floor((fileSize / FILE_CONVERSION_VALUE) / FILE_CONVERSION_VALUE)+ " MB" ; 
}
