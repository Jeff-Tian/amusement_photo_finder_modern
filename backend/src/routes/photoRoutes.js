const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getPhotos, 
  getPhotoById, 
  searchPhotos, 
  uploadSelfie, 
  getPopularProjects,
  downloadPhoto 
} = require('../controllers/photoController');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/authMiddleware');

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `selfie-${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    }
  }
});

// 照片相关路由
router.get('/', optionalAuthMiddleware, getPhotos);
router.get('/popular', optionalAuthMiddleware, getPopularProjects);
router.get('/:id', optionalAuthMiddleware, getPhotoById);
router.post('/search', optionalAuthMiddleware, searchPhotos);
router.post('/upload-selfie', upload.single('selfie'), uploadSelfie);
router.get('/:id/download', authMiddleware, downloadPhoto);

module.exports = router;