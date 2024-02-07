// import fs from 'fs';
// import { google } from 'googleapis';
// import { OAuth2Client } from 'google-auth-library';

// // Initialize OAuth2Client with your credentials
// const oAuth2Client = new OAuth2Client({
//   clientId: 'YOUR_CLIENT_ID',
//   clientSecret: 'YOUR_CLIENT_SECRET',
//   redirectUri: 'YOUR_REDIRECT_URI',
// });

// // Generate auth URL
// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: ['https://www.googleapis.com/auth/drive.file'],
// });

// // Function to authenticate and get access token
// const getAccessToken = async (code) => {
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   console.log('Access token:', tokens.access_token);
//   return tokens.access_token;
// };

// // Function to save a file to Google Drive
// const saveFileToDrive = async (fileName, filePath, accessToken) => {
//   try {
//     const drive = google.drive({ version: 'v3', auth: accessToken });

//     // Create file metadata
//     const fileMetadata = {
//       name: fileName,
//     };

//     // Create media object
//     const media = {
//       mimeType: 'application/octet-stream',
//       body: fs.createReadStream(filePath),
//     };

//     // Upload file
//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: 'id',
//     });

//     console.log('File uploaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };

// // Usage
// const code = 'YOUR_AUTH_CODE'; // Replace with the authorization code received after user authorization
// const accessToken = await getAccessToken(code);

// const fileName = 'example.txt'; // Desired filename in Google Drive
// const filePath = '/path/to/your/local/file.txt'; // Local path where you want to save the file

// saveFileToDrive(fileName, filePath, accessToken)
//   .then(() => console.log('File saved to Google Drive'))
//   .catch(error => console.error('Error:', error));
