import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { emergencyPhones } from '@/data/parenting-static'
import './index.scss'

export default function EmergencyPhone() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>☎️</Text>
          <Text className='tool-title'>紧急电话速查</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='result-card'>
          {emergencyPhones.map((item, i) => (
            <View key={i} className='result-item'>
              <Text className='result-label'>{item.name}</Text>
              <Text className='result-value'>{item.phone}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

EmergencyPhone.onShareAppMessage = function () {
  return {
    title: '紧急电话速查 - 家长工具库',
    path: '/pages/tools/emergency-phone/index'
  }
}

EmergencyPhone.onShareTimeline = function () {
  return {
    title: '紧急电话速查 - 家长工具库',
    query: ''
  }
}
