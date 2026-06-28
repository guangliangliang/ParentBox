import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { medicineKit } from '@/data/parenting-static'
import './index.scss'

export default function MedicineKit() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

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
            {group.items.map((text, j) => {
              const key = `${i}-${j}`
              const active = checked[key]
              return (
                <View key={key} className={`check-row ${active ? 'checked' : ''}`} onClick={() => toggle(key)}>
                  <Text className='check-box'>{active ? '✓' : ''}</Text>
                  <Text className='check-text'>{text}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

MedicineKit.onShareAppMessage = function () {
  return {
    title: '家庭药箱清单 - 家长工具库',
    path: '/pages/tools/medicine-kit/index'
  }
}

MedicineKit.onShareTimeline = function () {
  return {
    title: '家庭药箱清单 - 家长工具库',
    query: ''
  }
}
