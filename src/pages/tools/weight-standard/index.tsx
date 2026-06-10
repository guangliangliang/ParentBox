import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { weightStandardData } from '@/data/weight-standard'
import './index.scss'

export default function WeightStandard() {
  const [gender, setGender] = useState(0)
  const [ageIdx, setAgeIdx] = useState(0)
  const [result, setResult] = useState<{ range: string; median: number } | null>(null)
  const ages = Array.from({ length: 19 }, (_, i) => `${i}岁`)

  const calculate = () => {
    const key = gender === 0 ? 'male' : 'female'
    const data = weightStandardData[key][ageIdx]
    if (data) setResult({ range: `${data.sd2neg} - ${data.sd2}`, median: data.median })
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>⚖️</Text>
          <Text className='tool-title'>儿童体重标准</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>性别</Text>
          <Picker mode='selector' range={['男', '女']} value={gender} onChange={e => setGender(Number(e.detail.value))}>
            <View className='picker-value'>{gender === 0 ? '男' : '女'}</View>
          </Picker>
          <Text className='label' style={{ marginTop: '20px' }}>年龄</Text>
          <Picker mode='selector' range={ages} value={ageIdx} onChange={e => setAgeIdx(Number(e.detail.value))}>
            <View className='picker-value'>{ages[ageIdx]}</View>
          </Picker>
        </View>
        <View className='calc-btn' onClick={calculate}>查询</View>
        {result && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>标准体重范围</Text>
              <Text className='result-value'>{result.range} kg</Text>
            </View>
            <View className='result-item'>
              <Text className='result-label'>中位数</Text>
              <Text className='result-value'>{result.median} kg</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
