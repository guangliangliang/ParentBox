import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { medicineKit } from '@/data/parenting-static'
import './index.scss'

export default function MedicineKit() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>💊</Text>
          <Text className='tool-title'>家庭药箱清单</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {medicineKit.map((group, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{group.title}</Text>
            {group.items.map((text, j) => (
              <View key={j} className='check-row'>
                <Text className='check-box'>□</Text>
                <Text className='check-text'>{text}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
