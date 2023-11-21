interface ISelectProps{
    image : string[],
    video : string[],
    audio : string[] 
}

export const fetchSelectedFiletype = (datatype:string,selectedFile:ISelectProps):string[]=> {
   if(datatype == 'videos'){
      return selectedFile.video ; 
   }else if(datatype == 'audio'){
    return selectedFile.audio ; 
   }else{

    return selectedFile.image ; 
   }
}