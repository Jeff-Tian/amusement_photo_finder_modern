// 纯Node.js实现的超简单后端服务器
// 不依赖任何外部模块，直接使用Node.js内置模块

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// 模拟照片数据
const mockPhotos = [
    {
        id: 1,
        src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/986956881765073005~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=qnXgHFv2vRbLosIgP%2BaHMUsoDmE%3D",
        location: "摩天轮",
        time: "今天 14:30",
        area: "北区",
        price: 29.9,
        category: "scenic"
    },
    {
        id: 2,
        src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/965729186175385786~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=zoLwmMlxsB64mCObl1VcrRbLosIgP%2BaHMUsoDmE%3D",
        location: "花园区",
        time: "今天 11:15",
        area: "东区",
        price: 29.9,
        category: "garden"
    },
    {
        id: 3,
        src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/970465968286334981~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=PO8iM0wjcpz819g1Fmjp0f2gmmo%3D",
        location: "过山车",
        time: "今天 15:45",
        area: "西区",
        price: 29.9,
        category: "ride"
    },
    {
        id: 4,
        src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/965729246413979675~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=FqvPEAUfTZsS6bDOf363IdpyGxY%3D",
        location: "旋转木马",
        time: "今天 10:20",
        area: "南区",
        price: 29.9,
        category: "ride"
    },
    {
        id: 5,
        src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/891695701034008697~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=X3Bu5wpIErjwhI3RZg%2FmI%2BeZtAE%3D",
        location: "过山车",
        time: "今天 13:10",
        area: "西区",
        price: 29.9,
        category: "ride"
    },
    {
        id: 6,
        src: "https://p11-doubao-search-sign.byteimg.com/labis/064dd41f32f3dd419f963096032f0a59~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=JpX%2FMNkfK7hjKfbv1QGT0cimT3g%3D",
        location: "过山车",
        time: "今天 16:25",
        area: "西区",
        price: 29.9,
        category: "ride"
    }
];

// 热门项目数据
const popularProjects = [
    {
        id: 1,
        name: "摩天轮",
        description: "在最高点捕捉整个游乐园的美景",
        image: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/2328742812844163073005~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593793&x-signature=x%2BKQKdmUZY%2FO%2BGkDf94IRccxJe8%3D",
        photoCount: 1245,
        category: "scenic"
    },
    {
        id: 2,
        name: "过山车",
        description: "捕捉您在高速旋转中的兴奋表情",
        image: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1286563818772889634~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=QTlWypEjsBdFG60ek6dfDo4NEmQ%3D",
        photoCount: 2187,
        category: "ride"
    },
    {
        id: 3,
        name: "旋转木马",
        description: "记录全家人的温馨时刻",
        image: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1071588370510643204~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593793&x-signature=OBY9%2BEq4UMCb6sOpjmBeI%2FsHtrU%3D",
        photoCount: 956,
        category: "ride"
    }
];

// HTML模板
const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>游乐园照片查找系统 - 完整版</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hero-section {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/e6d34e860d494da2aaeb0e8742f8d732~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633832&x-signature=s%2FIDn2UHERtpReHbiXpvsK2I4g8%3D');
            background-size: cover;
            background-position: center;
        }
        .photo-card:hover { transform: translateY(-5px); transition: transform 0.3s ease; }
        .watermark::after {
            content: "预览图";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 2rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.7);
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 10;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md fixed w-full z-50">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/a923d765c94e48f39359681f4e691bd1~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633821&x-signature=6Nj7l8qqw6bk602JD6OmAWVg1GA%3D" alt="Logo" class="h-10">
                    <h1 class="ml-3 text-xl font-bold text-blue-600 hidden md:block">游乐园照片查找</h1>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="#home" class="text-gray-700 hover:text-blue-600">首页</a>
                    <a href="#search" class="text-gray-700 hover:text-blue-600">查找照片</a>
                    <a href="#popular" class="text-gray-700 hover:text-blue-600">热门项目</a>
                    <a href="#photos" class="text-gray-700 hover:text-blue-600">照片展示</a>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">登录/注册</button>
                    <button class="relative bg-blue-600 text-white p-2 rounded-full">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- 英雄区 -->
    <section id="home" class="hero-section h-screen flex items-center justify-center pt-16">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">捕捉您的欢乐瞬间</h1>
            <p class="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">轻松找到您在游乐园留下的精彩照片，重温美好时光</p>
            
            <!-- 搜索框 -->
            <div id="search" class="bg-white/90 backdrop-blur-sm max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
                <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-[200px]">
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-left">日期</label>
                        <input type="date" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600" id="search-date">
                    </div>
                    <div class="flex-1 min-w-[200px]">
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-left">地点/项目</label>
                        <select class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600" id="search-location">
                            <option value="">所有项目</option>
                            <option value="摩天轮">摩天轮</option>
                            <option value="过山车">过山车</option>
                            <option value="旋转木马">旋转木马</option>
                            <option value="花园区">花园区</option>
                        </select>
                    </div>
                    <div class="min-w-[120px] flex items-end">
                        <button onclick="searchPhotos()" class="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                            查找照片
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 热门项目 -->
    <section id="popular" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">热门拍照项目</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="popular-projects">
                <!-- 热门项目将通过JavaScript动态加载 -->
            </div>
        </div>
    </section>

    <!-- 照片展示区 -->
    <section id="photos" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">您可能的照片</h2>
            <div id="photos-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <!-- 照片将通过JavaScript动态加载 -->
            </div>
        </div>
    </section>

    <!-- API信息区 -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">API接口信息</h2>
            <div class="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-bold mb-3 text-blue-600">🌐 后端服务状态</h3>
                        <div class="flex items-center text-green-600 font-medium">
                            <div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            <span>✅ 服务运行正常 - http://localhost:${PORT}</span>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-3">🔍 可用API接口</h3>
                        <div class="space-y-3">
                            <div class="bg-white p-4 rounded-md border border-gray-200">
                                <div class="font-mono text-sm text-blue-600">GET /api/photos</div>
                                <div class="text-gray-600 text-sm mt-1">获取所有照片列表</div>
                            </div>
                            <div class="bg-white p-4 rounded-md border border-gray-200">
                                <div class="font-mono text-sm text-blue-600">GET /api/photos/popular</div>
                                <div class="text-gray-600 text-sm mt-1">获取热门项目列表</div>
                            </div>
                            <div class="bg-white p-4 rounded-md border border-gray-200">
                                <div class="font-mono text-sm text-blue-600">GET /health</div>
                                <div class="text-gray-600 text-sm mt-1">健康检查接口</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold mb-3">💡 使用说明</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-700">
                            <li>系统已完全启动，可以正常使用所有功能</li>
                            <li>点击上方的查找照片按钮可以搜索照片</li>
                            <li>查看热门项目可以快速浏览相关照片</li>
                            <li>API接口可以直接用于开发其他应用</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-2xl font-bold mb-6">游乐园照片查找系统</h2>
            <p class="text-gray-400 mb-8 max-w-2xl mx-auto">为您捕捉每一个精彩瞬间，让美好回忆永久保存</p>
            <p class="text-gray-500">&copy; 2025 游乐园照片查找系统. 保留所有权利.</p>
        </div>
    </footer>

    <script>
        // 设置今天的日期
        function setTodayDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            document.getElementById('search-date').value = year + '-' + month + '-' + day;
        }

        // 页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function() {
            setTodayDate();
            loadPopularProjects();
            loadPhotos();
        });

        // 加载热门项目
        async function loadPopularProjects() {
            try {
                const response = await fetch('/api/photos/popular');
                const data = await response.json();
                
                if (data.success) {
                    const projectsContainer = document.getElementById('popular-projects');
                    projectsContainer.innerHTML = data.data.map(project => 
                        '<div class="bg-white rounded-lg shadow-md overflow-hidden photo-card">' +
                            '<img src="' + project.image + '" alt="' + project.name + '" class="w-full h-48 object-cover">' +
                            '<div class="p-6">' +
                                '<h3 class="text-xl font-bold mb-2">' + project.name + '</h3>' +
                                '<p class="text-gray-600 mb-4">' + project.description + '</p>' +
                                '<div class="flex justify-between items-center">' +
                                    '<span class="text-sm text-gray-500">今日拍摄: ' + project.photoCount + '张</span>' +
                                    '<button onclick="viewProjectPhotos(\'' + project.name + '\')" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">' +
                                        '查看照片' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
                    ).join('');
                }
            } catch (error) {
                console.error('加载热门项目失败:', error);
            }
        }

        // 加载照片
        async function loadPhotos() {
            try {
                const response = await fetch('/api/photos');
                const data = await response.json();
                
                if (data.success) {
                    displayPhotos(data.data.photos);
                }
            } catch (error) {
                console.error('加载照片失败:', error);
            }
        }

        // 搜索照片
        async function searchPhotos() {
            const location = document.getElementById('search-location').value;
            
            // 显示加载状态
            document.getElementById('photos-grid').innerHTML = `
                <div class="col-span-full flex justify-center items-center py-16">
                    <div class="flex flex-col items-center">
                        <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p class="text-gray-600">正在搜索您的照片，请稍候...</p>
                    </div>
                </div>
            `;

            try {
                const response = await fetch('/api/photos');
                const data = await response.json();
                
                if (data.success) {
                    let filteredPhotos = data.data.photos;
                    
                    if (location) {
                        filteredPhotos = filteredPhotos.filter(photo => photo.location === location);
                    }
                    
                    setTimeout(() => {
                        displayPhotos(filteredPhotos);
                        showToast(`找到 ${filteredPhotos.length} 张可能包含您的照片`);
                    }, 1000);
                }
            } catch (error) {
                console.error('搜索照片失败:', error);
            }
        }

        // 查看项目照片
        function viewProjectPhotos(projectName) {
            document.getElementById('search-location').value = projectName;
            searchPhotos();
        }

        // 显示照片
        function displayPhotos(photos) {
            const photosGrid = document.getElementById('photos-grid');
            
            if (photos.length === 0) {
                photosGrid.innerHTML = 
                    '<div class="col-span-full text-center py-16">' +
                        '<div class="text-gray-400 mb-4">🔍</div>' +
                        '<h3 class="text-xl font-bold text-gray-700 mb-2">未找到相关照片</h3>' +
                        '<p class="text-gray-600">请尝试调整搜索条件</p>' +
                    '</div>';
                return;
            }
            
            photosGrid.innerHTML = photos.map(photo => 
                '<div class="bg-white rounded-lg shadow-md overflow-hidden photo-card">' +
                    '<div class="relative watermark cursor-pointer">' +
                        '<img src="' + photo.src + '" alt="' + photo.location + '" class="w-full h-48 object-cover">' +
                        '<div class="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">' +
                            photo.location +
                        '</div>' +
                    '</div>' +
                    '<div class="p-4">' +
                        '<div class="flex justify-between items-center mb-3">' +
                            '<span class="text-sm text-gray-500">' + photo.time + '</span>' +
                            '<span class="text-sm text-gray-500">' + photo.area + '</span>' +
                        '</div>' +
                        '<div class="flex justify-between items-center">' +
                            '<span class="text-sm font-bold text-gray-700">¥' + photo.price + '</span>' +
                            '<button onclick="addToCart(' + photo.id + ')" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">' +
                                '购买' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            ).join('');
        }

        // 添加到购物车
        function addToCart(photoId) {
            showToast('已成功加入购物车！');
        }

        // 显示提示消息
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            toast.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    </script>
</body>
</html>
`;

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    // 解析URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    // 健康检查接口
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            message: '游乐园照片查找系统后端服务运行正常',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        }));
        return;
    }
    
    // 获取照片列表接口
    if (pathname === '/api/photos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: {
                photos: mockPhotos,
                pagination: {
                    total: mockPhotos.length,
                    page: 1,
                    limit: 12,
                    totalPages: 1
                }
            },
            message: 'Photos retrieved successfully'
        }));
        return;
    }
    
    // 获取热门项目接口
    if (pathname === '/api/photos/popular') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: popularProjects,
            message: 'Popular projects retrieved successfully'
        }));
        return;
    }
    
    // 根路径返回HTML页面
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlTemplate.replace('3001', PORT.toString()));
        return;
    }
    
    // 404处理
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: false,
        message: 'Route not found',
        path: pathname
    }));
});

// 启动服务器
server.listen(PORT, () => {
    console.log('');
    console.log('🚀 游乐园照片查找系统完整版启动成功！');
    console.log('');
    console.log('📡 后端服务运行在: http://localhost:' + PORT);
    console.log('🌐 前端访问地址: http://localhost:' + PORT);
    console.log('🔍 健康检查地址: http://localhost:' + PORT + '/health');
    console.log('📸 照片API地址: http://localhost:' + PORT + '/api/photos');
    console.log('🔥 热门项目API: http://localhost:' + PORT + '/api/photos/popular');
    console.log('');
    console.log('🎉 系统已完全启动，可以正常使用所有功能！');
    console.log('💡 提示: 按 Ctrl+C 停止服务');
    console.log('');
});

// 处理服务器错误
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log('❌ 端口 ' + PORT + ' 已被占用，请检查是否有其他服务在运行');
        console.log('💡 建议: 使用其他端口或关闭占用该端口的服务');
    } else {
        console.log('❌ 服务器启动失败:', error.message);
    }
    process.exit(1);
});

// 处理优雅关闭
process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭服务器...');
    server.close(() => {
        console.log('✅ 服务器已成功关闭');
        process.exit(0);
    });
});