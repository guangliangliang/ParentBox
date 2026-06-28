import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import './index.scss'

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeQuestion() {
  const a = randInt(1, 9)
  const b = randInt(1, 9)
  return { question: `${a} × ${b} =`, answer: a * b }
}

export default function Multiplication() {
  const [questions, setQuestions] = useState<Array<{ question: string; answer: number }>>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const generate = () => {
    setQuestions(Array.from({ length: 10 }, makeQuestion))
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
          <Text className='tool-icon'>✖️</Text>
          <Text className='tool-title'>乘法口诀练习</Text>
        </View>
      </View>
      <View className='scroll-content'>
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
                    type='number'
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

Multiplication.onShareAppMessage = function () {
  return {
    title: '乘法口诀练习 - 家长工具库',
    path: '/pages/tools/multiplication/index'
  }
}

Multiplication.onShareTimeline = function () {
  return {
    title: '乘法口诀练习 - 家长工具库',
    query: ''
  }
}
