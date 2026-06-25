import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { bathWaterTemp } from '@/data/parenting-static'
import './index.scss'

export default function BathWaterTemp() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🛁</Text>
          <Text className='tool-title'>婴儿洗澡水温参考</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {bathWaterTemp.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.age}</Text>
            <View className='list-row'>
              <Text className='list-label'>建议水温</Text>
              <Text className='list-val'>{item.temp}</Text>
            </View>
            <View className='note-text'>{item.note}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
