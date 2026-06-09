import { useState, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tools, categories, type ToolItem } from '../../data/tools'
import './index.scss'

export default function Category() {
  const params = new URLSearchParams(window.location?.search || '')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return tools
    return tools.filter(t => t.category === activeCategory)
  }, [activeCategory])

  return (
    <View className='category-page'>
      <View className='tabs'>
        <Text
          className={`tab ${activeCategory === 'all' ? 'tab-active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >全部</Text>
        {categories.map(cat => (
          <Text
            key={cat.id}
            className={`tab ${activeCategory === cat.id ? 'tab-active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >{cat.name}</Text>
        ))}
      </View>

      <View className='tool-grid'>
        {filteredTools.map(tool => (
          <View
            key={tool.id}
            className='tool-card'
            onClick={() => Taro.navigateTo({ url: `/pages/tools/${tool.id}/index` })}
          >
            <Text className='tool-icon'>{tool.icon}</Text>
            <Text className='tool-name'>{tool.name}</Text>
          </View>
        ))}
      </View>

      <View className='ad-container'>
        <ad unit-id='' ad-type='banner' banner-size='90' />
      </View>
    </View>
  )
}
