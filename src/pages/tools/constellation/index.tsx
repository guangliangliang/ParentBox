import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

const constellations = [
  { name: '摩羯座', start: [1, 1], end: [1, 19] },
  { name: '水瓶座', start: [1, 20], end: [2, 18] },
  { name: '双鱼座', start: [2, 19], end: [3, 20] },
  { name: '白羊座', start: [3, 21], end: [4, 19] },
  { name: '金牛座', start: [4, 20], end: [5, 20] },
  { name: '双子座', start: [5, 21], end: [6, 21] },
  { name: '巨蟹座', start: [6, 22], end: [7, 22] },
  { name: '狮子座', start: [7, 23], end: [8, 22] },
  { name: '处女座', start: [8, 23], end: [9, 22] },
  { name: '天秤座', start: [9, 23], end: [10, 23] },
  { name: '天蝎座', start: [10, 24], end: [11, 22] },
  { name: '射手座', start: [11, 23], end: [12, 21] },
  { name: '摩羯座', start: [12, 22], end: [12, 31] }
]

function getConstellation(month: number, day: number): string {
  for (const c of constellations) {
    const [sm, sd] = c.start
    const [em, ed] = c.end
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return c.name
    }
  }
  return '摩羯座'
}

const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
const days31 = Array.from({ length: 31 }, (_, i) => `${i + 1}日`)

export default function Constellation() {
  const [monthIdx, setMonthIdx] = useState(0)
  const [dayIdx, setDayIdx] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
    setResult(getConstellation(monthIdx + 1, dayIdx + 1))
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>⭐</Text>
          <Text className='tool-title'>星座查询</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>生日月份</Text>
          <Picker mode='selector' range={months} value={monthIdx} onChange={e => setMonthIdx(Number(e.detail.value))}>
            <View className='picker-value'>{months[monthIdx]}</View>
          </Picker>
          <Text className='label' style={{ marginTop: '20px' }}>生日日期</Text>
          <Picker mode='selector' range={days31} value={dayIdx} onChange={e => setDayIdx(Number(e.detail.value))}>
            <View className='picker-value'>{days31[dayIdx]}</View>
          </Picker>
        </View>
        <View className='calc-btn' onClick={calculate}>查询星座</View>
        {result && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>星座</Text>
              <Text className='result-value'>{result}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
