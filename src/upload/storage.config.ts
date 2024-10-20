import { diskStorage } from 'multer';
const fs = require('fs');

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

function getDestination(req, file, cb) {
  cb(null, '/dev/null');
}

function MyCustomStorage(opts) {
  this.getDestination = opts.destination || getDestination;
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, function (err, path) {
    if (err) return cb(err);

    var outStream = fs.createWriteStream(path);

    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', function () {
      cb(null, {
        path: path,
        size: outStream.bytesWritten,
      });
    });
  });
};

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

export const customStorage = new MyCustomStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/' + file.originalname);
  },
});
