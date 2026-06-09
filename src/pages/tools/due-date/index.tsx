import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function DueDate() {
  const [date, setDate] = useState('')
  const [result, setResult] = useState<{ dueDate: string; weeks: number; days: number } | null>(null)

  const calculate = (val: string) => {
    setDate(val)
    if (!val) return
    const last = new Date(val)
    const due = new Date(last.getTime() + 280 * 24 * 60 * 60 * 1000)
    const now = new Date()
    const diff = now.getTime() - last.getTime()
    const totalDays = Math.floor(diff / (24 * 60 * 60 * 1000))
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7
    setResult({
      dueDate: `${due.getFullYear()}-${String(due.getMonth() + 1).padStart(2, '0')}-${String(due.getDate()).padStart(2, '0')}`,
      weeks: Math.max(0, weeks),
      days: Math.max(0, days)
    })
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>🤰</Text>
        <Text className='tool-title'>预产期计算</Text>
      </View>
      <View className='form-card'>
        <Text className='label'>末次月经日期</Text>
        <Picker mode='date' onChange={e => calculate(e.detail.value)}>
          <View className='picker-value'>{date || '请选择日期'}</View>
        </Picker>
      </View>
      {result && (
        <View className='result-card'>
          <View className='result-item'>
            <Text className='result-label'>预产期</Text>
            <Text className='result-value'>{result.dueDate}</Text>
          </View>
          <View className='result-item'>
            <Text className='result-label'>当前孕周</Text>
            <Text className='result-value'>{result.weeks}周{result.days}天</Text>
          </View>
        </View>
      )}
    </View>
  )
}
