import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { vaccineNotes } from '@/data/parenting-static'
import './index.scss'

export default function VaccineNotes() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>📝</Text>
          <Text className='tool-title'>疫苗接种注意事项</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {vaccineNotes.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.title}</Text>
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
