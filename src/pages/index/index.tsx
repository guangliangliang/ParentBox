import { useState, useMemo } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tools, categories, type ToolItem, type CategoryItem, setSelectedCategory } from '@/data/tools'
import './index.scss'

const categoryIcons: Record<string, string> = {
  pregnancy: '🤰',
  newborn: '👶',
  toddler: '🧒',
  student: '🎒',
  family: '🏠'
}

const hotToolIds = ['height-predict', 'oral-math', 'relation', 'zodiac']

export default function Index() {
  const [keyword, setKeyword] = useState('')

  const filteredTools = useMemo(() => {
    if (!keyword.trim()) return null
    const k = keyword.trim().toLowerCase()
    return tools.filter(t => t.name.toLowerCase().includes(k) || t.keywords.some(w => w.includes(k)))
  }, [keyword])

  const hotTools = useMemo(() => hotToolIds.map(id => tools.find(t => t.id === id)!).filter(Boolean), [])

  return (
    <View className='index-page'>
      <View className='header'>
        <Text className='title'>家长百宝箱</Text>
        <Text className='subtitle'>陪伴孩子成长每一步</Text>
      </View>

      <View className='search-bar'>
        <Text className='search-icon'>🔍</Text>
        <Input
          className='search-input'
          placeholder='搜索工具'
          value={keyword}
          onInput={e => setKeyword(e.detail.value)}
        />
      </View>

      {filteredTools ? (
        <View className='search-results'>
          {filteredTools.length === 0 ? (
            <Text className='empty-text'>未找到相关工具</Text>
          ) : (
            filteredTools.map(tool => (
              <View key={tool.id} className='tool-card-small' onClick={() => Taro.navigateTo({ url: `/pages/tools/${tool.id}/index` })}>
                <Text className='tool-icon'>{tool.icon}</Text>
                <Text className='tool-name'>{tool.name}</Text>
              </View>
            ))
          )}
        </View>
      ) : (
        <>
          <View className='hot-section'>
            <Text className='section-title'>🔥 热门功能</Text>
            <View className='hot-grid'>
              {hotTools.map(tool => (
                <View key={tool.id} className='hot-card-wrapper'>
                  <View className='hot-card' onClick={() => Taro.navigateTo({ url: `/pages/tools/${tool.id}/index` })}>
                    <Text className='hot-icon'>{tool.icon}</Text>
                    <Text className='hot-name'>{tool.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className='category-grid'>
            {categories.map(cat => (
              <View key={cat.id} className='category-card-wrapper'>
                <View className='category-card' onClick={() => { setSelectedCategory(cat.id); Taro.navigateTo({ url: '/pages/category/index' }) }}>
                  <Text className='category-icon'>{categoryIcons[cat.id]}</Text>
                  <Text className='category-name'>{cat.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      <View className='ad-container'>
        <ad unit-id='' ad-type='banner' banner-size='90' />
      </View>
    </View>
  )
}
