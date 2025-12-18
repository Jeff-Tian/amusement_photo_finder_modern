import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Camera, MapPin, Clock, ShoppingCart, Star, Download, Info, Phone, Mail, Clock as ClockIcon, CheckCircle, X, Menu, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { mockPhotos, mockPopularProjects, mockPackages, mockReviews, mockFAQs } from '../utils/mockData.js'

const Home = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedColors, setSelectedColors] = useState([])
  const [searchResults, setSearchResults] = useState(mockPhotos)
  const [isSearching, setIsSearching] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const colors = [
    { name: '红色', color: 'bg-red-500' },
    { name: '蓝色', color: 'bg-blue-500' },
    { name: '绿色', color: 'bg-green-500' },
    { name: '黄色', color: 'bg-yellow-500' },
    { name: '紫色', color: 'bg-purple-500' },
    { name: '粉色', color: 'bg-pink-500' },
    { name: '灰色', color: 'bg-gray-500' },
    { name: '黑色', color: 'bg-black' }
  ]

  // 设置今天的日期为默认值
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    setSelectedDate(`${year}-${month}-${day}`)
  }, [])

  const handleSearch = () => {
    setIsSearching(true)
    
    // 模拟搜索延迟
    setTimeout(() => {
      // 过滤搜索结果
      const filtered = mockPhotos.filter(photo => {
        if (selectedLocation && photo.location !== selectedLocation) return false
        // 这里可以添加更多的搜索逻辑，比如颜色匹配等
        return true
      })
      
      setSearchResults(filtered)
      setIsSearching(false)
      
      // 显示搜索结果提示
      showAlertMessage(`找到 ${filtered.length} 张可能包含您的照片`, 'success')
      
      // 滚动到搜索结果区域
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }, 1500)
  }

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const handleViewPhoto = (photo) => {
    navigate(`/photo/${photo.id}`)
  }

  const handleAddToCart = (photo) => {
    const cartItem = {
      id: Date.now(),
      photoId: photo.id,
      name: `${photo.location} 照片`,
      price: photo.price,
      package: 'single',
      photoSrc: photo.src
    }
    
    addToCart(cartItem)
    showAlertMessage('已成功加入购物车！', 'success')
  }

  const handleViewProjectPhotos = (project) => {
    setIsSearching(true)
    
    setTimeout(() => {
      const filtered = mockPhotos.filter(photo => 
        photo.location === project.name || photo.category === project.category
      )
      
      setSearchResults(filtered)
      setIsSearching(false)
      
      showAlertMessage(`找到 ${filtered.length} 张${project.name}的照片`, 'success')
      
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }, 1500)
  }

  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />)
    }
    
    return stars
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区 */}
      <section className="hero-section h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate__animated animate__fadeInDown">
            捕捉您的欢乐瞬间
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto animate__animated animate__fadeIn">
            轻松找到您在游乐园留下的精彩照片，重温美好时光
          </p>
          
          {/* 搜索框 */}
          <div className="search-box max-w-4xl mx-auto p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">日期</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">地点/项目</label>
                <select 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">所有项目</option>
                  <option value="摩天轮">摩天轮</option>
                  <option value="过山车">过山车</option>
                  <option value="旋转木马">旋转木马</option>
                  <option value="花园区">花园区</option>
                  <option value="儿童区">儿童区</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">穿着颜色</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-full ${color.color} border-2 ${selectedColors.includes(color.name) ? 'border-gray-300' : 'border-white'} hover:border-gray-300 transition-all`}
                      onClick={() => handleColorToggle(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="min-w-[120px] flex items-end">
                <button 
                  className="w-full bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>搜索中...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>查找照片</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700 mb-3">或者使用AI智能匹配</p>
              <button className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors flex items-center space-x-2 mx-auto">
                <span className="mr-2">🤖</span>
                <span>上传自拍照匹配</span>
              </button>
            </div>
          </div>
          
          {/* 向下滚动指示器 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white scroll-indicator">
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* 热门项目 */}
      <section id="popular" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">热门拍照项目</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            查看最受欢迎的拍照项目，不错过任何精彩瞬间
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPopularProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden photo-card">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Camera size={16} className="mr-1" />
                      今日拍摄: {project.photoCount}张
                    </span>
                    <button 
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => handleViewProjectPhotos(project)}
                    >
                      查看照片
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 照片展示区 */}
      <section id="search-results" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">您可能的照片</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            根据您的搜索条件，我们找到了以下可能包含您的照片
          </p>
          
          {isSearching ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">正在搜索您的照片，请稍候...</p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">未找到相关照片</h3>
              <p className="text-gray-600 mb-6">请尝试调整搜索条件或使用其他筛选方式</p>
              <button 
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => {
                  setSelectedLocation('')
                  setSelectedColors([])
                  setSearchResults(mockPhotos)
                }}
              >
                查看所有照片
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden photo-card">
                  <div className="relative watermark cursor-pointer" onClick={() => handleViewPhoto(photo)}>
                    <img 
                      src={photo.src} 
                      alt={photo.location} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      {photo.location}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {photo.time}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {photo.area}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">¥{photo.price}</span>
                      <div className="flex space-x-2">
                        <button 
                          className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors flex items-center space-x-1"
                          onClick={() => handleViewPhoto(photo)}
                        >
                          <Info size={14} />
                          <span>详情</span>
                        </button>
                        <button 
                          className="bg-success text-white px-3 py-1 rounded text-sm hover:bg-success/90 transition-colors flex items-center space-x-1"
                          onClick={() => handleAddToCart(photo)}
                        >
                          <ShoppingCart size={14} />
                          <span>购买</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 如何使用 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">如何使用</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            简单三步，轻松找到您的精彩瞬间
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. 设置搜索条件</h3>
              <p className="text-gray-600">
                选择您游玩的日期、地点和穿着特征，或上传自拍照进行AI智能匹配
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. 浏览匹配照片</h3>
              <p className="text-gray-600">
                查看系统为您找到的照片，预览低清版本确认是否包含您
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. 购买并下载</h3>
              <p className="text-gray-600">
                支付后即可下载高清无水印照片，永久保存您的欢乐回忆
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 价格套餐 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">价格套餐</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            选择最适合您的套餐，保存珍贵回忆
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${
                  pkg.popular ? 'border-secondary transform scale-105 z-10 shadow-lg' : 'border-primary'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm">
                    最受欢迎
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <div className="text-center mb-6">
                    <span className={`text-4xl font-bold ${pkg.popular ? 'text-secondary' : 'text-primary'}`}>
                      ¥{pkg.price}
                    </span>
                    <span className="text-gray-500">/{pkg.unit}</span>
                    {pkg.originalPrice && (
                      <p className="text-sm text-gray-500 mt-1">
                        相当于¥{(pkg.originalPrice / 5).toFixed(1)}/张
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle size={16} className="text-success mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full ${pkg.popular ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'} text-white px-4 py-2 rounded-md transition-colors`}>
                    选择此套餐
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">用户评价</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            看看其他游客如何评价我们的服务
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-gray-600">{review.rating}</span>
                </div>
                <p className="text-gray-700 mb-6">
                  "{review.content}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center`}>
                    <span className="text-primary font-bold">{review.user.avatar}</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold">{review.user.name}</h4>
                    <p className="text-sm text-gray-500">{review.user.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">常见问题</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            解答您可能遇到的问题
          </p>
          
          <div className="max-w-3xl mx-auto">
            {mockFAQs.map((faq) => (
              <div key={faq.id} className="mb-4">
                <button className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center focus:outline-none">
                  <span className="font-bold">{faq.question}</span>
                  <ChevronDown className="text-primary transition-transform" />
                </button>
                <div className="bg-white px-4 pb-4 rounded-b-lg shadow-md">
                  <p className="text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">联系我们</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            如有任何问题或建议，请随时联系我们
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    姓名
                  </label>
                  <input 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    type="text" 
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    邮箱
                  </label>
                  <input 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    type="email" 
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    主题
                  </label>
                  <input 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    type="text" 
                    placeholder="请输入主题"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    留言
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    rows={5} 
                    placeholder="请输入您的留言"
                  ></textarea>
                </div>
                <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  提交
                </button>
              </form>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-lg h-full">
                <h3 className="text-xl font-bold mb-6">联系方式</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">地址</h4>
                      <p className="text-gray-700">北京市朝阳区欢乐大道88号 游乐园管理中心</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">电话</h4>
                      <p className="text-gray-700">400-888-8888</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">邮箱</h4>
                      <p className="text-gray-700">support@amusementphotos.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <ClockIcon className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">工作时间</h4>
                      <p className="text-gray-700">周一至周日 9:00-21:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/a923d765c94e48f39359681f4e691bd1~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633821&x-signature=6Nj7l8qqw6bk602JD6OmAWVg1GA%3D" 
                alt="游乐园照片查找" 
                className="h-10 mb-4"
              />
              <p className="text-gray-400 mb-4">
                捕捉您在游乐园的每一个精彩瞬间，让美好回忆永久保存
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">首页</a></li>
                <li><a href="#search-results" className="text-gray-400 hover:text-white transition-colors">查找照片</a></li>
                <li><a href="#popular" className="text-gray-400 hover:text-white transition-colors">热门项目</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">价格套餐</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">常见问题</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">支持</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">服务条款</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">下载我们的APP</h3>
              <p className="text-gray-400 mb-4">
                随时随地查找和管理您的照片
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded">
                  <span className="text-xl">📱</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded">
                  <span className="text-xl">💻</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 游乐园照片查找. 保留所有权利.</p>
          </div>
        </div>
      </footer>

      {/* 提示消息 */}
      {showAlert && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${
          alertType === 'success' ? 'bg-success' : 'bg-warning'
        } text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeInDown`}>
          <div className="flex items-center">
            {alertType === 'success' ? (
              <CheckCircle size={20} className="mr-2" />
            ) : (
              <Info size={20} className="mr-2" />
            )}
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home