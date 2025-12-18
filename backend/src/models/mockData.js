// 模拟数据
const mockPhotos = [
  {
    id: 1,
    filename: "ferris_wheel_1.jpg",
    originalname: "ferris_wheel_1.jpg",
    location: "摩天轮",
    time: "2024-01-18 14:30:00",
    area: "北区",
    category: "scenic",
    price: 29.9,
    views: 156,
    downloads: 23,
    createdAt: "2024-01-18T14:30:00.000Z",
    updatedAt: "2024-01-18T14:30:00.000Z"
  },
  {
    id: 2,
    filename: "garden_area_1.jpg",
    originalname: "garden_area_1.jpg",
    location: "花园区",
    time: "2024-01-18 11:15:00",
    area: "东区",
    category: "garden",
    price: 29.9,
    views: 89,
    downloads: 12,
    createdAt: "2024-01-18T11:15:00.000Z",
    updatedAt: "2024-01-18T11:15:00.000Z"
  },
  {
    id: 3,
    filename: "roller_coaster_1.jpg",
    originalname: "roller_coaster_1.jpg",
    location: "过山车",
    time: "2024-01-18 15:45:00",
    area: "西区",
    category: "ride",
    price: 29.9,
    views: 234,
    downloads: 45,
    createdAt: "2024-01-18T15:45:00.000Z",
    updatedAt: "2024-01-18T15:45:00.000Z"
  },
  {
    id: 4,
    filename: "carousel_1.jpg",
    originalname: "carousel_1.jpg",
    location: "旋转木马",
    time: "2024-01-18 10:20:00",
    area: "南区",
    category: "ride",
    price: 29.9,
    views: 167,
    downloads: 28,
    createdAt: "2024-01-18T10:20:00.000Z",
    updatedAt: "2024-01-18T10:20:00.000Z"
  },
  {
    id: 5,
    filename: "roller_coaster_2.jpg",
    originalname: "roller_coaster_2.jpg",
    location: "过山车",
    time: "2024-01-18 13:10:00",
    area: "西区",
    category: "ride",
    price: 29.9,
    views: 198,
    downloads: 34,
    createdAt: "2024-01-18T13:10:00.000Z",
    updatedAt: "2024-01-18T13:10:00.000Z"
  },
  {
    id: 6,
    filename: "roller_coaster_3.jpg",
    originalname: "roller_coaster_3.jpg",
    location: "过山车",
    time: "2024-01-18 16:25:00",
    area: "西区",
    category: "ride",
    price: 29.9,
    views: 145,
    downloads: 21,
    createdAt: "2024-01-18T16:25:00.000Z",
    updatedAt: "2024-01-18T16:25:00.000Z"
  },
  {
    id: 7,
    filename: "roller_coaster_4.jpg",
    originalname: "roller_coaster_4.jpg",
    location: "过山车",
    time: "2024-01-18 09:50:00",
    area: "西区",
    category: "ride",
    price: 29.9,
    views: 123,
    downloads: 18,
    createdAt: "2024-01-18T09:50:00.000Z",
    updatedAt: "2024-01-18T09:50:00.000Z"
  },
  {
    id: 8,
    filename: "kids_area_1.jpg",
    originalname: "kids_area_1.jpg",
    location: "儿童区",
    time: "2024-01-18 11:30:00",
    area: "南区",
    category: "kids",
    price: 29.9,
    views: 87,
    downloads: 14,
    createdAt: "2024-01-18T11:30:00.000Z",
    updatedAt: "2024-01-18T11:30:00.000Z"
  }
];

const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "$2a$10$6J6gC5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO", // password: test123
    fullName: "测试用户",
    phone: "13800138000",
    avatar: null,
    isAdmin: false,
    createdAt: "2024-01-18T00:00:00.000Z",
    updatedAt: "2024-01-18T00:00:00.000Z"
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$6J6gC5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO5eO", // password: admin123
    fullName: "管理员",
    phone: "13900139000",
    avatar: null,
    isAdmin: true,
    createdAt: "2024-01-18T00:00:00.000Z",
    updatedAt: "2024-01-18T00:00:00.000Z"
  }
];

const mockOrders = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        photoId: 1,
        quantity: 1,
        price: 29.9,
        packageType: "single"
      }
    ],
    totalAmount: 29.9,
    paymentMethod: "alipay",
    paymentStatus: "completed",
    orderStatus: "delivered",
    downloadLinks: [
      {
        photoId: 1,
        link: "https://example.com/download/photo1.zip",
        expiresAt: "2024-01-25T00:00:00.000Z"
      }
    ],
    createdAt: "2024-01-18T15:00:00.000Z",
    updatedAt: "2024-01-18T15:00:00.000Z"
  }
];

const mockCart = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        photoId: 2,
        quantity: 1,
        price: 29.9,
        packageType: "single"
      },
      {
        photoId: 3,
        quantity: 1,
        price: 29.9,
        packageType: "single"
      }
    ],
    createdAt: "2024-01-18T14:00:00.000Z",
    updatedAt: "2024-01-18T14:00:00.000Z"
  }
];

const mockPackages = [
  {
    id: 1,
    name: "单张照片",
    price: 29.9,
    unit: "张",
    features: [
      "高清无水印照片",
      "原始尺寸下载",
      "个人使用授权"
    ],
    popular: false
  },
  {
    id: 2,
    name: "5张照片套餐",
    price: 99,
    unit: "套",
    originalPrice: 149.5,
    features: [
      "5张高清无水印照片",
      "原始尺寸下载",
      "个人使用授权",
      "免费照片拼贴服务"
    ],
    popular: true
  },
  {
    id: 3,
    name: "无限照片套餐",
    price: 199,
    unit: "天",
    features: [
      "当天所有照片无限下载",
      "原始尺寸下载",
      "个人使用授权",
      "免费照片拼贴服务",
      "数字相册自动生成"
    ],
    popular: false
  }
];

module.exports = {
  mockPhotos,
  mockUsers,
  mockOrders,
  mockCart,
  mockPackages
};