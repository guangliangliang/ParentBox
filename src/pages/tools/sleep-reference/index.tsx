import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { sleepReference } from '@/data/parenting-static'
import './index.scss'

export default function SleepReference() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>💤</Text>
          <Text className='tool-title'>睡眠时长参考表</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {sleepReference.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.age}</Text>
            <View className='list-row'>
              <Text className='list-label'>建议时长</Text>
              <Text className='list-val'>{item.time}</Text>
            </View>
            <View className='note-text'>{item.note}</View>
          </View>
        ))}
      </View>
    </View>
  )
}

SleepReference.onShareAppMessage = function () {
  return {
    title: '睡眠时长参考表 - 家长工具库',
    path: '/pages/tools/sleep-reference/index'
  }
}

SleepReference.onShareTimeline = function () {
  return {
    title: '睡眠时长参考表 - 家长工具库',
    query: ''
  }
}
