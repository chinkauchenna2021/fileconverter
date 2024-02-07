import React from 'react'
import uuid  from 'random-uuid-v4';


function convertToaFileName(fileExt:string) {
    var uuidv4 = uuid();
    return uuidv4 +"."+fileExt ; 
}

export default convertToaFileName