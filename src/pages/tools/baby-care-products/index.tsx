import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import { babyCareProducts } from '@/data/parenting-static'
import './index.scss'

export default function BabyCareProducts() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🧴</Text>
          <Text className='tool-title'>婴儿洗护用品清单</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {babyCareProducts.map((group, i) => (
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
