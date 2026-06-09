import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

function getBMILevel(bmi: number): string {
  if (bmi < 18.5) return '偏瘦'
  if (bmi < 24) return '正常'
  if (bmi < 28) return '偏胖'
  return '肥胖'
}

export default function BMI() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<{ bmi: number; level: string } | null>(null)

  const calculate = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w) return
    const bmi = Math.round((w / ((h / 100) ** 2)) * 10) / 10
    setResult({ bmi, level: getBMILevel(bmi) })
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>📊</Text>
        <Text className='tool-title'>BMI计算</Text>
      </View>
      <View className='form-card'>
        <Text className='label'>身高 (cm)</Text>
        <Input className='input-field' type='digit' placeholder='请输入身高' value={height} onInput={e => setHeight(e.detail.value)} />
        <Text className='label'>体重 (kg)</Text>
        <Input className='input-field' type='digit' placeholder='请输入体重' value={weight} onInput={e => setWeight(e.detail.value)} />
      </View>
      <View className='calc-btn' onClick={calculate}>计算BMI</View>
      {result && (
        <View className='result-card'>
          <View className='result-item'>
            <Text className='result-label'>BMI值</Text>
            <Text className='result-value'>{result.bmi}</Text>
          </View>
          <View className='result-item'>
            <Text className='result-label'>健康等级</Text>
            <Text className='result-value'>{result.level}</Text>
          </View>
        </View>
      )}
    </View>
  )
}
