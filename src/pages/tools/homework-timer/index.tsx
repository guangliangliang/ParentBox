import { useEffect, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import './index.scss'

type Mode = {
  name: string
  focus: number
  rest: number
  cycles: number
  desc: string
}

const modes: Mode[] = [
  { name: '低龄作业', focus: 15, rest: 5, cycles: 3, desc: '适合低年级，短时间多轮次' },
  { name: '标准番茄', focus: 25, rest: 5, cycles: 4, desc: '适合日常作业和复习' },
  { name: '冲刺学习', focus: 40, rest: 10, cycles: 2, desc: '适合大块阅读或刷题' }
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
  const [completed, setCompleted] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notice, setNotice] = useState<{ title: string; desc: string } | null>(null)

  const mode = modes[modeIdx]
  const stageText = stage === 'focus' ? '专注写作业' : '休息一下'
  const currentCycle = Math.min(completed + 1, mode.cycles)

  const progress = useMemo(() => {
    const total = (stage === 'focus' ? mode.focus : mode.rest) * 60
    return Math.max(0, Math.min(100, Math.round(((total - secondsLeft) / total) * 100)))
  }, [mode.focus, mode.rest, secondsLeft, stage])

  const playAlert = () => {
    if (!soundEnabled) return
    const audio = Taro.createInnerAudioContext()
    audio.src = '/assets/timer-alert.mp3'
    audio.onEnded(() => audio.destroy())
    audio.onError(() => audio.destroy())
    audio.play()
  }

  const showNotice = (title: string, desc: string) => {
    playAlert()
    setNotice({ title, desc })
  }

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) return prev - 1

        if (stage === 'focus') {
          Taro.vibrateShort({ type: 'heavy' })
          showNotice('该休息了', '离开座位活动一下，喝口水，放松眼睛')
          setStage('rest')
          return mode.rest * 60
        }

        const nextCompleted = completed + 1
        setCompleted(nextCompleted)

        if (nextCompleted >= mode.cycles) {
          Taro.vibrateLong()
          showNotice('今天这组完成了', '可以休息一会儿，或者重新开始下一组')
          setRunning(false)
          setStage('focus')
          return mode.focus * 60
        }

        Taro.vibrateShort({ type: 'heavy' })
        showNotice('开始下一轮', '收心准备，继续完成下一轮作业')
        setStage('focus')
        return mode.focus * 60
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [completed, mode.cycles, mode.focus, mode.rest, running, stage, soundEnabled])

  const switchMode = (idx: number) => {
    setModeIdx(idx)
    setStage('focus')
    setRunning(false)
    setCompleted(0)
    setNotice(null)
    setSecondsLeft(modes[idx].focus * 60)
  }

  const reset = () => {
    setRunning(false)
    setStage('focus')
    setCompleted(0)
    setNotice(null)
    setSecondsLeft(mode.focus * 60)
  }

  const finishFocus = () => {
    if (stage === 'rest') return
    Taro.vibrateShort({ type: 'heavy' })
    showNotice('进入休息', '本轮已完成，休息后再继续')
    setRunning(false)
    setStage('rest')
    setSecondsLeft(mode.rest * 60)
  }

  const skipRest = () => {
    if (stage === 'focus') return
    const nextCompleted = completed + 1
    setCompleted(nextCompleted)
    setRunning(false)
    setStage('focus')
    setSecondsLeft(mode.focus * 60)
    if (nextCompleted >= mode.cycles) {
      Taro.vibrateLong()
      showNotice('今天这组完成了', '可以休息一会儿，或者重新开始下一组')
    } else {
      showNotice('休息已跳过', '准备开始下一轮作业')
    }
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
          <Text className='label'>学习方案</Text>
          <View className='mode-list'>
            {modes.map((item, i) => (
              <View key={item.name} className={`mode-card ${modeIdx === i ? 'active' : ''}`} onClick={() => switchMode(i)}>
                <Text className='mode-name'>{item.name}</Text>
                <Text className='mode-time'>{item.focus}分钟学习 / {item.rest}分钟休息 / {item.cycles}轮</Text>
                <Text className='mode-desc'>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className='timer-card'>
          <Text className='stage-text'>{stageText}</Text>
          <Text className='cycle-text'>第 {currentCycle} / {mode.cycles} 轮</Text>
          <Text className='timer-text'>{formatTime(secondsLeft)}</Text>
          <View className='progress-track'>
            <View className='progress-bar' style={{ width: `${progress}%` }} />
          </View>
          <Text className='timer-tip'>已完成 {completed} 轮</Text>
        </View>
        <View className='sound-row' onClick={() => setSoundEnabled(!soundEnabled)}>
          <Text className='sound-label'>提示音</Text>
          <Text className={`sound-switch ${soundEnabled ? 'active' : ''}`}>{soundEnabled ? '已开启' : '已关闭'}</Text>
        </View>
        <View className='timer-actions'>
          <View className='action-btn primary' onClick={() => setRunning(!running)}>{running ? '暂停' : '开始'}</View>
          <View className='action-btn' onClick={stage === 'focus' ? finishFocus : skipRest}>{stage === 'focus' ? '完成本轮' : '跳过休息'}</View>
          <View className='action-btn' onClick={reset}>重置</View>
        </View>
      </View>
      {notice && (
        <View className='notice-mask'>
          <View className='notice-card'>
            <Text className='notice-title'>{notice.title}</Text>
            <Text className='notice-desc'>{notice.desc}</Text>
            <View className='notice-btn' onClick={() => setNotice(null)}>知道了</View>
          </View>
        </View>
      )}
    </View>
  )
}

HomeworkTimer.onShareAppMessage = function () {
  return {
    title: '作业番茄钟 - 家长工具库',
    path: '/pages/tools/homework-timer/index'
  }
}

HomeworkTimer.onShareTimeline = function () {
  return {
    title: '作业番茄钟 - 家长工具库',
    query: ''
  }
}
