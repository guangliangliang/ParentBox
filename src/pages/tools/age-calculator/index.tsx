import { useState } from 'react'
import { View, Text, Picker, Input } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import './index.scss'

type Mode = 'age' | 'diff' | 'add'

function getTodayString() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDate(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function calculateAge(birthDate: Date, today: Date) {
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalMonths = years * 12 + months

  return { years, months, days, totalDays, totalMonths }
}

function calculateDiff(date1: Date, date2: Date) {
  const diff = Math.abs(date2.getTime() - date1.getTime())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  return { days, weeks }
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export default function AgeCalculator() {
  const [mode, setMode] = useState<Mode>('age')
  const [birthDate, setBirthDate] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [baseDate, setBaseDate] = useState('')
  const [daysToAdd, setDaysToAdd] = useState('')

  let result = null

  if (mode === 'age' && birthDate) {
    const birth = parseDate(birthDate)
    const age = calculateAge(birth, new Date())
    result = (
      <View className='result-card'>
        <View className='result-item'>
          <Text className='result-label'>精确年龄</Text>
          <Text className='result-value'>{age.years}岁 {age.months}个月 {age.days}天</Text>
        </View>
        <View className='result-item'>
          <Text className='result-label'>总天数</Text>
          <Text className='result-value'>{age.totalDays} 天</Text>
        </View>
        <View className='result-item'>
          <Text className='result-label'>总月数</Text>
          <Text className='result-value'>{age.totalMonths} 个月</Text>
        </View>
      </View>
    )
  } else if (mode === 'diff' && date1 && date2) {
    const d1 = parseDate(date1)
    const d2 = parseDate(date2)
    const diff = calculateDiff(d1, d2)
    result = (
      <View className='result-card'>
        <View className='result-item'>
          <Text className='result-label'>相差天数</Text>
          <Text className='result-value'>{diff.days} 天</Text>
        </View>
        <View className='result-item'>
          <Text className='result-label'>相差周数</Text>
          <Text className='result-value'>{diff.weeks} 周</Text>
        </View>
      </View>
    )
  } else if (mode === 'add' && baseDate && daysToAdd) {
    const base = parseDate(baseDate)
    const days = parseInt(daysToAdd)
    if (!isNaN(days)) {
      const resultDate = addDays(base, days)
      result = (
        <View className='result-card'>
          <View className='result-item'>
            <Text className='result-label'>{days > 0 ? `${days}天后` : `${Math.abs(days)}天前`}</Text>
            <Text className='result-value'>{formatDate(resultDate)}</Text>
          </View>
        </View>
      )
    }
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🎂</Text>
          <Text className='tool-title'>年龄/天数计算器</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>功能选择</Text>
          <View className='op-row'>
            <View
              className={`op-btn ${mode === 'age' ? 'active' : ''}`}
              onClick={() => setMode('age')}
            >
              <Text>计算年龄</Text>
            </View>
            <View
              className={`op-btn ${mode === 'diff' ? 'active' : ''}`}
              onClick={() => setMode('diff')}
            >
              <Text>日期差</Text>
            </View>
            <View
              className={`op-btn ${mode === 'add' ? 'active' : ''}`}
              onClick={() => setMode('add')}
            >
              <Text>日期推算</Text>
            </View>
          </View>
        </View>

        {mode === 'age' && (
          <View className='form-card'>
            <Text className='label'>出生日期</Text>
            <Picker mode='date' onChange={e => setBirthDate(e.detail.value)}>
              <View className='picker-value'>{birthDate || '请选择日期'}</View>
            </Picker>
          </View>
        )}

        {mode === 'diff' && (
          <>
            <View className='form-card'>
              <Text className='label'>开始日期</Text>
              <Picker mode='date' onChange={e => setDate1(e.detail.value)}>
                <View className='picker-value'>{date1 || '请选择日期'}</View>
              </Picker>
            </View>
            <View className='form-card'>
              <Text className='label'>结束日期</Text>
              <Picker mode='date' onChange={e => setDate2(e.detail.value)}>
                <View className='picker-value'>{date2 || '请选择日期'}</View>
              </Picker>
            </View>
          </>
        )}

        {mode === 'add' && (
          <>
            <View className='form-card'>
              <Text className='label'>基准日期</Text>
              <Picker mode='date' onChange={e => setBaseDate(e.detail.value)}>
                <View className='picker-value'>{baseDate || '请选择日期'}</View>
              </Picker>
            </View>
            <View className='form-card'>
              <Text className='label'>天数（正数向后推，负数向前推）</Text>
              <Input
                className='input-field input-field-center h5-text-center'
                type='text'
                placeholder='请输入天数'
                placeholderClass='input-placeholder'
                value={daysToAdd}
                onInput={e => setDaysToAdd(e.detail.value)}
                style={{ textAlign: 'center' }}
              />
            </View>
          </>
        )}

        {result}
      </View>
    </View>
  )
}

AgeCalculator.onShareAppMessage = function () {
  return {
    title: '年龄/天数计算器 - 家长工具库',
    path: '/pages/tools/age-calculator/index'
  }
}

AgeCalculator.onShareTimeline = function () {
  return {
    title: '年龄/天数计算器 - 家长工具库',
    query: ''
  }
}
