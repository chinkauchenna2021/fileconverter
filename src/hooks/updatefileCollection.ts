import index from "@/app/dashboard/page"
import { IStateContent } from "../../types/fileTypes"

interface fileUpdate{
    fileConversionFormat:string
  fileupdateType:string
  fileupdateIndex:number
  fileuploadCollection:IStateContent[]
}

export const updatefile = (fileConversionFormat:string , fileupdateType:string,  fileupdateIndex:number,  fileuploadCollection:IStateContent[]):IStateContent[] =>{
    let uploadValue =  fileuploadCollection.map((item , index)=>{
        if(index == fileupdateIndex){
            return {...item , fileConversionFormat , fileupdateType}
        }

     return item ; 
    });
    return uploadValue ;   
}