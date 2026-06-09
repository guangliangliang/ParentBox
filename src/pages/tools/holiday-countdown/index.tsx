import { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function HolidayCountdown() {
  const summerKey = 'summerHolidayDate'
  const winterKey = 'winterHolidayDate'
  const [summerDate, setSummerDate] = useState('')
  const [winterDate, setWinterDate] = useState('')
  const [summerDays, setSummerDays] = useState<number | null>(null)
  const [winterDays, setWinterDays] = useState<number | null>(null)

  useEffect(() => {
    try {
      const sd = Taro.getStorageSync(summerKey)
      const wd = Taro.getStorageSync(winterKey)
      if (sd) { setSummerDate(sd); calcDays(sd, 'summer') }
      if (wd) { setWinterDate(wd); calcDays(wd, 'winter') }
    } catch {}
  }, [])

  const calcDays = (val: string, type: 'summer' | 'winter') => {
    if (!val) return
    const target = new Date(val)
    const now = new Date()
    const diff = Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
    if (type === 'summer') setSummerDays(diff)
    else setWinterDays(diff)
  }

  const onSummerChange = (val: string) => {
    setSummerDate(val)
    Taro.setStorageSync(summerKey, val)
    calcDays(val, 'summer')
  }

  const onWinterChange = (val: string) => {
    setWinterDate(val)
    Taro.setStorageSync(winterKey, val)
    calcDays(val, 'winter')
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>🏖️</Text>
        <Text className='tool-title'>寒暑假倒计时</Text>
      </View>
      <View className='form-card'>
        <Text className='label'>暑假开始日期</Text>
        <Picker mode='date' onChange={e => onSummerChange(e.detail.value)}>
          <View className='picker-value'>{summerDate || '请选择日期'}</View>
        </Picker>
      </View>
      {summerDays !== null && (
        <View className='countdown-card'>
          {summerDays > 0 ? (
            <><Text className='countdown-number'>{summerDays}</Text><Text className='countdown-unit'>天后放暑假</Text></>
          ) : summerDays === 0 ? <Text className='countdown-today'>今天开始放暑假！</Text> : <Text className='countdown-past'>暑假已开始</Text>}
        </View>
      )}
      <View className='form-card' style={{ marginTop: '24px' }}>
        <Text className='label'>寒假开始日期</Text>
        <Picker mode='date' onChange={e => onWinterChange(e.detail.value)}>
          <View className='picker-value'>{winterDate || '请选择日期'}</View>
        </Picker>
      </View>
      {winterDays !== null && (
        <View className='countdown-card'>
          {winterDays > 0 ? (
            <><Text className='countdown-number'>{winterDays}</Text><Text className='countdown-unit'>天后放寒假</Text></>
          ) : winterDays === 0 ? <Text className='countdown-today'>今天开始放寒假！</Text> : <Text className='countdown-past'>寒假已开始</Text>}
        </View>
      )}
    </View>
  )
}
