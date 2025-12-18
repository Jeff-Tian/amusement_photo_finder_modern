import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, Home, Star, Info } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const navItems = [
    { name: '首页', icon: <Home size={18} />, path: '/' },
    { name: '查找照片', icon: <Search size={18} />, path: '/#search' },
    { name: '热门项目', icon: <Star size={18} />, path: '/#popular' },
    { name: '关于我们', icon: <Info size={18} />, path: '/#about' }
  ]

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/a923d765c94e48f39359681f4e691bd1~tplv-a9rns2rl98-image.image?rcl=20251218150926C24C30CA46D22E75D9FF&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1768633821&x-signature=6Nj7l8qqw6bk602JD6OmAWVg1GA%3D" 
            alt="游乐园照片查找" 
            className="h-10"
          />
          <h1 className="ml-3 text-xl font-bold text-primary hidden md:block">游乐园照片查找</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors hidden md:flex items-center space-x-2">
            <User size={18} />
            <span>登录/注册</span>
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="relative bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </button>
          
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                className="text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
              <User size={18} />
              <span>登录/注册</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar