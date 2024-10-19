import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads/',
  filename: (req, file, callback) => {
    console.log(file.originalname);
    callback(null, getFileName(file));
  },
});

const getFileName = (file: Express.Multer.File) => {
  return Date.now() + `__${file.originalname.replaceAll(' ', '_')}`;
};
