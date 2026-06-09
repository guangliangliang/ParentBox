import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { idiomData } from '../../../data/idiom'
import './index.scss'

function getLastChar(idiom: string): string {
  return idiom.charAt(idiom.length - 1)
}

function getFirstChar(idiom: string): string {
  return idiom.charAt(0)
}

export default function Idiom() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<string[]>([])

  const search = () => {
    if (!input.trim()) return
    const lastChar = getLastChar(input.trim())
    const matched = idiomData.filter(idiom => getFirstChar(idiom) === lastChar)
    setResults(matched.slice(0, 20))
  }

  return (
    <View className='tool-page'>
      <View className='tool-header'>
        <Text className='tool-icon'>📖</Text>
        <Text className='tool-title'>成语接龙</Text>
      </View>
      <View className='form-card'>
        <Text className='label'>输入成语</Text>
        <Input className='input-field' placeholder='请输入一个成语' value={input} onInput={e => setInput(e.detail.value)} />
      </View>
      <View className='calc-btn' onClick={search}>接龙查询</View>
      {results.length > 0 && (
        <View className='result-list'>
          <Text className='result-count'>找到 {results.length} 个可接龙成语</Text>
          {results.map((item, i) => (
            <View key={i} className='idiom-item'>
              <Text className='idiom-text'>{item}</Text>
            </View>
          ))}
        </View>
      )}
      {results.length === 0 && input && (
        <View className='result-list'>
          <Text className='empty-text'>未找到可接龙的成语</Text>
        </View>
      )}
    </View>
  )
}
