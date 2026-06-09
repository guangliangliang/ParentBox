import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { teethData } from '@/data/teeth'
import './index.scss'

export default function Teeth() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>🦷</Text>
        <Text className='tool-title'>长牙时间表</Text>
      </View>
      {teethData.map((item, i) => (
        <View key={i} className='list-card'>
          <Text className='list-title'>{item.age}</Text>
          {item.teeth.map((t, j) => (
            <View key={j} className='list-row'>
              <Text className='list-label'>{t.name}</Text>
              <Text className='list-val'>{t.count}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
