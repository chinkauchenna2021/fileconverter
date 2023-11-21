
export type IFiles = File | null;

export type IStateContent = {
  file: File;
  fileConversionFormat: string;
  filename?:string;
  originalExt: string;
  fileType: string;
  fileMode?: string;
  fileIndex: number;
  isUploaded: boolean;
};
  
