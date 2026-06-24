import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { milestones } from '@/data/parenting-static'
import './index.scss'

export default function Milestone() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🌱</Text>
          <Text className='tool-title'>宝宝发育里程碑</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {milestones.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.age}</Text>
            {item.items.map((text, j) => (
              <View key={j} className='bullet-row'>
                <Text className='bullet-dot'>•</Text>
                <Text className='bullet-text'>{text}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
