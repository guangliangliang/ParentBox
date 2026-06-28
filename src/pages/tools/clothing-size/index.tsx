import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { clothingSize } from '@/data/parenting-static'
import './index.scss'

export default function ClothingSize() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>👕</Text>
          <Text className='tool-title'>衣服尺码参考</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {clothingSize.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.height}</Text>
            <View className='list-row'>
              <Text className='list-label'>适合年龄</Text>
              <Text className='list-val'>{item.age}</Text>
            </View>
            <View className='list-row'>
              <Text className='list-label'>参考体重</Text>
              <Text className='list-val'>{item.weight}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

ClothingSize.onShareAppMessage = function () {
  return {
    title: '衣服尺码参考 - 家长工具库',
    path: '/pages/tools/clothing-size/index'
  }
}

ClothingSize.onShareTimeline = function () {
  return {
    title: '衣服尺码参考 - 家长工具库',
    query: ''
  }
}
