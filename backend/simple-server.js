const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors({ origin: '*' }));
app.use(express.json());

// 模拟数据
const mockPhotos = [
    { id: 1, filename: "ferris_wheel_1.jpg", location: "摩天轮", time: "2024-01-18 14:30:00", area: "北区", category: "scenic", price: 29.9 },
    { id: 2, filename: "garden_area_1.jpg", location: "花园区", time: "2024-01-18 11:15:00", area: "东区", category: "garden", price: 29.9 },
    { id: 3, filename: "roller_coaster_1.jpg", location: "过山车", time: "2024-01-18 15:45:00", area: "西区", category: "ride", price: 29.9 },
    { id: 4, filename: "carousel_1.jpg", location: "旋转木马", time: "2024-01-18 10:20:00", area: "南区", category: "ride", price: 29.9 }
];

// API路由
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/photos', (req, res) => {
    res.json({
        success: true,
        data: { photos: mockPhotos },
        message: 'Photos retrieved successfully'
    });
});

app.get('/api/photos/popular', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: "摩天轮", photoCount: 1245, previewUrl: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/2328742812844163073~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593793&x-signature=x%2BKQKdmUZY%2FO%2BGkDf94IRccxJe8%3D" },
            { id: 2, name: "过山车", photoCount: 2187, previewUrl: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1286563818772889634~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=QTlWypEjsBdFG60ek6dfDo4NEmQ%3D" }
        ],
        message: 'Popular projects retrieved successfully'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
