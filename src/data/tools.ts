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

let _selectedCategory = 'all'

export const setSelectedCategory = (id: string) => { _selectedCategory = id }
export const getSelectedCategory = () => _selectedCategory

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
  { id: 'teeth', name: '长牙时间表', icon: '🦷', category: 'newborn', keywords: ['长牙', '出牙', '乳牙'] },
  { id: 'height-standard', name: '儿童身高标准', icon: '📏', category: 'newborn', keywords: ['身高', '标准', '身高表'] },
  { id: 'weight-standard', name: '儿童体重标准', icon: '⚖️', category: 'newborn', keywords: ['体重', '标准', '体重表'] },
  { id: 'height-predict', name: '身高预测', icon: '📐', category: 'toddler', keywords: ['身高', '预测', '遗传'] },
  { id: 'bmi', name: 'BMI计算', icon: '📊', category: 'toddler', keywords: ['BMI', '体质', '体重指数'] },
  { id: 'oral-math', name: '口算生成器', icon: '🧮', category: 'student', keywords: ['口算', '练习', '数学', '算术'] },
  { id: 'fraction', name: '分数练习', icon: '🔢', category: 'student', keywords: ['分数', '练习', '数学'] },
  { id: 'idiom', name: '成语接龙', icon: '📖', category: 'student', keywords: ['成语', '接龙', '语文'] },
  { id: 'exam-countdown', name: '考试倒计时', icon: '⏰', category: 'student', keywords: ['考试', '倒计时', '日期'] },
  { id: 'holiday-countdown', name: '寒暑假倒计时', icon: '🏖️', category: 'student', keywords: ['暑假', '寒假', '假期', '倒计时'] },
  { id: 'relation', name: '亲戚称呼计算器', icon: '👨‍👩‍👧‍👦', category: 'family', keywords: ['亲戚', '称呼', '辈分'] },
  { id: 'zodiac', name: '生肖查询', icon: '🐉', category: 'family', keywords: ['生肖', '属相', '年份'] },
  { id: 'constellation', name: '星座查询', icon: '⭐', category: 'family', keywords: ['星座', '生日', '占星'] }
]
