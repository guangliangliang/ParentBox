type RelationMap = Record<string, string>
import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

const maleMap: RelationMap = {
  '父': '爸爸', '母': '妈妈', '兄': '哥哥', '弟': '弟弟', '姐': '姐姐', '妹': '妹妹',
  '子': '儿子', '女': '女儿', '夫': '丈夫', '妻': '妻子',
  '父父': '爷爷', '父母': '奶奶', '母父': '外公', '母母': '外婆',
  '父兄': '伯伯', '父弟': '叔叔', '父姐': '姑姑', '父妹': '姑姑',
  '母兄': '舅舅', '母弟': '舅舅', '母姐': '姨妈', '母妹': '姨妈',
  '兄妻': '嫂子', '弟妻': '弟妹', '姐夫': '姐夫', '妹夫': '妹夫',
  '兄子': '侄子', '兄女': '侄女', '弟子': '侄子', '弟女': '侄女',
  '姐子': '外甥', '姐女': '外甥女', '妹子': '外甥', '妹女': '外甥女',
  '子子': '孙子', '子女': '孙女', '女子': '外孙', '女女': '外孙女',
  '父兄子': '堂兄', '父兄女': '堂姐', '父弟子': '堂弟', '父弟女': '堂妹',
  '母兄子': '表兄', '母兄女': '表姐', '母弟子': '表弟', '母弟女': '表妹',
  '妻父': '岳父', '妻母': '岳母', '夫父': '公公', '夫母': '婆婆',
  '子妻': '儿媳', '女夫': '女婿',
  '父父父': '曾祖父', '父父母': '曾祖母', '母父父': '外曾祖父', '母父母': '外曾祖母',
  '伯妻': '伯母', '叔妻': '婶婶', '舅妻': '舅妈', '姑夫': '姑父', '姨夫': '姨父'
}

const femaleMap: RelationMap = {
  '父': '爸爸', '母': '妈妈', '兄': '哥哥', '弟': '弟弟', '姐': '姐姐', '妹': '妹妹',
  '子': '儿子', '女': '女儿', '夫': '丈夫', '妻': '妻子',
  '父父': '爷爷', '父母': '奶奶', '母父': '外公', '母母': '外婆',
  '父兄': '伯伯', '父弟': '叔叔', '父姐': '姑姑', '父妹': '姑姑',
  '母兄': '舅舅', '母弟': '舅舅', '母姐': '姨妈', '母妹': '姨妈',
  '兄妻': '嫂子', '弟妻': '弟妹', '姐夫': '姐夫', '妹夫': '妹夫',
  '兄子': '侄子', '兄女': '侄女', '弟子': '侄子', '弟女': '侄女',
  '姐子': '外甥', '姐女': '外甥女', '妹子': '外甥', '妹女': '外甥女',
  '子子': '孙子', '子女': '孙女', '女子': '外孙', '女女': '外孙女',
  '父兄子': '堂兄', '父兄女': '堂姐', '父弟子': '堂弟', '父弟女': '堂妹',
  '母兄子': '表兄', '母兄女': '表姐', '母弟子': '表弟', '母弟女': '表妹',
  '妻父': '岳父', '妻母': '岳母', '夫父': '公公', '夫母': '婆婆',
  '子妻': '儿媳', '女夫': '女婿',
  '父父父': '曾祖父', '父父母': '曾祖母', '母父父': '外曾祖父', '母父母': '外曾祖母',
  '伯妻': '伯母', '叔妻': '婶婶', '舅妻': '舅妈', '姑夫': '姑父', '姨夫': '姨父'
}

const relationLabelMap: Record<string, string> = {
  '爸爸的': '父', '妈妈的': '母', '哥哥的': '兄', '弟弟的': '弟',
  '姐姐的': '姐', '妹妹的': '妹', '儿子的': '子', '女儿的': '女',
  '丈夫的': '夫', '妻子的': '妻'
}

const steps = [
  { title: '选择关系', options: ['爸爸的', '妈妈的', '哥哥的', '弟弟的', '姐姐的', '妹妹的', '儿子的', '女儿的', '丈夫的', '妻子的'] }
]

export default function Relation() {
  const [chain, setChain] = useState<string[]>([])

  const addRelation = (label: string) => {
    setChain(prev => [...prev, label])
  }

  const reset = () => setChain([])

  const getResult = (): string | null => {
    const code = chain.map(c => relationLabelMap[c]).join('')
    return maleMap[code] || femaleMap[code] || null
  }

  const result = getResult()

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>👨‍👩‍👧‍👦</Text>
        <Text className='tool-title'>亲戚称呼计算器</Text>
      </View>
      <View className='chain-display'>
        {chain.length > 0 ? (
          <Text className='chain-text'>我→{chain.join('')}</Text>
        ) : (
          <Text className='chain-hint'>点击下方按钮选择关系</Text>
        )}
      </View>
      <View className='form-card'>
        <Text className='label'>选择关系链</Text>
        <View className='op-row'>
          {steps[0].options.map(opt => (
            <View key={opt} className='op-btn' onClick={() => addRelation(opt)}>
              <Text>{opt.replace('的', '')}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className='btn-row'>
        <View className='calc-btn' style={{ flex: 1, marginRight: '12px' }} onClick={reset}>重置</View>
        {chain.length > 0 && (
          <View className='calc-btn' style={{ flex: 1, marginLeft: '12px' }} onClick={() => setChain(prev => prev.slice(0, -1))}>回退</View>
        )}
      </View>
      {result && (
        <View className='result-card'>
          <View className='result-item'>
            <Text className='result-label'>称呼</Text>
            <Text className='result-value'>{result}</Text>
          </View>
        </View>
      )}
    </View>
  )
}
