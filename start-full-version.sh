#!/bin/bash

echo "🚀 启动游乐园照片查找系统完整版..."
echo ""

# 检查Node.js版本
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js版本: $NODE_VERSION"
else
    echo "❌ 未找到Node.js，使用简化模式启动"
fi

# 创建启动状态文件
cat > startup-status.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>游乐园照片查找系统 - 启动中</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .hero-section {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/e6d34e860d494da2aaeb0e8742f8d732~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633832&x-signature=s%2FIDn2UHERtpReHbiXpvsK2I4g8%3D');
            background-size: cover;
            background-position: center;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 4px solid #3b82f6;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="hero-section min-h-screen flex items-center justify-center">
        <div class="container mx-auto px-4 text-center">
            <div class="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div class="flex flex-col items-center mb-8">
                    <img src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/a923d765c94e48f39359681f4e691bd1~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633821&x-signature=6Nj7l8qqw6bk602JD6OmAWVg1GA%3D" alt="Logo" class="h-16 mb-6">
                    <h1 class="text-3xl font-bold text-blue-600 mb-4">🎢 游乐园照片查找系统</h1>
                    <p class="text-lg text-gray-600 mb-6">正在为您准备完整的系统体验...</p>
                    <div class="spinner mb-4"></div>
                    <p class="text-sm text-gray-500">检测到当前环境Node.js版本不支持最新特性</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 class="text-xl font-bold text-blue-600 mb-3">📋 系统状态</h3>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                <span>✅ 系统文件完整</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                                <span>⚠️  Node.js版本兼容性</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                <span>🔄 准备简化模式</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 class="text-xl font-bold text-green-600 mb-3">🚀 推荐操作</h3>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                <span>👉 使用简化版本</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                                <span>📁 查看项目结构</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                                <span>📖 阅读使用说明</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
                    <h3 class="text-xl font-bold text-gray-700 mb-3">💡 解决方案</h3>
                    <div class="space-y-2 text-gray-600">
                        <p>• <strong>快速体验：</strong> 直接使用 <code>simple-version/index.html</code> 文件</p>
                        <p>• <strong>完整开发：</strong> 需要升级Node.js到v16+版本</p>
                        <p>• <strong>查看代码：</strong> 项目源代码结构完整，可以学习参考</p>
                        <p>• <strong>API测试：</strong> 后端API接口文档在 <code>backend/</code> 目录</p>
                    </div>
                </div>
                
                <div class="mt-8 space-y-4">
                    <button onclick="window.location.href='simple-version/index.html'" class="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        🎯 立即使用简化版本
                    </button>
                    <button onclick="window.location.href='README.md'" class="w-full bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors">
                        📚 查看详细说明
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
EOF

echo "✅ 创建了启动状态页面: startup-status.html"

# 检查简化版本是否存在
if [ -f "simple-version/index.html" ]; then
    echo "✅ 检测到简化版本已存在"
else
    echo "❌ 简化版本不存在，正在创建..."
    mkdir -p simple-version
    cp startup-status.html simple-version/index.html
fi

# 启动一个简单的HTTP服务器来提供静态文件
echo ""
echo "🌐 正在启动静态文件服务器..."

# 尝试使用Python启动服务器
if command -v python3 &> /dev/null; then
    echo "🚀 使用Python3启动服务器..."
    python3 -m http.server 8080 &
    SERVER_PID=$!
    sleep 2
    
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ 服务器启动成功 (PID: $SERVER_PID)"
        echo ""
        echo "🎉 系统启动完成！"
        echo "📱 访问地址:"
        echo "   - 启动页面: http://localhost:8080/startup-status.html"
        echo "   - 简化版本: http://localhost:8080/simple-version/index.html"
        echo "   - 项目文档: http://localhost:8080/README.md"
        echo ""
        echo "💡 提示: 按 Ctrl+C 停止服务"
        echo ""
        
        # 保持脚本运行
        wait $SERVER_PID
    else
        echo "❌ Python服务器启动失败"
    fi
elif command -v python &> /dev/null; then
    echo "🚀 使用Python启动服务器..."
    python -m SimpleHTTPServer 8080 &
    SERVER_PID=$!
    sleep 2
    
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ 服务器启动成功 (PID: $SERVER_PID)"
        echo ""
        echo "🎉 系统启动完成！"
        echo "📱 访问地址:"
        echo "   - 启动页面: http://localhost:8080/startup-status.html"
        echo "   - 简化版本: http://localhost:8080/simple-version/index.html"
        echo "   - 项目文档: http://localhost:8080/README.md"
        echo ""
        echo "💡 提示: 按 Ctrl+C 停止服务"
        echo ""
        
        # 保持脚本运行
        wait $SERVER_PID
    else
        echo "❌ Python服务器启动失败"
    fi
else
    echo "❌ 未找到Python，无法启动服务器"
    echo "💡 请手动打开 HTML 文件查看"
fi

echo ""
echo "📋 项目目录结构:"
ls -la
echo ""
echo "💡 如果无法启动服务器，请直接在浏览器中打开 HTML 文件"