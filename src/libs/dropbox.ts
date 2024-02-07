import fs from 'fs';
import{Dropbox} from 'dropbox';

// Initialize Dropbox with your app key
const dbx = new Dropbox({ accessToken: 'YOUR_ACCESS_TOKEN' });

// Function to save a n image to Dropbox
const saveImageToDropbox = async (fileName:any, filePath:any) => {
  try {
    // Read the image file
    const image = fs.readFileSync(filePath);

    // Upload the image
    const response = await dbx.filesUpload({
      path: '/' + fileName, // Path where you want to save the image
      contents: image, // Image data
    //   mode: 'WriteMode', // Overwrite the image if it already exists
    });

    console.log('Image uploaded:', response);
    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Usage
saveImageToDropbox('example.jpg', '/path/to/your/image.jpg');
