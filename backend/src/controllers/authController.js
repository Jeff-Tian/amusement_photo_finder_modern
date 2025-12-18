const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mockUsers } = require('../models/mockData');

// 用户注册
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName, phone } = req.body;
    
    // 验证输入
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }
    
    // 检查用户是否已存在
    const existingUser = mockUsers.find(user => 
      user.email === email || user.username === username
    );
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }
    
    // 哈希密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // 创建新用户
    const newUser = {
      id: mockUsers.length + 1,
      username,
      email,
      password: hashedPassword,
      fullName,
      phone,
      avatar: null,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 将用户添加到模拟数据中
    mockUsers.push(newUser);
    
    // 生成JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
          phone: newUser.phone,
          avatar: newUser.avatar,
          isAdmin: newUser.isAdmin,
          createdAt: newUser.createdAt
        },
        token,
        expiresIn: process.env.JWT_EXPIRES_IN
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 验证输入
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // 查找用户
    const user = mockUsers.find(user => user.email === email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // 生成JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt
        },
        token,
        expiresIn: process.env.JWT_EXPIRES_IN
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// 获取当前用户信息
exports.getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = mockUsers.find(user => user.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt
        }
      },
      message: 'User retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
};

// 更新用户信息
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { fullName, phone, avatar } = req.body;
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // 更新用户信息
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      fullName: fullName || mockUsers[userIndex].fullName,
      phone: phone || mockUsers[userIndex].phone,
      avatar: avatar || mockUsers[userIndex].avatar,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        user: {
          id: mockUsers[userIndex].id,
          username: mockUsers[userIndex].username,
          email: mockUsers[userIndex].email,
          fullName: mockUsers[userIndex].fullName,
          phone: mockUsers[userIndex].phone,
          avatar: mockUsers[userIndex].avatar,
          isAdmin: mockUsers[userIndex].isAdmin,
          createdAt: mockUsers[userIndex].createdAt,
          updatedAt: mockUsers[userIndex].updatedAt
        }
      },
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

// 刷新token
exports.refreshToken = async (req, res) => {
  try {
    const { userId, email, isAdmin } = req.user;
    
    const newToken = jwt.sign(
      { userId, email, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      data: {
        token: newToken,
        expiresIn: process.env.JWT_EXPIRES_IN
      },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token',
      error: error.message
    });
  }
};