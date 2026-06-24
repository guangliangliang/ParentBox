export type CategoryItem = {
  id: string
  name: string
}

export type ToolItem = {
  id: string
  name: string
  icon: string
  category: string
  keywords: string[]
}

let _pendingCategory: string | null = null
let _currentCategory: string = 'all'

export const setPendingCategory = (id: string) => { _pendingCategory = id }
export const getAndClearPendingCategory = () => {
  const result = _pendingCategory
  _pendingCategory = null
  return result
}

export const setCurrentCategory = (id: string) => { _currentCategory = id }
export const getCurrentCategory = () => { return _currentCategory }

export const categories: CategoryItem[] = [
  { id: 'pregnancy', name: '孕期' },
  { id: 'newborn', name: '新生儿' },
  { id: 'toddler', name: '幼儿' },
  { id: 'student', name: '小学生' },
  { id: 'family', name: '家庭' }
]

export const tools: ToolItem[] = [
  { id: 'due-date', name: '预产期计算', icon: '🤰', category: 'pregnancy', keywords: ['预产期', '孕产期', '生产'] },
  { id: 'pregnancy-week', name: '孕周计算', icon: '📅', category: 'pregnancy', keywords: ['孕周', '怀孕', '周数'] },
  { id: 'checkup-list', name: '产检时间表', icon: '🏥', category: 'pregnancy', keywords: ['产检', '检查', '孕检'] },
  { id: 'bag-list', name: '待产包清单', icon: '🎒', category: 'pregnancy', keywords: ['待产包', '生产准备', '住院'] },
  { id: 'vaccine', name: '疫苗时间表', icon: '💉', category: 'newborn', keywords: ['疫苗', '打针', '免疫'] },
  { id: 'vaccine-notes', name: '疫苗接种注意事项', icon: '📝', category: 'newborn', keywords: ['疫苗', '接种', '注意事项'] },
  { id: 'sleep-reference', name: '睡眠时长参考表', icon: '💤', category: 'newborn', keywords: ['睡眠', '作息', '睡觉'] },
  { id: 'food-guide', name: '宝宝辅食添加月龄表', icon: '🥣', category: 'newborn', keywords: ['辅食', '月龄', '添加'] },
  { id: 'milestone', name: '宝宝发育里程碑', icon: '🌱', category: 'newborn', keywords: ['发育', '里程碑', '月龄'] },
  { id: 'teeth', name: '长牙时间表', icon: '🦷', category: 'newborn', keywords: ['长牙', '出牙', '乳牙'] },
  { id: 'height-standard', name: '儿童身高标准', icon: '📏', category: 'newborn', keywords: ['身高', '标准', '身高表'] },
  { id: 'weight-standard', name: '儿童体重标准', icon: '⚖️', category: 'newborn', keywords: ['体重', '标准', '体重表'] },
  { id: 'height-predict', name: '身高预测', icon: '📐', category: 'toddler', keywords: ['身高', '预测', '遗传'] },
  { id: 'bmi', name: 'BMI计算', icon: '📊', category: 'toddler', keywords: ['BMI', '体质', '体重指数'] },
  { id: 'clothing-size', name: '衣服尺码参考', icon: '👕', category: 'toddler', keywords: ['衣服', '尺码', '身高'] },
  { id: 'oral-math', name: '口算生成器', icon: '🧮', category: 'student', keywords: ['口算', '练习', '数学', '算术'] },
  { id: 'multiplication', name: '乘法口诀练习', icon: '✖️', category: 'student', keywords: ['乘法', '口诀', '练习'] },
  { id: 'homework-timer', name: '作业番茄钟', icon: '⏳', category: 'student', keywords: ['作业', '番茄钟', '专注', '计时'] },
  { id: 'pinyin-table', name: '拼音声母韵母表', icon: '🔤', category: 'student', keywords: ['拼音', '声母', '韵母'] },
  { id: 'fraction', name: '分数练习', icon: '🔢', category: 'student', keywords: ['分数', '练习', '数学'] },
  { id: 'exam-countdown', name: '考试倒计时', icon: '⏰', category: 'student', keywords: ['考试', '倒计时', '日期'] },
  { id: 'holiday-countdown', name: '寒暑假倒计时', icon: '🏖️', category: 'student', keywords: ['暑假', '寒假', '假期', '倒计时'] },
  { id: 'relation', name: '亲戚称呼计算器', icon: '👨‍👩‍👧‍👦', category: 'family', keywords: ['亲戚', '称呼', '辈分'] },
  { id: 'emergency-list', name: '家庭应急清单', icon: '🧰', category: 'family', keywords: ['应急', '清单', '家庭'] },
  { id: 'emergency-phone', name: '紧急电话速查', icon: '☎️', category: 'family', keywords: ['紧急', '电话', '急救'] },
  { id: 'medicine-kit', name: '家庭药箱清单', icon: '💊', category: 'family', keywords: ['药箱', '药品', '清单'] },
  { id: 'travel-list', name: '外出旅行清单', icon: '🧳', category: 'family', keywords: ['旅行', '外出', '清单'] },
  { id: 'zodiac', name: '生肖查询', icon: '🐉', category: 'family', keywords: ['生肖', '属相', '年份'] },
  { id: 'constellation', name: '星座查询', icon: '⭐', category: 'family', keywords: ['星座', '生日', '占星'] }
]
