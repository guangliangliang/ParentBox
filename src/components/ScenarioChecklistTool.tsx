import { useMemo, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import type { ChecklistScenario } from '@/data/prep-checklists'
import './ScenarioChecklistTool.scss'

type ChecklistState = {
  checked: Record<string, boolean>
  customItems: Record<string, string[]>
}

type Props = {
  icon: string
  title: string
  storageKey: string
  scenarios: ChecklistScenario[]
  notice: string
}

const readState = (storageKey: string): ChecklistState => {
  try {
    return Taro.getStorageSync(storageKey) || { checked: {}, customItems: {} }
  } catch {
    return { checked: {}, customItems: {} }
  }
}

export default function ScenarioChecklistTool({ icon, title, storageKey, scenarios, notice }: Props) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id || '')
  const [draft, setDraft] = useState('')
  const [state, setState] = useState<ChecklistState>(() => readState(storageKey))

  const activeScenario = useMemo(() => {
    return scenarios.find(item => item.id === activeId) || scenarios[0]
  }, [activeId, scenarios])

  const customItems = state.customItems[activeId] || []

  const saveState = (next: ChecklistState) => {
    setState(next)
    Taro.setStorageSync(storageKey, next)
  }

  const itemKey = (groupIndex: number, itemIndex: number) => {
    return `${activeId}:default:${groupIndex}:${itemIndex}`
  }

  const customKey = (itemIndex: number) => {
    return `${activeId}:custom:${itemIndex}`
  }

  const toggle = (key: string) => {
    saveState({
      ...state,
      checked: {
        ...state.checked,
        [key]: !state.checked[key]
      }
    })
  }

  const addCustomItem = () => {
    const text = draft.trim()
    if (!text) {
      Taro.showToast({ title: '先输入项目', icon: 'none' })
      return
    }

    saveState({
      ...state,
      customItems: {
        ...state.customItems,
        [activeId]: [...customItems, text]
      }
    })
    setDraft('')
  }

  const removeCustomItem = (index: number) => {
    const nextItems = customItems.filter((_, itemIndex) => itemIndex !== index)
    const nextChecked = Object.keys(state.checked).reduce<Record<string, boolean>>((resultMap, key) => {
      if (!key.startsWith(`${activeId}:custom:`)) resultMap[key] = state.checked[key]
      return resultMap
    }, {})

    nextItems.forEach((_, nextIndex) => {
      const previousIndex = nextIndex >= index ? nextIndex + 1 : nextIndex
      const previousKey = customKey(previousIndex)
      if (state.checked[previousKey]) nextChecked[customKey(nextIndex)] = true
    })

    saveState({
      checked: nextChecked,
      customItems: {
        ...state.customItems,
        [activeId]: nextItems
      }
    })
  }

  const resetCurrentScenario = () => {
    Taro.showModal({
      title: '重置清单',
      content: '会清空当前场景的勾选状态和自定义项目',
      confirmText: '重置',
      success: result => {
        if (!result.confirm) return

        const nextChecked = Object.keys(state.checked).reduce<Record<string, boolean>>((resultMap, key) => {
          if (!key.startsWith(`${activeId}:`)) resultMap[key] = state.checked[key]
          return resultMap
        }, {})
        const nextCustomItems = { ...state.customItems }
        delete nextCustomItems[activeId]

        saveState({ checked: nextChecked, customItems: nextCustomItems })
      }
    })
  }

  const copyChecklist = () => {
    const lines: string[] = [`${title} - ${activeScenario.name}`]

    activeScenario.groups.forEach((group, groupIndex) => {
      lines.push('', `【${group.title}】`)
      group.items.forEach((item, itemIndex) => {
        const checked = state.checked[itemKey(groupIndex, itemIndex)]
        lines.push(`${checked ? '已备' : '待备'} ${item}`)
      })
    })

    if (customItems.length) {
      lines.push('', '【自定义项目】')
      customItems.forEach((item, itemIndex) => {
        const checked = state.checked[customKey(itemIndex)]
        lines.push(`${checked ? '已备' : '待备'} ${item}`)
      })
    }

    Taro.setClipboardData({
      data: lines.join('\n'),
      success: () => Taro.showToast({ title: '已复制', icon: 'success' })
    })
  }

  return (
    <View className='tool-page scenario-checklist-page'>
      <NavBar />
      <View className='fixed-header'>
        <View className='tool-header'>
          <Text className='tool-icon'>{icon}</Text>
          <Text className='tool-title'>{title}</Text>
        </View>
      </View>

      <View className='scroll-content'>
        <View className='scenario-tabs'>
          {scenarios.map(item => (
            <Text
              key={item.id}
              className={activeId === item.id ? 'scenario-tab active' : 'scenario-tab'}
              onClick={() => setActiveId(item.id)}
            >{item.name}</Text>
          ))}
        </View>

        {activeScenario.groups.map((group, groupIndex) => (
          <View key={group.title} className='checklist-card'>
            <Text className='card-title'>{group.title}</Text>
            {group.items.map((item, itemIndex) => {
              const key = itemKey(groupIndex, itemIndex)
              const active = state.checked[key]
              return (
                <View key={key} className='checklist-row' onClick={() => toggle(key)}>
                  <View className={active ? 'checkbox checked' : 'checkbox'} />
                  <Text className={active ? 'item-text checked' : 'item-text'}>{item}</Text>
                </View>
              )
            })}
          </View>
        ))}

        <View className='checklist-card'>
          <Text className='card-title'>自定义项目</Text>
          {customItems.length === 0 ? (
            <Text className='empty-text'>可以补充本地要求或班级通知里的项目</Text>
          ) : (
            customItems.map((item, itemIndex) => {
              const key = customKey(itemIndex)
              const active = state.checked[key]
              return (
                <View key={key} className='custom-row'>
                  <View className='custom-check' onClick={() => toggle(key)}>
                    <View className={active ? 'checkbox checked' : 'checkbox'} />
                    <Text className={active ? 'item-text checked' : 'item-text'}>{item}</Text>
                  </View>
                  <Text className='delete-btn' onClick={() => removeCustomItem(itemIndex)}>删除</Text>
                </View>
              )
            })
          )}

          <View className='add-row'>
            <Input
              className='custom-input'
              placeholder='添加自定义项目'
              value={draft}
              onInput={event => setDraft(event.detail.value)}
            />
            <Text className='add-btn' onClick={addCustomItem}>添加</Text>
          </View>
        </View>

        <View className='action-row'>
          <Text className='secondary-btn' onClick={resetCurrentScenario}>重置</Text>
          <Text className='primary-btn' onClick={copyChecklist}>复制清单</Text>
        </View>

        <Text className='notice-text'>{notice}</Text>
      </View>
    </View>
  )
}
