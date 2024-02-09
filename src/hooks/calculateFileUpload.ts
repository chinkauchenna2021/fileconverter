import React , {useState} from 'react'

export const  calculateFileUpload = (event : any)=> {
      let  loadingProgress = 0;
    
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentLoaded = (event.loaded / event.total) * 100;
             loadingProgress = percentLoaded;
          }
        };
    
        reader.onloadend = () => {
          // File has been completely loaded
          // You can perform any additional actions here if needed
        };
    
        reader.readAsDataURL(file); // Start reading the file  
        return loadingProgress ; 
}

