import { AnyComponent } from "styled-components/dist/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IStateContent } from "../types/fileTypes";
import Axios from "axios";
import { getFileToBase64 } from "@/hooks/getFileToBase64";
// import { setInterval } from "timers/promises";

interface State {
  droppedFiles: IStateContent[];
  convertedFiles: string[];
  updateDroppedFile: (file: any[]) => void;
  deleteFile: (fileId: number) => void;
  fileSendToServer: (fileUpload: IStateContent[]) => void;
}

export const useDropFile = create<State>((set, get) => ({
  droppedFiles: [],
  convertedFiles: [],
  updateDroppedFile: (file: IStateContent[]) => {
    set((state: any) => ({
      droppedFiles: Array.from(new Set([...state.droppedFiles, ...file])),
    }));
  },
  deleteFile: (index: number) => {
    let data = get().droppedFiles.filter(
      (droppedfile, fileIndex) => fileIndex != index
    );
    set(() => ({ droppedFiles: [...data] }));
  },
  fileTypeToConvert: (fileFormatChanged: IStateContent[]) => {
    set(() => ({ droppedFiles: fileFormatChanged }));
  },
  fileSendToServer: async (allFileUpload: IStateContent[]) => {

    let newFile = allFileUpload?.map(async (item: IStateContent) => ({
      ...item,
      file: await getFileToBase64(item.file)
        .then((data) => data)
        .then((d) => d),
    }));
    
    let filesWithBlob = await Promise.all(newFile);
    filesWithBlob?.map((items , index)=>{
      const formData = new FormData();
       formData.append("uploadedFileObject" , JSON.stringify(items))
       setTimeout(async ()=>{
         let allConvertedFiles = await Axios({
           method: "POST",
           url: "http://localhost:3000/api/filemanager",
           data: formData,
           headers: {
             "Accept": "application/json",
             "Content-Type": "multipart/form-data",
           },
     
         });
         console.log(allConvertedFiles)
       },3000)
     })

    // let dataObj = { data: datas };
    // formData.append("uploadedFileObject", JSON.stringify(dataObj));
    // let allConvertedFiles = await Axios({
    //   method: "POST",
    //   url: "http://localhost:3000/api/filemanager",
    //   data: formData,
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },

    // });
    //  console.log(allConvertedFiles)
    // set(()=>({convertedFiles:allConvertedFiles}))
  },
}));
