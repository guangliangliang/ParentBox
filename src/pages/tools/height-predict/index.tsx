import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

export default function HeightPredict() {
  const [fatherHeight, setFatherHeight] = useState('')
  const [motherHeight, setMotherHeight] = useState('')
  const [gender, setGender] = useState(0)
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const f = parseFloat(fatherHeight)
    const m = parseFloat(motherHeight)
    if (!f || !m) return
    if (gender === 0) {
      setResult(Math.round(((f + m + 13) / 2) * 10) / 10)
    } else {
      setResult(Math.round(((f + m - 13) / 2) * 10) / 10)
    }
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>📐</Text>
          <Text className='tool-title'>身高预测</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>性别</Text>
          <View className='gender-row'>
            <View className={`gender-btn ${gender === 0 ? 'active' : ''}`} onClick={() => setGender(0)}>
              <Text>男孩</Text>
            </View>
            <View className={`gender-btn ${gender === 1 ? 'active' : ''}`} onClick={() => setGender(1)}>
              <Text>女孩</Text>
            </View>
          </View>
          <Text className='label'>父亲身高 (cm)</Text>
          <Input className='input-field input-field-center h5-text-center' type='digit' placeholder='请输入父亲身高' placeholderClass='input-placeholder' value={fatherHeight} onInput={e => setFatherHeight(e.detail.value)} style={{ textAlign: 'center' }} />
          <Text className='label'>母亲身高 (cm)</Text>
          <Input className='input-field input-field-center h5-text-center' type='digit' placeholder='请输入母亲身高' placeholderClass='input-placeholder' value={motherHeight} onInput={e => setMotherHeight(e.detail.value)} style={{ textAlign: 'center' }} />
        </View>
        <View className='calc-btn' onClick={calculate}>预测身高</View>
        {result !== null && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>预计成年身高</Text>
              <Text className='result-value'>{result} cm</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
