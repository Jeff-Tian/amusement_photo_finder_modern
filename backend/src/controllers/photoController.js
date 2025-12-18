const { mockPhotos } = require('../models/mockData');
const path = require('path');
const fs = require('fs').promises;

// 获取照片列表
exports.getPhotos = async (req, res) => {
  try {
    const { location, date, area, category, page = 1, limit = 12 } = req.query;
    
    let filteredPhotos = [...mockPhotos];
    
    // 应用筛选条件
    if (location) {
      filteredPhotos = filteredPhotos.filter(photo => 
        photo.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (date) {
      const targetDate = new Date(date).toDateString();
      filteredPhotos = filteredPhotos.filter(photo => 
        new Date(photo.time).toDateString() === targetDate
      );
    }
    
    if (area) {
      filteredPhotos = filteredPhotos.filter(photo => 
        photo.area.toLowerCase().includes(area.toLowerCase())
      );
    }
    
    if (category) {
      filteredPhotos = filteredPhotos.filter(photo => 
        photo.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // 分页
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPhotos = filteredPhotos.slice(startIndex, endIndex);
    
    // 添加完整的图片URL
    const photosWithUrls = paginatedPhotos.map(photo => ({
      ...photo,
      previewUrl: `http://localhost:3001/uploads/${photo.filename}`,
      downloadUrl: `http://localhost:3001/api/photos/${photo.id}/download`
    }));
    
    res.json({
      success: true,
      data: {
        photos: photosWithUrls,
        pagination: {
          total: filteredPhotos.length,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(filteredPhotos.length / limit)
        }
      },
      message: 'Photos retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve photos',
      error: error.message
    });
  }
};

// 获取照片详情
exports.getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = mockPhotos.find(p => p.id === parseInt(id));
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }
    
    const photoWithUrls = {
      ...photo,
      previewUrl: `http://localhost:3001/uploads/${photo.filename}`,
      downloadUrl: `http://localhost:3001/api/photos/${photo.id}/download`
    };
    
    res.json({
      success: true,
      data: photoWithUrls,
      message: 'Photo retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve photo',
      error: error.message
    });
  }
};

// 搜索照片（AI智能匹配）
exports.searchPhotos = async (req, res) => {
  try {
    const { query, location, date, colors, category } = req.body;
    
    // 模拟AI搜索逻辑
    let searchResults = [...mockPhotos];
    
    if (query) {
      // 简单的文本搜索
      searchResults = searchResults.filter(photo => 
        photo.location.toLowerCase().includes(query.toLowerCase()) ||
        photo.area.toLowerCase().includes(query.toLowerCase()) ||
        photo.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (location) {
      searchResults = searchResults.filter(photo => 
        photo.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (date) {
      const targetDate = new Date(date).toDateString();
      searchResults = searchResults.filter(photo => 
        new Date(photo.time).toDateString() === targetDate
      );
    }
    
    if (category) {
      searchResults = searchResults.filter(photo => 
        photo.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // 添加完整的图片URL
    const resultsWithUrls = searchResults.map(photo => ({
      ...photo,
      previewUrl: `http://localhost:3001/uploads/${photo.filename}`,
      downloadUrl: `http://localhost:3001/api/photos/${photo.id}/download`,
      matchScore: Math.random() * 30 + 70 // 模拟匹配分数
    }));
    
    // 按匹配分数排序
    resultsWithUrls.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json({
      success: true,
      data: {
        photos: resultsWithUrls,
        total: resultsWithUrls.length
      },
      message: 'Search completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

// 上传自拍照进行AI匹配
exports.uploadSelfie = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    // 模拟AI处理延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 随机返回一些匹配的照片
    const matchedPhotos = mockPhotos
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    const resultsWithUrls = matchedPhotos.map(photo => ({
      ...photo,
      previewUrl: `http://localhost:3001/uploads/${photo.filename}`,
      downloadUrl: `http://localhost:3001/api/photos/${photo.id}/download`,
      matchScore: Math.random() * 30 + 70
    }));
    
    // 删除上传的临时文件
    await fs.unlink(req.file.path);
    
    res.json({
      success: true,
      data: {
        photos: resultsWithUrls,
        total: resultsWithUrls.length,
        processingTime: '2.1 seconds'
      },
      message: 'AI matching completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AI matching failed',
      error: error.message
    });
  }
};

// 获取热门项目照片
exports.getPopularProjects = async (req, res) => {
  try {
    // 按下载次数排序获取热门项目
    const popularProjects = mockPhotos
      .reduce((acc, photo) => {
        const existing = acc.find(p => p.location === photo.location);
        if (existing) {
          existing.photoCount++;
          existing.totalDownloads += photo.downloads;
        } else {
          acc.push({
            id: photo.id,
            name: photo.location,
            description: `${photo.location} - 捕捉精彩瞬间`,
            photoCount: 1,
            totalDownloads: photo.downloads,
            category: photo.category,
            previewUrl: `http://localhost:3001/uploads/${photo.filename}`
          });
        }
        return acc;
      }, [])
      .sort((a, b) => b.totalDownloads - a.totalDownloads)
      .slice(0, 3);
    
    res.json({
      success: true,
      data: popularProjects,
      message: 'Popular projects retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular projects',
      error: error.message
    });
  }
};

// 下载照片（模拟）
exports.downloadPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = mockPhotos.find(p => p.id === parseInt(id));
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }
    
    // 检查用户是否有权限下载（这里简化处理）
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required for download'
      });
    }
    
    // 模拟下载链接生成
    const downloadLink = `https://example.com/download/photo_${photo.id}_${Date.now()}.zip`;
    
    res.json({
      success: true,
      data: {
        downloadLink,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24小时后过期
        filename: photo.originalname
      },
      message: 'Download link generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate download link',
      error: error.message
    });
  }
};