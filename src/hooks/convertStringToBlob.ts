export function get_blob_from_string (string:string, type:string, name:string) {
    let array = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++){
        array[i] = string.charCodeAt(i);
    }
    let end_file = new Blob([array],{type: type}) ;
    let a = document.createElement("a");
    a.href = URL.createObjectURL(end_file);
    a.download = name;
    a.target = "_blank";
    a.click();
}


// new File(["blob"], "image")