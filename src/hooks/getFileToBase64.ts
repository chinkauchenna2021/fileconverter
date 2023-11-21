
// export async function  convertFileToBase64(file:File){

//   let data = await Promise.all(getFileToBase64(file));
//   return  data ; 
   

// }

export function getFileToBase64(file : File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
