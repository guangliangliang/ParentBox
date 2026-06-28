import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function PregnancyWeek() {
  const [date, setDate] = useState('')
  const [result, setResult] = useState<{ weeks: number; days: number; totalDays: number } | null>(null)

  const calculate = (val: string) => {
    setDate(val)
    if (!val) return
    const last = new Date(val)
    const now = new Date()
    const diff = now.getTime() - last.getTime()
    const totalDays = Math.floor(diff / (24 * 60 * 60 * 1000))
    setResult({
      weeks: Math.max(0, Math.floor(totalDays / 7)),
      days: Math.max(0, totalDays % 7),
      totalDays: Math.max(0, totalDays)
    })
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>📅</Text>
          <Text className='tool-title'>孕周计算</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>末次月经日期</Text>
          <Picker mode='date' onChange={e => calculate(e.detail.value)}>
            <View className='picker-value'>{date || '请选择日期'}</View>
          </Picker>
        </View>
        {result && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>当前孕周</Text>
              <Text className='result-value'>{result.weeks}周</Text>
            </View>
            <View className='result-item'>
              <Text className='result-label'>剩余天数</Text>
              <Text className='result-value'>{result.days}天</Text>
            </View>
            <View className='result-item'>
              <Text className='result-label'>已孕天数</Text>
              <Text className='result-value'>{result.totalDays}天</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

PregnancyWeek.onShareAppMessage = function () {
  return {
    title: '孕周计算 - 家长工具库',
    path: '/pages/tools/pregnancy-week/index'
  }
}

PregnancyWeek.onShareTimeline = function () {
  return {
    title: '孕周计算 - 家长工具库',
    query: ''
  }
}
