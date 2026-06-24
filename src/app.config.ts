export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/tools/due-date/index',
    'pages/tools/pregnancy-week/index',
    'pages/tools/checkup-list/index',
    'pages/tools/bag-list/index',
    'pages/tools/vaccine/index',
    'pages/tools/teeth/index',
    'pages/tools/height-standard/index',
    'pages/tools/weight-standard/index',
    'pages/tools/height-predict/index',
    'pages/tools/bmi/index',
    'pages/tools/oral-math/index',
    'pages/tools/fraction/index',
    'pages/tools/exam-countdown/index',
    'pages/tools/holiday-countdown/index',
    'pages/tools/relation/index',
    'pages/tools/zodiac/index',
    'pages/tools/constellation/index'
  ],
  tabBar: {
    color: '#9aa8b3',
    selectedColor: '#ff7a45',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tab-home.png',
        selectedIconPath: './assets/tab-home-active.png'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: './assets/tab-category.png',
        selectedIconPath: './assets/tab-category-active.png'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ff7a45',
    navigationBarTitleText: '家长工具库',
    navigationBarTextStyle: 'white'
  }
})
