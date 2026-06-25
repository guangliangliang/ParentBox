import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import './index.scss'

type UnitType = 'length' | 'weight' | 'volume' | 'temperature' | 'time'

interface UnitInfo {
  name: string
  factor: number
}

const unitData: Record<UnitType, { base: string; units: Record<string, number> }> = {
  length: {
    base: '米',
    units: {
      '千米': 1000,
      '米': 1,
      '厘米': 0.01,
      '毫米': 0.001,
      '公里': 1000,
      '里': 500,
      '丈': 3.333,
      '尺': 0.333,
      '寸': 0.0333,
      '英尺': 0.3048,
      '英寸': 0.0254,
      '码': 0.9144
    }
  },
  weight: {
    base: '千克',
    units: {
      '吨': 1000,
      '千克': 1,
      '克': 0.001,
      '毫克': 0.000001,
      '公斤': 1,
      '斤': 0.5,
      '两': 0.05,
      '磅': 0.4536,
      '盎司': 0.02835
    }
  },
  volume: {
    base: '升',
    units: {
      '立方米': 1000,
      '升': 1,
      '毫升': 0.001,
      '公升': 1,
      '加仑(美)': 3.785,
      '加仑(英)': 4.546,
      '杯': 0.24
    }
  },
  temperature: {
    base: '摄氏度',
    units: {
      '摄氏度': 1,
      '华氏度': 1,
      '开尔文': 1
    }
  },
  time: {
    base: '秒',
    units: {
      '年': 31536000,
      '月': 2592000,
      '周': 604800,
      '天': 86400,
      '小时': 3600,
      '分钟': 60,
      '秒': 1,
      '毫秒': 0.001
    }
  }
}

const unitTypes: { id: UnitType; name: string }[] = [
  { id: 'length', name: '长度' },
  { id: 'weight', name: '重量' },
  { id: 'volume', name: '容积' },
  { id: 'temperature', name: '温度' },
  { id: 'time', name: '时间' }
]

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number
  if (from === '摄氏度') {
    celsius = value
  } else if (from === '华氏度') {
    celsius = (value - 32) * 5 / 9
  } else {
    celsius = value - 273.15
  }

  if (to === '摄氏度') {
    return celsius
  } else if (to === '华氏度') {
    return celsius * 9 / 5 + 32
  } else {
    return celsius + 273.15
  }
}

function convert(value: number, from: string, to: string, type: UnitType): number {
  if (type === 'temperature') {
    return convertTemperature(value, from, to)
  }
  const data = unitData[type]
  const baseValue = value * data.units[from]
  return baseValue / data.units[to]
}

export default function UnitConverter() {
  const [currentType, setCurrentType] = useState<UnitType>('length')
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')

  const currentUnits = unitData[currentType]
  const unitList = Object.keys(currentUnits.units)

  if (!fromUnit && unitList.length > 0) setFromUnit(unitList[0])
  if (!toUnit && unitList.length > 1) setToUnit(unitList[1])

  const result = inputValue && fromUnit && toUnit
    ? convert(parseFloat(inputValue), fromUnit, toUnit, currentType)
    : null

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🔄</Text>
          <Text className='tool-title'>单位换算器</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>单位类型</Text>
          <View className='op-row'>
            {unitTypes.map(type => (
              <View
                key={type.id}
                className={`op-btn ${currentType === type.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentType(type.id)
                  setFromUnit('')
                  setToUnit('')
                }}
              >
                <Text>{type.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='form-card'>
          <Text className='label'>输入数值</Text>
          <Input
            className='input-field input-field-center h5-text-center'
            type='digit'
            placeholder='请输入数值'
            placeholderClass='input-placeholder'
            value={inputValue}
            onInput={e => setInputValue(e.detail.value)}
            style={{ textAlign: 'center' }}
          />
        </View>
        <View className='form-card'>
          <Text className='label'>从</Text>
          <View className='op-row' style={{ flexWrap: 'wrap' }}>
            {unitList.map(unit => (
              <View
                key={unit}
                className={`op-btn ${fromUnit === unit ? 'active' : ''}`}
                onClick={() => setFromUnit(unit)}
              >
                <Text>{unit}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='form-card'>
          <Text className='label'>到</Text>
          <View className='op-row' style={{ flexWrap: 'wrap' }}>
            {unitList.map(unit => (
              <View
                key={unit}
                className={`op-btn ${toUnit === unit ? 'active' : ''}`}
                onClick={() => setToUnit(unit)}
              >
                <Text>{unit}</Text>
              </View>
            ))}
          </View>
        </View>
        {result !== null && !isNaN(result) && (
          <View className='result-card'>
            <View className='result-item'>
              <Text className='result-label'>换算结果</Text>
              <Text className='result-value'>{result.toFixed(6).replace(/\.?0+$/, '')}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
