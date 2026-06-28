import ScenarioChecklistTool from '@/components/ScenarioChecklistTool'
import { schoolPrepScenarios } from '@/data/prep-checklists'

export default function SchoolPrep() {
  return (
    <ScenarioChecklistTool
      icon='🎒'
      title='开学准备清单'
      storageKey='schoolPrepChecklistState'
      scenarios={schoolPrepScenarios}
      notice='开学物品以学校和班级通知为准。'
    />
  )
}

SchoolPrep.onShareAppMessage = function () {
  return {
    title: '开学准备清单 - 家长工具库',
    path: '/pages/tools/school-prep/index'
  }
}

SchoolPrep.onShareTimeline = function () {
  return {
    title: '开学准备清单 - 家长工具库',
    query: ''
  }
}
