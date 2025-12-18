const { mockCart, mockPhotos } = require('../models/mockData');

// 获取购物车
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.user;
    
    let cart = mockCart.find(c => c.userId === userId);
    
    if (!cart) {
      // 如果购物车不存在，创建一个空购物车
      cart = {
        id: mockCart.length + 1,
        userId,
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockCart.push(cart);
    }
    
    // 为购物车商品添加照片详情
    const cartWithDetails = {
      ...cart,
      items: cart.items.map(item => {
        const photo = mockPhotos.find(p => p.id === item.photoId);
        return {
          ...item,
          photo: photo ? {
            id: photo.id,
            filename: photo.filename,
            location: photo.location,
            time: photo.time,
            area: photo.area,
            previewUrl: `http://localhost:3001/uploads/${photo.filename}`
          } : null
        };
      })
    };
    
    res.json({
      success: true,
      data: cartWithDetails,
      message: 'Cart retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart',
      error: error.message
    });
  }
};

// 添加商品到购物车
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { photoId, quantity = 1, packageType = 'single' } = req.body;
    
    // 验证照片是否存在
    const photo = mockPhotos.find(p => p.id === parseInt(photoId));
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }
    
    let cart = mockCart.find(c => c.userId === userId);
    
    if (!cart) {
      // 创建新购物车
      cart = {
        id: mockCart.length + 1,
        userId,
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockCart.push(cart);
    }
    
    // 检查商品是否已在购物车中
    const existingItemIndex = cart.items.findIndex(item => 
      item.photoId === parseInt(photoId) && item.packageType === packageType
    );
    
    if (existingItemIndex !== -1) {
      // 更新数量
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // 添加新商品
      cart.items.push({
        id: Date.now(),
        photoId: parseInt(photoId),
        quantity,
        packageType,
        price: packageType === 'single' ? photo.price : 
               packageType === 'package5' ? 99 : 199
      });
    }
    
    cart.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: cart,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
};

// 更新购物车商品
exports.updateCartItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.params;
    const { quantity, packageType } = req.body;
    
    const cart = mockCart.find(c => c.userId === userId);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // 更新商品信息
    if (quantity !== undefined) {
      cart.items[itemIndex].quantity = Math.max(1, quantity);
    }
    
    if (packageType) {
      const photo = mockPhotos.find(p => p.id === cart.items[itemIndex].photoId);
      cart.items[itemIndex].packageType = packageType;
      cart.items[itemIndex].price = packageType === 'single' ? photo.price : 
                                    packageType === 'package5' ? 99 : 199;
    }
    
    cart.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: cart,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
      error: error.message
    });
  }
};

// 从购物车移除商品
exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.params;
    
    const cart = mockCart.find(c => c.userId === userId);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: cart,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
};

// 清空购物车
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const cartIndex = mockCart.findIndex(c => c.userId === userId);
    
    if (cartIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    mockCart[cartIndex].items = [];
    mockCart[cartIndex].updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: mockCart[cartIndex],
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
};