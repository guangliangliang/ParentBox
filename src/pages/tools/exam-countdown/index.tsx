import { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function ExamCountdown() {
  const storageKey = 'examCountdownDate'
  const [date, setDate] = useState('')
  const [days, setDays] = useState<number | null>(null)
  const [saved, setSaved] = useState('')

  useEffect(() => {
    try {
      const d = Taro.getStorageSync(storageKey)
      if (d) { setSaved(d); setDate(d); calcDays(d) }
    } catch {}
  }, [])

  const calcDays = (val: string) => {
    if (!val) return
    const target = new Date(val)
    const now = new Date()
    const diff = Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
    setDays(diff)
  }

  const onDateChange = (val: string) => {
    setDate(val)
    Taro.setStorageSync(storageKey, val)
    calcDays(val)
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>⏰</Text>
          <Text className='tool-title'>考试倒计时</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>考试日期</Text>
          <Picker mode='date' onChange={e => onDateChange(e.detail.value)}>
            <View className='picker-value'>{date || '请选择日期'}</View>
          </Picker>
        </View>
        {days !== null && (
          <View className='countdown-card'>
            {days > 0 ? (
              <>
                <Text className='countdown-number'>{days}</Text>
                <Text className='countdown-unit'>天</Text>
              </>
            ) : days === 0 ? (
              <Text className='countdown-today'>今天考试！加油！</Text>
            ) : (
              <Text className='countdown-past'>考试已过 {-days} 天</Text>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
