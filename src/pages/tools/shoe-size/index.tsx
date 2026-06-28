import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { shoeSizeChart } from '@/data/parenting-static'
import './index.scss'

export default function ShoeSize() {
  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>👟</Text>
          <Text className='tool-title'>儿童鞋码对照表</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {shoeSizeChart.map((item, i) => (
          <View key={i} className='list-card'>
            <Text className='list-title'>脚长 {item.footLength}</Text>
            <View className='list-row'>
              <Text className='list-label'>中国码</Text>
              <Text className='list-val'>{item.cnSize}</Text>
            </View>
            <View className='list-row'>
              <Text className='list-label'>欧码</Text>
              <Text className='list-val'>{item.euSize}</Text>
            </View>
            <View className='list-row'>
              <Text className='list-label'>美码</Text>
              <Text className='list-val'>{item.usSize}</Text>
            </View>
            <View className='list-row'>
              <Text className='list-label'>建议年龄</Text>
              <Text className='list-val'>{item.age}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

ShoeSize.onShareAppMessage = function () {
  return {
    title: '儿童鞋码对照表 - 家长工具库',
    path: '/pages/tools/shoe-size/index'
  }
}

ShoeSize.onShareTimeline = function () {
  return {
    title: '儿童鞋码对照表 - 家长工具库',
    query: ''
  }
}
