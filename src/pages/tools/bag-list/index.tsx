import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { bagListData } from '@/data/bag-list'
import './index.scss'

type BagCategory = { category: string; items: string[] }

export default function BagList() {
  const storageKey = 'bagListChecked'
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try { return Taro.getStorageSync(storageKey) || {} } catch { return {} }
  })

  const toggle = (item: string) => {
    const next = { ...checked, [item]: !checked[item] }
    setChecked(next)
    Taro.setStorageSync(storageKey, next)
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🎒</Text>
          <Text className='tool-title'>待产包清单</Text>
        </View>
      </View>
      <View className='scroll-content'>
        {(bagListData as BagCategory[]).map((cat, ci) => (
          <View key={ci} className='bag-section'>
            <Text className='section-title'>{cat.category}</Text>
            {cat.items.map((item, ii) => (
              <View key={ii} className='bag-item' onClick={() => toggle(`${ci}-${ii}`)}>
                <View className={`checkbox ${checked[`${ci}-${ii}`] ? 'checked' : ''}`} />
                <Text className={`item-text ${checked[`${ci}-${ii}`] ? 'checked' : ''}`}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

BagList.onShareAppMessage = function () {
  return {
    title: '待产包清单 - 家长工具库',
    path: '/pages/tools/bag-list/index'
  }
}

BagList.onShareTimeline = function () {
  return {
    title: '待产包清单 - 家长工具库',
    query: ''
  }
}
