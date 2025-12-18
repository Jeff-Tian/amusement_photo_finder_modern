// 模拟照片数据
export const mockPhotos = [
  {
    id: 1,
    src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/986956881765073005~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=qnXgHFv2vRbLosIgP%2BaHMUsoDmE%3D",
    location: "摩天轮",
    time: "今天 14:30",
    date: "2025-12-18",
    area: "北区",
    price: 29.9,
    category: "scenic",
    colors: ["红色", "蓝色"]
  },
  {
    id: 2,
    src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/965729186175385786~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=zoLwmMlxsB64mCObl1VcrRbLosIgP%2BaHMUsoDmE%3D",
    location: "花园区",
    time: "昨天 11:15",
    date: "2025-12-17",
    area: "东区",
    price: 29.9,
    category: "garden",
    colors: ["绿色", "黄色"]
  },
  {
    id: 3,
    src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/970465968286334981~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=PO8iM0wjcpz819g1Fmjp0f2gmmo%3D",
    location: "过山车",
    time: "前天 15:45",
    date: "2025-12-16",
    area: "西区",
    price: 29.9,
    category: "ride",
    colors: ["黑色", "红色"]
  },
  {
    id: 4,
    src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/965729246413979675~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=FqvPEAUfTZsS6bDOf363IdpyGxY%3D",
    location: "旋转木马",
    time: "今天 10:20",
    date: "2025-12-18",
    area: "南区",
    price: 29.9,
    category: "ride",
    colors: ["粉色", "白色"]
  },
  {
    id: 5,
    src: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/891695701034008697~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=X3Bu5wpIErjwhI3RZg%2FmI%2BeZtAE%3D",
    location: "过山车",
    time: "昨天 13:10",
    date: "2025-12-17",
    area: "西区",
    price: 29.9,
    category: "ride",
    colors: ["蓝色", "白色"]
  },
  {
    id: 6,
    src: "https://p11-doubao-search-sign.byteimg.com/labis/064dd41f32f3dd419f963096032f0a59~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=JpX%2FMNkfK7hjKfbv1QGT0cimT3g%3D",
    location: "过山车",
    time: "前天 16:25",
    date: "2025-12-16",
    area: "西区",
    price: 29.9,
    category: "ride",
    colors: ["绿色", "黑色"]
  },
  {
    id: 7,
    src: "https://p11-doubao-search-sign.byteimg.com/labis/04556e8562e853fe330236d5904ce078~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593794&x-signature=9DmCx4d2XmlZNpRdz1jfmB%2BfiQs%3D",
    location: "过山车",
    time: "3天前 09:50",
    date: "2025-12-15",
    area: "西区",
    price: 29.9,
    category: "ride",
    colors: ["黄色", "红色"]
  },
  {
    id: 8,
    src: "https://p3-doubao-search-sign.byteimg.com/labis/b0588532b082a66554adcf315ea7c954~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593793&x-signature=%2BdlXTkl60kLfMKM9FarVVdJl99Q%3D",
    location: "儿童区",
    time: "昨天 11:30",
    date: "2025-12-17",
    area: "南区",
    price: 29.9,
    category: "kids",
    colors: ["紫色", "橙色"]
  }
];

// 模拟热门项目数据
export const mockPopularProjects = [
  {
    id: 1,
    name: "摩天轮",
    description: "在最高点捕捉整个游乐园的美景",
    image: "https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/2328742812844163073~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1781593793&x-signature=x%2BKQKdmUZY%2FO%2BGkDf94IRccxJe8%3D",
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

// 模拟价格套餐数据
export const mockPackages = [
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

// 模拟用户评价数据
export const mockReviews = [
  {
    id: 1,
    rating: 5,
    content: "太棒了！我和家人在游乐园玩了一天，通过这个网站轻松找到了我们在各个项目上的照片。AI匹配功能非常准确，省去了很多时间。强烈推荐！",
    user: {
      name: "张先生",
      avatar: "张",
      location: "上海迪士尼乐园游客"
    }
  },
  {
    id: 2,
    rating: 4.5,
    content: "价格合理，照片质量很好。我特别喜欢无限照片套餐，一天下来拍了很多照片，全部都能下载保存，非常值得！",
    user: {
      name: "李女士",
      avatar: "李",
      location: "北京欢乐谷游客"
    }
  },
  {
    id: 3,
    rating: 4,
    content: "网站使用很方便，搜索功能强大。唯一的小缺点是有时候需要等待几分钟才能看到最新拍摄的照片，但总体来说非常满意！",
    user: {
      name: "王先生",
      avatar: "王",
      location: "广州长隆欢乐世界游客"
    }
  }
];

// 模拟FAQ数据
export const mockFAQs = [
  {
    id: 1,
    question: "照片上传后多久可以在系统中找到？",
    answer: "照片通常在拍摄后5-10分钟内即可在系统中找到。高峰期可能会略有延迟，但一般不超过30分钟。"
  },
  {
    id: 2,
    question: "如何确保找到的照片是我本人？",
    answer: "我们提供多种方式帮助您确认：1) 预览低清版本可以清晰辨认人物；2) 提供时间和地点信息作为参考；3) AI智能匹配功能可以根据您上传的自拍照进行人脸识别匹配，提高准确率。"
  },
  {
    id: 3,
    question: "购买后的照片可以用于商业用途吗？",
    answer: "所有购买的照片仅授予个人使用权限，不可用于商业用途。如需商业使用授权，请联系我们的客服进行特殊授权申请。"
  },
  {
    id: 4,
    question: "如果找不到我想要的照片怎么办？",
    answer: "如果您无法找到特定照片，可以尝试调整搜索条件，或者使用AI智能匹配功能。如果仍然找不到，可以联系我们的客服，提供详细的时间、地点和穿着信息，我们的工作人员会协助您查找。"
  },
  {
    id: 5,
    question: "购买后可以退款吗？",
    answer: "由于照片是数字产品，一旦下载高清版本后不支持退款。但如果您购买后发现照片质量有问题，或者确认照片中不包含您，可以在购买后24小时内联系客服申请退款。"
  }
];