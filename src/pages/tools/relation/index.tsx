import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

const relationMap: Record<string, string> = {
  '父': '爸爸', '母': '妈妈', '兄': '哥哥', '弟': '弟弟', '姐': '姐姐', '妹': '妹妹',
  '子': '儿子', '女': '女儿', '夫': '丈夫', '妻': '妻子',
  '伯': '伯伯', '叔': '叔叔', '姑': '姑姑', '舅': '舅舅', '姨': '姨妈',
  
  '父父': '爷爷', '父母': '奶奶', '母父': '外公', '母母': '外婆',
  '父兄': '伯伯', '父弟': '叔叔', '父姐': '姑姑', '父妹': '姑姑',
  '母兄': '舅舅', '母弟': '舅舅', '母姐': '姨妈', '母妹': '姨妈',
  '兄妻': '嫂子', '弟妻': '弟妹', '姐夫': '姐夫', '妹夫': '妹夫',
  '兄子': '侄子', '兄女': '侄女', '弟子': '侄子', '弟女': '侄女',
  '姐子': '外甥', '姐女': '外甥女', '妹子': '外甥', '妹女': '外甥女',
  '子妻': '儿媳', '女婿': '女婿',
  '子子': '孙子', '子女': '孙女', '女子': '外孙', '女女': '外孙女',
  '妻父': '岳父', '妻母': '岳母', '夫父': '公公', '夫母': '婆婆',
  '伯妻': '伯母', '叔妻': '婶婶', '姑夫': '姑父', '舅妻': '舅妈', '姨夫': '姨父',
  '女夫': '女婿',
  
  '父父父': '曾祖父', '父父母': '曾祖母', '母父父': '外曾祖父', '母父母': '外曾祖母',
  '父兄子': '堂哥', '父兄女': '堂姐', '父弟子': '堂弟', '父弟女': '堂妹',
  '父姐子': '表哥', '父姐女': '表姐', '父妹子': '表弟', '父妹女': '表妹',
  '母兄子': '表哥', '母兄女': '表姐', '母弟子': '表弟', '母弟女': '表妹',
  '母姐子': '表哥', '母姐女': '表姐', '母妹子': '表弟', '母妹女': '表妹',
  '姨子': '表哥', '姨女': '表姐',
  '舅子': '表哥', '舅女': '表姐',
  '姑子': '表哥', '姑女': '表姐',
}

const relationLabelMap: Record<string, string> = {
  '爸爸的': '父', '妈妈的': '母', '哥哥的': '兄', '弟弟的': '弟',
  '姐姐的': '姐', '妹妹的': '妹', '儿子的': '子', '女儿的': '女',
  '丈夫的': '夫', '妻子的': '妻', '伯伯的': '伯', '叔叔的': '叔',
  '姑姑的': '姑', '舅舅的': '舅', '姨妈的': '姨',
}

const basicRelationsRow1 = ['爸爸的', '妈妈的', '哥哥的', '弟弟的', '姐姐的']
const basicRelationsRow2 = ['妹妹的', '儿子的', '女儿的', '丈夫的', '妻子的']
const extendedRelations = ['伯伯的', '叔叔的', '姑姑的', '舅舅的', '姨妈的']

export default function Relation() {
  const [chain, setChain] = useState<string[]>([])

  const addRelation = (label: string) => {
    setChain(prev => [...prev, label])
  }

  const removeRelation = (index: number) => {
    setChain(prev => prev.filter((_, i) => i !== index))
  }

  const reset = () => setChain([])

  const getResult = (): string | null => {
    const code = chain.map(c => relationLabelMap[c]).join('')
    return relationMap[code] || null
  }

  const result = getResult()

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>👨‍👩‍👧‍👦</Text>
          <Text className='tool-title'>亲戚称呼计算器</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='chain-display'>
          {chain.length > 0 ? (
            <View className='chain-items'>
              <Text className='chain-start'>我</Text>
              {chain.map((item, index) => (
                <View key={index} className='chain-item'>
                  <Text className='chain-arrow'>→</Text>
                  <View className='chain-label' onClick={() => removeRelation(index)}>
                    <Text>{item.replace('的', '')}</Text>
                    <Text className='chain-remove'>×</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className='chain-hint'>点击下方按钮选择关系</Text>
          )}
        </View>
        <View className='form-card'>
          <Text className='label'>选择关系</Text>
          <View className='op-row'>
            {basicRelationsRow1.map(opt => (
              <View key={opt} className='op-btn' onClick={() => addRelation(opt)}>
                <Text>{opt.replace('的', '')}</Text>
              </View>
            ))}
          </View>
          <View className='op-row'>
            {basicRelationsRow2.map(opt => (
              <View key={opt} className='op-btn' onClick={() => addRelation(opt)}>
                <Text>{opt.replace('的', '')}</Text>
              </View>
            ))}
          </View>
          <View className='op-row op-row-extended'>
            {extendedRelations.map(opt => (
              <View key={opt} className='op-btn op-btn-extended' onClick={() => addRelation(opt)}>
                <Text>{opt.replace('的', '')}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='btn-row'>
          <View className='calc-btn' style={{ flex: 1, marginRight: chain.length > 0 ? '12px' : '0' }} onClick={reset}>
            重置
          </View>
          {chain.length > 0 && (
            <View className='calc-btn' style={{ flex: 1, marginLeft: '12px' }} onClick={() => setChain(prev => prev.slice(0, -1))}>
              回退
            </View>
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
    </View>
  )
}

Relation.onShareAppMessage = function () {
  return {
    title: '亲戚称呼计算器 - 家长工具库',
    path: '/pages/tools/relation/index'
  }
}

Relation.onShareTimeline = function () {
  return {
    title: '亲戚称呼计算器 - 家长工具库',
    query: ''
  }
}
