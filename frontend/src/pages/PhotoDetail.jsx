import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Download, Share2, Heart, Info, ChevronRight, ChevronLeft, CheckCircle, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { mockPhotos, mockPackages } from '../utils/mockData.js'

const PhotoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [photo, setPhoto] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState('single')
  const [quantity, setQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [relatedPhotos, setRelatedPhotos] = useState([])

  useEffect(() => {
    // 查找当前照片
    const foundPhoto = mockPhotos.find(p => p.id === parseInt(id))
    if (foundPhoto) {
      setPhoto(foundPhoto)
      
      // 查找相关照片（同地点或同类别）
      const related = mockPhotos.filter(p => 
        p.id !== parseInt(id) && (p.location === foundPhoto.location || p.category === foundPhoto.category)
      ).slice(0, 6)
      
      setRelatedPhotos(related)
    }
  }, [id])

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      photoId: photo.id,
      name: `${photo.location} 照片`,
      price: selectedPackage === 'single' ? photo.price : 
             selectedPackage === 'package5' ? 99 : 199,
      package: selectedPackage,
      photoSrc: photo.src,
      quantity: selectedPackage === 'unlimited' ? 1 : quantity
    }
    
    addToCart(cartItem)
    showAlertMessage('已成功加入购物车！', 'success')
    
    // 3秒后自动跳转到购物车页面
    setTimeout(() => {
      navigate('/cart')
    }, 3000)
  }

  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  const getPackageInfo = () => {
    if (selectedPackage === 'single') {
      return { name: '单张照片', price: photo?.price || 29.9 }
    } else if (selectedPackage === 'package5') {
      return { name: '5张照片套餐', price: 99 }
    } else {
      return { name: '无限照片套餐', price: 199 }
    }
  }

  if (!photo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载照片...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4">
        {/* 返回按钮 */}
        <button 
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span>返回搜索结果</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧照片预览区 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={photo.src} 
                  alt={photo.location} 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {photo.location}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Info size={12} />
                  <span>预览图 - 购买后可下载高清无水印版本</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors">
                      <Share2 size={16} />
                      <span className="text-sm">分享</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">收藏</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{photo.time}</span>
                    <span>•</span>
                    <span>{photo.area}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 相关照片 */}
            {relatedPhotos.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">相关照片</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedPhotos.map((relatedPhoto) => (
                    <div 
                      key={relatedPhoto.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/photo/${relatedPhoto.id}`)}
                    >
                      <img 
                        src={relatedPhoto.src} 
                        alt={relatedPhoto.location} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">{relatedPhoto.location}</span>
                          <span className="text-xs font-bold text-gray-700">¥{relatedPhoto.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* 右侧购买区 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">购买照片</h2>
              
              {/* 照片信息 */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    {photo.location}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {photo.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  拍摄地点：{photo.area} · {photo.location}
                </p>
              </div>
              
              {/* 套餐选择 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">选择套餐</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="package" 
                        value="single" 
                        checked={selectedPackage === 'single'}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="font-medium">单张照片</div>
                        <div className="text-sm text-gray-600">高清无水印 + 原始尺寸下载</div>
                      </div>
                    </div>
                    <span className="font-bold text-primary">¥{photo.price}</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="package" 
                        value="package5" 
                        checked={selectedPackage === 'package5'}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="font-medium">5张照片套餐</div>
                        <div className="text-sm text-gray-600">5张高清照片 + 拼贴服务</div>
                      </div>
                    </div>
                    <span className="font-bold text-primary">¥99</span>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="package" 
                        value="unlimited" 
                        checked={selectedPackage === 'unlimited'}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="font-medium">无限照片套餐</div>
                        <div className="text-sm text-gray-600">当天所有照片无限下载</div>
                      </div>
                    </div>
                    <span className="font-bold text-primary">¥199</span>
                  </label>
                </div>
              </div>
              
              {/* 数量选择 */}
              {selectedPackage !== 'unlimited' && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">数量</h3>
                  <div className="flex items-center space-x-4">
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <span>-</span>
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-10 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* 价格摘要 */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">套餐价格</span>
                  <span>¥{getPackageInfo().price}</span>
                </div>
                {quantity > 1 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">数量 × {quantity}</span>
                    <span>¥{(getPackageInfo().price * quantity).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold text-xl mt-4">
                  <span>总计</span>
                  <span className="text-primary">¥{(getPackageInfo().price * quantity).toFixed(2)}</span>
                </div>
              </div>
              
              {/* 购买按钮 */}
              <div className="space-y-3">
                <button 
                  className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  <span>加入购物车</span>
                </button>
                
                <button className="w-full bg-success text-white px-6 py-3 rounded-md hover:bg-success/90 transition-colors flex items-center justify-center space-x-2">
                  <Download size={18} />
                  <span>立即购买并下载</span>
                </button>
              </div>
              
              {/* 服务保障 */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-bold mb-3">服务保障</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-success" />
                    <span>高清无水印，原始画质</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-success" />
                    <span>永久保存，随时下载</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-success" />
                    <span>7天内可申请退款</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 提示消息 */}
      {showAlert && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${
          alertType === 'success' ? 'bg-success' : 'bg-warning'
        } text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeInDown`}>
          <div className="flex items-center">
            {alertType === 'success' ? (
              <CheckCircle size={20} className="mr-2" />
            ) : (
              <X size={20} className="mr-2" />
            )}
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoDetail