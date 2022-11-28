const multer = require('multer');
const bodyParser = require('body-parser');

const Storage = multer.diskStorage({
  destination: 'public/assets/upload',
  filename: (reg, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const logoImg = multer({
  storage: Storage,
}).single('xlogo__img');

exports.config = (reg, res) => {
  res.render('config', { config: 'config Page here' });
};
// const uploadLogo = (reg, res) => {
//   reg.body.logo__img;
// };
