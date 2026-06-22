import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

const zodiacList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const years = Array.from({ length: 100 }, (_, i) => `${1940 + i}`)

function getZodiac(year: number): string {
  return zodiacList[(year - 4) % 12]
}

export default function Zodiac() {
  const currentYear = new Date().getFullYear()
  const defaultIdx = Math.max(0, Math.min(99, currentYear - 1940))
  const [yearIdx, setYearIdx] = useState(defaultIdx)
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
    const year = parseInt(years[yearIdx])
    setResult(getZodiac(year))
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🐉</Text>
          <Text className='tool-title'>生肖查询</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>出生年份</Text>
          <Picker mode='selector' range={years} value={yearIdx} onChange={e => setYearIdx(Number(e.detail.value))}>
            <View className='picker-value'>{years[yearIdx]}年</View>
          </Picker>
        </View>
        <View className='calc-btn' onClick={calculate}>查询生肖</View>
        {result && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>生肖</Text>
              <Text className='result-value'>{result}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
