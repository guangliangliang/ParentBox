import { View, Text } from '@tarojs/components'
import { checkupList } from '../../../data/checkup'
import './index.scss'

export default function CheckupList() {
  return (
    <View className='tool-page'>
      <View className='tool-header'>
        <Text className='tool-icon'>🏥</Text>
        <Text className='tool-title'>产检时间表</Text>
      </View>
      <View className='timeline'>
        {checkupList.map((item, i) => (
          <View key={i} className='timeline-item'>
            <View className='timeline-dot' />
            <View className='timeline-content'>
              <Text className='timeline-week'>{item.week}</Text>
              <Text className='timeline-name'>{item.name}</Text>
              <Text className='timeline-desc'>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
