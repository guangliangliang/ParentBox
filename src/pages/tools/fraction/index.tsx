import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a
}

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [0, 1]
  const g = gcd(n, d)
  const sn = n / g, sd = d / g
  return sd < 0 ? [-sn, -sd] : [sn, sd]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateFractionQ(op: string) {
  const d1 = randInt(2, 9), n1 = randInt(1, d1 - 1)
  const d2 = randInt(2, 9), n2 = randInt(1, d2 - 1)
  const question = `${n1}/${d1} ${op} ${n2}/${d2}`
  let rn: number, rd: number
  if (op === '+') {
    rn = n1 * d2 + n2 * d1; rd = d1 * d2
  } else {
    rn = n1 * d2 - n2 * d1; rd = d1 * d2
  }
  const [sn, sd] = simplify(rn, rd)
  return { question, answerN: sn, answerD: sd }
}

export default function Fraction() {
  const [op, setOp] = useState('+')
  const [questions, setQuestions] = useState<Array<{ question: string; answerN: number; answerD: number }>>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const generate = () => {
    const qs = Array.from({ length: 5 }, () => generateFractionQ(op))
    setQuestions(qs)
    setAnswers({})
  }

  const check = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  const isCorrect = (idx: number) => {
    const q = questions[idx]
    const a = answers[idx]
    if (!a) return null
    const parts = a.split('/').map(Number)
    if (parts.length === 1) {
      return parts[0] === q.answerN && q.answerD === 1
    }
    const [sn, sd] = simplify(parts[0], parts[1])
    return sn === q.answerN && sd === q.answerD
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='tool-header'>
        <Text className='tool-icon'>🔢</Text>
        <Text className='tool-title'>分数练习</Text>
      </View>
      <View className='form-card'>
        <Text className='label'>运算类型</Text>
        <View className='op-row'>
          <View className={`op-btn ${op === '+' ? 'active' : ''}`} onClick={() => setOp('+')}><Text>加法</Text></View>
          <View className={`op-btn ${op === '-' ? 'active' : ''}`} onClick={() => setOp('-')}><Text>减法</Text></View>
        </View>
      </View>
      <View className='calc-btn' onClick={generate}>生成题目</View>
      {questions.length > 0 && (
        <View className='questions-card'>
          {questions.map((q, i) => (
            <View key={i} className='question-row'>
              <Text className='question-text'>{q.question} =</Text>
              <Input
                className='question-input'
                placeholder='如 1/3'
                value={answers[i] || ''}
                onInput={e => check(i, e.detail.value)}
              />
              {answers[i] && (
                <Text className={`answer-status ${isCorrect(i) ? 'correct' : 'wrong'}`}>
                  {isCorrect(i) ? '✓' : '✗'}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
