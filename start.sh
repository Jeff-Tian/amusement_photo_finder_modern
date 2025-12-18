#!/bin/bash

echo "🚀 启动游乐园照片查找系统..."

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js (https://nodejs.org/)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js版本: $NODE_VERSION"

# 启动后端服务
echo "📡 启动后端服务..."
cd backend
npm run dev &
BACKEND_PID=$!
sleep 3

# 检查后端是否启动成功
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ 后端服务启动成功 (PID: $BACKEND_PID)"
    echo "🌐 后端API地址: http://localhost:3001"
    echo "🔍 健康检查地址: http://localhost:3001/health"
else
    echo "❌ 后端服务启动失败"
    exit 1
fi

# 启动前端服务
echo "🎨 启动前端服务..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
sleep 3

# 检查前端是否启动成功
if ps -p $FRONTEND_PID > /dev/null; then
    echo "✅ 前端服务启动成功 (PID: $FRONTEND_PID)"
    echo "🌐 前端访问地址: http://localhost:5173"
else
    echo "❌ 前端服务启动失败"
    exit 1
fi

echo ""
echo "🎉 系统启动完成！"
echo "📱 请在浏览器中访问: http://localhost:5173"
echo "💡 如需停止服务，请按 Ctrl+C"
echo ""

# 等待用户输入以保持脚本运行
wait $BACKEND_PID $FRONTEND_PID