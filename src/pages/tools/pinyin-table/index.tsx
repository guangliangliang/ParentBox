import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { pinyinGroups } from '@/data/parenting-static'
import './index.scss'

export default function PinyinTable() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🔤</Text>
          <Text className='tool-title'>拼音声母韵母表</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {pinyinGroups.map((group, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{group.title}</Text>
            <View className='pinyin-grid'>
              {group.items.map((item, j) => <Text key={j} className='pinyin-cell'>{item}</Text>)}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
