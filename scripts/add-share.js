
const fs = require('fs')
const path = require('path')

const tools = [
  { id: 'due-date', name: '预产期计算' },
  { id: 'pregnancy-week', name: '孕周计算' },
  { id: 'checkup-list', name: '产检时间表' },
  { id: 'bag-list', name: '待产包清单' },
  { id: 'vaccine', name: '疫苗时间表' },
  { id: 'vaccine-notes', name: '疫苗接种注意事项' },
  { id: 'sleep-reference', name: '睡眠时长参考表' },
  { id: 'food-guide', name: '宝宝辅食添加月龄表' },
  { id: 'milestone', name: '宝宝发育里程碑' },
  { id: 'teeth', name: '长牙时间表' },
  { id: 'height-standard', name: '儿童身高标准' },
  { id: 'weight-standard', name: '儿童体重标准' },
  { id: 'baby-care-products', name: '婴儿洗护用品清单' },
  { id: 'bath-water-temp', name: '婴儿洗澡水温参考' },
  { id: 'height-predict', name: '身高预测' },
  { id: 'bmi', name: 'BMI计算' },
  { id: 'clothing-size', name: '衣服尺码参考' },
  { id: 'shoe-size', name: '儿童鞋码对照表' },
  { id: 'oral-math', name: '口算生成器' },
  { id: 'multiplication', name: '乘法口诀练习' },
  { id: 'homework-timer', name: '作业番茄钟' },
  { id: 'pinyin-table', name: '拼音声母韵母表' },
  { id: 'fraction', name: '分数练习' },
  { id: 'exam-countdown', name: '考试倒计时' },
  { id: 'holiday-countdown', name: '寒暑假倒计时' },
  { id: 'relation', name: '亲戚称呼计算器' },
  { id: 'emergency-list', name: '家庭应急清单' },
  { id: 'emergency-phone', name: '紧急电话速查' },
  { id: 'medicine-kit', name: '家庭药箱清单' },
  { id: 'travel-list', name: '外出旅行清单' },
  { id: 'document-list', name: '证件材料清单' },
  { id: 'school-prep', name: '开学准备清单' },
  { id: 'zodiac', name: '生肖查询' },
  { id: 'constellation', name: '星座查询' },
  { id: 'blood-type', name: '血型遗传规律' },
  { id: 'unit-converter', name: '单位换算器' },
  { id: 'age-calculator', name: '年龄/天数计算器' },
  { id: 'idiom', name: '成语词典' }
]

const toolsDir = path.join(__dirname, '../src/pages/tools')

function addShareToToolPage(toolId, toolName) {
  const filePath = path.join(toolsDir, toolId, 'index.tsx')
  if (!fs.existsSync(filePath)) {
    console.log('Skip: ' + toolId + ' (file not found)')
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  if (content.includes('.onShareAppMessage') || content.includes('.onShareTimeline')) {
    console.log('Exists: ' + toolId)
    return
  }

  const exportMatch = content.match(/export default function (\w+)/)
  if (!exportMatch) {
    console.log('Skip: ' + toolId + ' (no export function found)')
    return
  }

  const functionName = exportMatch[1]

  // Find the last closing brace
  const lines = content.split('\n')
  let braceCount = 0
  let lastBraceIndex = -1

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    for (let j = line.length - 1; j >= 0; j--) {
      if (line[j] === '}') {
        braceCount++
        if (braceCount === 1) {
          lastBraceIndex = i
          break
        }
      }
    }
    if (lastBraceIndex !== -1) break
  }

  if (lastBraceIndex === -1) {
    console.log('Skip: ' + toolId + ' (no closing brace found)')
    return
  }

  // Insert share code after the closing brace
  const shareCode = '\n' + functionName + '.onShareAppMessage = function () {\n' +
    '  return {\n' +
    "    title: '" + toolName + " - 家长工具库',\n" +
    "    path: '/pages/tools/" + toolId + "/index'\n" +
    '  }\n' +
    '}\n\n' +
    functionName + '.onShareTimeline = function () {\n' +
    '  return {\n' +
    "    title: '" + toolName + " - 家长工具库',\n" +
    "    query: ''\n" +
    '  }\n' +
    '}'

  lines.splice(lastBraceIndex + 1, 0, shareCode)
  content = lines.join('\n')

  fs.writeFileSync(filePath, content, 'utf8')
  console.log('Updated: ' + toolId + ' (' + toolName + ')')
}

console.log('Updating tool pages share functions...')

tools.forEach(function(tool) {
  addShareToToolPage(tool.id, tool.name)
})

console.log('Done!')

