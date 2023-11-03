interface ISelectProps{
    image : string[],
    video : string[],
    audio : string[] 
}

export const fetchSelectedFiletype = (datatype:string,selectedFile:ISelectProps):string[]=> {
   if(datatype == 'videos'){
    console.log(datatype , selectedFile.video)
      return selectedFile.video ; 
   }else if(datatype == 'audio'){
    console.log(datatype , selectedFile.audio)
    return selectedFile.audio ; 
   }else{
    console.log(datatype , selectedFile.image)
    return selectedFile.image ; 
   }
}