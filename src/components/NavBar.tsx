import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default function NavBar() {
  const handleBack = () => {
    Taro.navigateBack()
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
