import { AnyComponent } from "styled-components/dist/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import  {IStateContent} from '../types/fileTypes'

interface State {
  droppedFiles: IStateContent[];
  updateDroppedFile: (file: any[]) => void;
  deleteFile:(fileId:number)=>void;
  fileSendToServer:(fileUpload:IStateContent[])=>void
  
}


export const useDropFile = create<State>((set , get) => ({
  droppedFiles: [],
  updateDroppedFile: (file: IStateContent[]) => {
    set((state: any) => ({
      droppedFiles: Array.from(new Set([...state.droppedFiles, ...file])),
    }));
  },
  deleteFile:(fileId:number)=>{
      let data = get().droppedFiles.filter((droppedfile, index)=>droppedfile.fileIndex !== fileId);
     set((state)=>({droppedFiles:[...data]}))
    },
  fileTypeToConvert: (fileFormatChanged:IStateContent[]) => {

    set(()=>({droppedFiles: fileFormatChanged}))
  },
 
  fileSendToServer:async (fileUpload:IStateContent[])=>{

  } 

}));

