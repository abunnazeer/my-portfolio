const multer = require('multer');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const Storage = multer.diskStorage({
  destination: 'public/assets/upload',
  filename: (reg, file, cb) => {
    cb(null, file.originalname);
  },
});
//logo schema
const logoSchema = mongoose.Schema({
  photo: {
    type: String,
    required: [true, 'please add logo'],
  },
});

const Logo = mongoose.model('logo', logoSchema);

//specail menu schema
const smSchema = mongoose.Schema({
  spmenu: {
    type: String,
  },
});
const SpMenu = mongoose.model('spmenu', smSchema);

////menu schema
const menushema = mongoose.Schema({
  menu: {
    type: String,
  },
});

const Menus = mongoose.model('menu', menushema);

///copyright

const footerSchema = mongoose.Schema({
  footer: {
    type: String,
  },
});
const footerCopyright = mongoose.model('footercopyright', footerSchema);
//image upload
const logoImg = multer({
  storage: Storage,
}).single('logoimg');

exports.config = async (reg, res) => {
  const logo = await Logo.findOne({ photo: 'logo.png' });
  const spmenu = await SpMenu.findOne({ spmenu: "Let's Talk" });
  res.render('config', {
    // config: 'configuration page',
    logo: logo,
    spmenu: spmenu,
  });
};
exports.createConfig = (reg, res) => {
  if (reg.body.menu) {
    //creating menu
    const menu = new Menus({
      menu: reg.body.menu,
    });
    return menu
      .save()
      .then(() => {})
      .catch(err => {
        console.log('Error', err);
      });
  }
  if (reg.body.menuspecial) {
    //creating menu btn
    const sm = new SpMenu({
      spmenu: reg.body.menuspecial,
    });
    return sm
      .save()
      .then(function () {})
      .catch(function (err) {
        console.log('Error', err);
      });
    // return console.log('hello special menu');
  }
  if (reg.body.copyright) {
    //creating copyright content
    const copyright = new footerCopyright({
      footer: reg.body.copyright,
    });
    return copyright
      .save()
      .then(() => {})
      .catch(err => {
        console.log('Error', err);
      });
  }
  //uploading a new logo
  logoImg(reg, res, err => {
    if (err) {
      console.log(err);
    } else {
      const logo = new Logo({
        photo: reg.file.filename,
      });
      logo
        .save()
        .then(() => {})
        .catch(err => {
          console.log('Error', err);
        });
    }
  });
};
