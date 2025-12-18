import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Trash2, Download, CreditCard, CheckCircle, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('alipay')
  const [showCoupon, setShowCoupon] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId)
    showAlertMessage('已从购物车移除', 'success')
  }

  const handleClearCart = () => {
    clearCart()
    showAlertMessage('购物车已清空', 'success')
  }

  const handleCheckout = () => {
    setShowPaymentModal(true)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false)
      setShowPaymentModal(false)
      clearCart()
      showAlertMessage('支付成功！正在生成下载链接...', 'success')
      
      // 3秒后跳转到成功页面
      setTimeout(() => {
        showAlertMessage('下载链接已发送到您的邮箱', 'success')
      }, 3000)
    }, 2000)
  }

  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  const getTotalPrice = () => {
    const subtotal = getCartTotal()
    const discount = couponCode === 'WELCOME10' ? subtotal * 0.1 : 0
    return subtotal - discount
  }

  if (getCartCount() === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">购物车是空的</h2>
            <p className="text-gray-600 mb-8">
              您还没有添加任何照片到购物车。快去寻找您的精彩瞬间吧！
            </p>
            <button 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate('/')}
            >
              去查找照片
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <button 
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span>继续购物</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">购物车 ({getCartCount()})</h2>
                <button 
                  className="text-gray-600 hover:text-red-500 text-sm flex items-center space-x-1"
                  onClick={handleClearCart}
                >
                  <Trash2 size={16} />
                  <span>清空购物车</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.photoSrc} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <button 
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                          <span>套餐: {item.package === 'single' ? '单张照片' : 
                                     item.package === 'package5' ? '5张照片套餐' : '无限照片套餐'}</span>
                          <span>数量: {item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">预计发货时间: 24小时内</span>
                          <span className="font-bold text-primary">¥{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 结算信息 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">结算信息</h2>
              
              {/* 优惠券 */}
              <div className="mb-6">
                <button 
                  className="w-full flex justify-between items-center text-left px-4 py-3 border border-gray-200 rounded-md hover:border-primary transition-colors"
                  onClick={() => setShowCoupon(!showCoupon)}
                >
                  <span className="font-medium">优惠券</span>
                  {showCoupon ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {showCoupon && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-md">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="输入优惠券代码"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        应用
                      </button>
                    </div>
                    {couponCode === 'WELCOME10' && (
                      <p className="text-success text-sm mt-2 flex items-center">
                        <CheckCircle size={14} className="mr-1" />
                        优惠券已应用，享受9折优惠！
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* 价格摘要 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">商品总价</span>
                  <span>¥{getCartTotal().toFixed(2)}</span>
                </div>
                {couponCode === 'WELCOME10' && (
                  <div className="flex justify-between items-center text-success">
                    <span>优惠券折扣</span>
                    <span>-¥{(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">运费</span>
                  <span>免费</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center font-bold text-xl">
                  <span>总计</span>
                  <span className="text-primary">¥{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              {/* 支付方式 */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">支付方式</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="alipay" 
                      checked={paymentMethod === 'alipay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-xl">💰</span>
                    <span>支付宝</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="wechat" 
                      checked={paymentMethod === 'wechat'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-xl">💚</span>
                    <span>微信支付</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <CreditCard size={18} />
                    <span>银行卡</span>
                  </label>
                </div>
              </div>
              
              {/* 结算按钮 */}
              <button 
                className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                onClick={handleCheckout}
              >
                <ShoppingCart size={18} />
                <span>去结算</span>
              </button>
              
              {/* 安全保障 */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={14} className="text-success" />
                    <span>安全支付</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={14} className="text-success" />
                    <span>7天退款</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={14} className="text-success" />
                    <span>品质保证</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 支付弹窗 */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">确认支付</h3>
              <p className="text-gray-600">请确认您的订单信息并完成支付</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="font-medium">订单总额</span>
                <span className="font-bold text-primary text-xl">¥{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">支付方式</span>
                <span className="font-medium">
                  {paymentMethod === 'alipay' ? '支付宝' : 
                   paymentMethod === 'wechat' ? '微信支付' : '银行卡'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">商品数量</span>
                <span className="font-medium">{getCartCount()} 件</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                className={`w-full ${isProcessing ? 'bg-gray-400' : 'bg-primary'} text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2`}
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>处理中...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    <span>确认支付 ¥{getTotalPrice().toFixed(2)}</span>
                  </>
                )}
              </button>
              
              <button 
                className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessing}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
      
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

export default Cart