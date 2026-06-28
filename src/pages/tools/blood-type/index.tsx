import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import './index.scss'

const bloodTypes = ['A', 'B', 'AB', 'O']

function getGenes(type: string): string[][] {
  switch (type) {
    case 'A': return [['A', 'A'], ['A', 'O']]
    case 'B': return [['B', 'B'], ['B', 'O']]
    case 'AB': return [['A', 'B']]
    case 'O': return [['O', 'O']]
    default: return []
  }
}

function getBloodTypeFromGenes(g1: string, g2: string): string {
  const hasA = g1 === 'A' || g2 === 'A'
  const hasB = g1 === 'B' || g2 === 'B'
  if (hasA && hasB) return 'AB'
  if (hasA) return 'A'
  if (hasB) return 'B'
  return 'O'
}

function getPossibleBloodTypes(father: string, mother: string): string[] {
  const fatherGenes = getGenes(father)
  const motherGenes = getGenes(mother)
  const results = new Set<string>()

  for (const fg of fatherGenes) {
    for (const mg of motherGenes) {
      for (const fGene of fg) {
        for (const mGene of mg) {
          const type = getBloodTypeFromGenes(fGene, mGene)
          results.add(type)
        }
      }
    }
  }

  return Array.from(results).sort()
}

export default function BloodType() {
  const [fatherType, setFatherType] = useState<string | null>(null)
  const [motherType, setMotherType] = useState<string | null>(null)

  const possibleTypes = fatherType && motherType 
    ? getPossibleBloodTypes(fatherType, motherType) 
    : null

  const impossibleTypes = possibleTypes 
    ? ['A', 'B', 'AB', 'O'].filter(t => !possibleTypes.includes(t)) 
    : null

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🩸</Text>
          <Text className='tool-title'>血型遗传规律</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>父亲血型</Text>
          <View className='op-row'>
            {bloodTypes.map(type => (
              <View
                key={type}
                className={`op-btn ${fatherType === type ? 'active' : ''}`}
                onClick={() => setFatherType(type)}
              >
                <Text>{type}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='form-card'>
          <Text className='label'>母亲血型</Text>
          <View className='op-row'>
            {bloodTypes.map(type => (
              <View
                key={type}
                className={`op-btn ${motherType === type ? 'active' : ''}`}
                onClick={() => setMotherType(type)}
              >
                <Text>{type}</Text>
              </View>
            ))}
          </View>
        </View>
        {possibleTypes && (
          <>
            <View className='result-card'>
              <View className='result-item'>
                <Text className='result-label'>✅ 孩子可能的血型</Text>
                <Text className='result-value'>{possibleTypes.join('、')}</Text>
              </View>
            </View>
            {impossibleTypes && impossibleTypes.length > 0 && (
              <View className='result-card'>
                <View className='result-item'>
                  <Text className='result-label'>❌ 孩子不可能的血型</Text>
                  <Text className='result-value'>{impossibleTypes.join('、')}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  )
}

BloodType.onShareAppMessage = function () {
  return {
    title: '血型遗传规律 - 家长工具库',
    path: '/pages/tools/blood-type/index'
  }
}

BloodType.onShareTimeline = function () {
  return {
    title: '血型遗传规律 - 家长工具库',
    query: ''
  }
}
