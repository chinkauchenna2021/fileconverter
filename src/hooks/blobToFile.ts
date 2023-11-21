export async function blobToFile (theBlob: any, fileName:string):Promise<File>{       
    return new File(
        [theBlob], // cast as any
        fileName, 
        {
            lastModified: new Date().getTime(),
            type: theBlob.type 
        }
    )
}

// export async function urltoFile(url: string, filename: string, mimeType:string){
//     // const arr = dataUrl.split(',');
//     // if (arr.length < 2) { return undefined; }
//     // const mimeArr = arr[0].match(/:(.*?);/);
//     // if (!mimeArr || mimeArr.length < 2) { return undefined; }
//     // const mime = mimeArr[1];
//     // const buff = Buffer.from(arr[1], 'base64');
//     // return new File([buff], filename, {type:mime});
//      let res = await fetch(url);
//      let buf = await res.arrayBuffer();
//      return new File([buf], filename,{type:mimeType});

// }



export const base64ToFile = (url: string) => {
    let arr = url.split(',');
    // console.log(arr)
    let mime = arr[0].match(/:(.*?);/)![1];
    let data = arr[1];
    
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    
    let file = new File([dataArr], 'File.png', { type: mime });
    
    return file;
    };











export async function uploadImage (b64img: string , filename:string) {
    var file = await urltoFile(b64img,filename,base64MimeType(b64img));
  }
  
  //return a promise that resolves with a File instance
 async function urltoFile(url:any, filename:any, mimeType:any){
      return (fetch(url)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], filename,{type:mimeType});})
      );
  }
  
  //return mime Type of bs64
  function base64MimeType(encoded:any) {
      var result = null;
    
      if (typeof encoded !== 'string') {
        return result;
      }
    
      var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    
      if (mime && mime.length) {
        result = mime[1];
      }
    
      return result;
  }



