import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { foodGuide } from '@/data/parenting-static'
import './index.scss'

export default function FoodGuide() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🥣</Text>
          <Text className='tool-title'>宝宝辅食添加月龄表</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {foodGuide.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.age}</Text>
            <View className='tag-wrap'>
              {item.foods.map((food, j) => <Text key={j} className='info-tag'>{food}</Text>)}
            </View>
            <View className='note-text'>{item.note}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
