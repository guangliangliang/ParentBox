import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateQuestion(op: string): { question: string; answer: number } {
  switch (op) {
    case '+': {
      const a = randInt(1, 99), b = randInt(1, 99)
      return { question: `${a} + ${b} =`, answer: a + b }
    }
    case '-': {
      const a = randInt(1, 99), b = randInt(1, a)
      return { question: `${a} - ${b} =`, answer: a - b }
    }
    case '×': {
      const a = randInt(1, 9), b = randInt(1, 9)
      return { question: `${a} × ${b} =`, answer: a * b }
    }
    case '÷': {
      const b = randInt(1, 9), ans = randInt(1, 9), a = b * ans
      return { question: `${a} ÷ ${b} =`, answer: ans }
    }
    default: return { question: '', answer: 0 }
  }
}

const ops = ['+', '-', '×', '÷']

export default function OralMath() {
  const [selectedOp, setSelectedOp] = useState('+')
  const [questions, setQuestions] = useState<Array<{ question: string; answer: number }>>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const generate = () => {
    const qs = Array.from({ length: 10 }, () => generateQuestion(selectedOp))
    setQuestions(qs)
    setAnswers({})
  }

  const checkAnswer = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>🧮</Text>
          <Text className='tool-title'>口算生成器</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>运算类型</Text>
          <View className='op-row'>
            {ops.map(op => (
              <View key={op} className={`op-btn ${selectedOp === op ? 'active' : ''}`} onClick={() => setSelectedOp(op)}>
                <Text>{op}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='calc-btn' onClick={generate}>生成题目</View>
        {questions.length > 0 && (
          <View className='questions-card'>
            {questions.map((q, i) => (
              <View key={i} className='question-row'>
                <Text className='question-text'>{q.question}</Text>
                 <View className='input-wrapper'>
                   {!answers[i] && <Text className='placeholder-text'>?</Text>}
                    <Input
                      className='question-input input-field-center h5-text-center'
                      type='text'
                      placeholder=' '
                      placeholderClass='input-placeholder'
                      value={answers[i] || ''}
                      onInput={e => checkAnswer(i, e.detail.value)}
                      style={{ textAlign: 'center', verticalAlign: 'middle' }}
                    />
                 </View>
                {answers[i] && (
                  <Text className={`answer-status ${parseInt(answers[i]) === q.answer ? 'correct' : 'wrong'}`}>
                    {parseInt(answers[i]) === q.answer ? '✓' : '✗'}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
