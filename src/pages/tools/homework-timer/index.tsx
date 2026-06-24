import { useEffect, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import './index.scss'

type Mode = {
  name: string
  focus: number
  rest: number
}

const modes: Mode[] = [
  { name: '低龄版', focus: 15, rest: 5 },
  { name: '标准版', focus: 25, rest: 5 },
  { name: '长专注', focus: 40, rest: 10 }
]

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default function HomeworkTimer() {
  const [modeIdx, setModeIdx] = useState(0)
  const [stage, setStage] = useState<'focus' | 'rest'>('focus')
  const [running, setRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(modes[0].focus * 60)

  const mode = modes[modeIdx]
  const stageText = stage === 'focus' ? '专注写作业' : '休息一下'

  const progress = useMemo(() => {
    const total = (stage === 'focus' ? mode.focus : mode.rest) * 60
    return Math.max(0, Math.min(100, Math.round(((total - secondsLeft) / total) * 100)))
  }, [mode.focus, mode.rest, secondsLeft, stage])

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) return prev - 1
        const nextStage = stage === 'focus' ? 'rest' : 'focus'
        setStage(nextStage)
        return (nextStage === 'focus' ? mode.focus : mode.rest) * 60
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [mode.focus, mode.rest, running, stage])

  const switchMode = (idx: number) => {
    setModeIdx(idx)
    setStage('focus')
    setRunning(false)
    setSecondsLeft(modes[idx].focus * 60)
  }

  const reset = () => {
    setRunning(false)
    setStage('focus')
    setSecondsLeft(mode.focus * 60)
  }

  const toggleStage = () => {
    const nextStage = stage === 'focus' ? 'rest' : 'focus'
    setStage(nextStage)
    setRunning(false)
    setSecondsLeft((nextStage === 'focus' ? mode.focus : mode.rest) * 60)
  }

  return (
    <View className='tool-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>⏳</Text>
          <Text className='tool-title'>作业番茄钟</Text>
        </View>
      </View>
      <View className='scroll-content'>
        <View className='form-card'>
          <Text className='label'>计时模式</Text>
          <View className='op-row'>
            {modes.map((item, i) => (
              <View key={item.name} className={`op-btn ${modeIdx === i ? 'active' : ''}`} onClick={() => switchMode(i)}>
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='timer-card'>
          <Text className='stage-text'>{stageText}</Text>
          <Text className='timer-text'>{formatTime(secondsLeft)}</Text>
          <View className='progress-track'>
            <View className='progress-bar' style={{ width: `${progress}%` }} />
          </View>
          <Text className='timer-tip'>{mode.focus}分钟学习 + {mode.rest}分钟休息</Text>
        </View>
        <View className='timer-actions'>
          <View className='action-btn primary' onClick={() => setRunning(!running)}>{running ? '暂停' : '开始'}</View>
          <View className='action-btn' onClick={toggleStage}>切换</View>
          <View className='action-btn' onClick={reset}>重置</View>
        </View>
      </View>
    </View>
  )
}
