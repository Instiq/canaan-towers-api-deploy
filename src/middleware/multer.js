const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}${file.originalname}` );
    }
  });
  
  
  const upload = multer({
      storage: storage,
      limits: {
          fileSize: 10000000
      },
      fileFilter(req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
              return cb(new Error('Please upload an image'))
          }
  
          cb(undefined, true)
      }
  })

module.exports = upload 