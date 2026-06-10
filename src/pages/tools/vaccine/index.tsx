import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { vaccineList } from '@/data/vaccine'
import './index.scss'

export default function Vaccine() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>💉</Text>
          <Text className='tool-title'>疫苗时间表</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {vaccineList.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>{item.age}</Text>
            {item.vaccines.map((v, j) => (
              <View key={j} className='list-row'>
                <Text className='list-label'>{v.name}</Text>
                <Text className='list-val'>{v.type}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
