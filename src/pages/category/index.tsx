import { useState, useMemo, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { tools, categories, getAndClearPendingCategory, getCurrentCategory, setCurrentCategory } from '@/data/tools'
import './index.scss'

export default function Category() {
  const [activeCategory, setActiveCategory] = useState('all')

  useDidShow(() => {
    const pendingCategory = getAndClearPendingCategory()
    if (pendingCategory) {
      setActiveCategory(pendingCategory)
    } else {
      setActiveCategory(getCurrentCategory())
    }
  })

  useEffect(() => {
    setCurrentCategory(activeCategory)
  }, [activeCategory])

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return tools
    return tools.filter(t => t.category === activeCategory)
  }, [activeCategory])

  return (
    <View className='category-page'>
      <View className='fixed-header'>
        <View className='category-tags'>
          <Text
            className={activeCategory === 'all' ? 'tag tag-active' : 'tag'}
            onClick={() => setActiveCategory('all')}
          >全部</Text>
          {categories.map(cat => (
            <Text
              key={cat.id}
              className={activeCategory === cat.id ? 'tag tag-active' : 'tag'}
              onClick={() => setActiveCategory(cat.id)}
            >{cat.name}</Text>
          ))}
        </View>
      </View>

      <View className='scroll-content'>
        <View className='tool-grid'>
          {filteredTools.map(tool => (
            <View key={tool.id} className='tool-card-wrapper'>
              <View
                className='tool-card'
                onClick={() => Taro.navigateTo({ url: `/pages/tools/${tool.id}/index` })}
              >
                <Text className='tool-icon'>{tool.icon}</Text>
                <Text className='tool-name'>{tool.name}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className='ad-container'>
          <ad unit-id='' ad-type='banner' banner-size='90' />
        </View>
      </View>
    </View>
  )
}

Category.onShareAppMessage = function () {
  return {
    title: '家长工具库 - 陪伴孩子成长每一步',
    path: '/pages/category/index'
  }
}

Category.onShareTimeline = function () {
  return {
    title: '家长工具库 - 陪伴孩子成长每一步',
    query: ''
  }
}
