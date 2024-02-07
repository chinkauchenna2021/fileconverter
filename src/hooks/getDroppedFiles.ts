export const getDroppedFile = (ev: React.DragEvent<HTMLDivElement>):File[]=>{
    let _Files: any[] = [];
    var files = ev.dataTransfer.files;
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          _Files.push(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        _Files.push(files[i]);
      }
    }
return _Files ;
}



export const getFileInput = (fileInput:any)=>{
  const selectedFiles = Array.from(fileInput.files);
  return selectedFiles
}