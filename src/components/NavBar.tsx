import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default function NavBar() {
  const handleBack = () => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 1) {
      Taro.navigateBack()
    } else {
      Taro.switchTab({ url: '/pages/index/index' })
    }
  }

  return (
    <View className='nav-bar'>
      <View className='nav-back' onClick={handleBack}>
        <Text className='nav-arrow'>‹</Text>
        <Text className='nav-text'>返回</Text>
      </View>
    </View>
  )
}
