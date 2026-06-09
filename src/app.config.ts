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
    'pages/tools/idiom/index',
    'pages/tools/exam-countdown/index',
    'pages/tools/holiday-countdown/index',
    'pages/tools/relation/index',
    'pages/tools/zodiac/index',
    'pages/tools/constellation/index'
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#FF6B35',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FF6B35',
    navigationBarTitleText: '家长百宝箱',
    navigationBarTextStyle: 'white'
  }
})
