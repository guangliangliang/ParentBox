import ScenarioChecklistTool from '@/components/ScenarioChecklistTool'
import { documentChecklistScenarios } from '@/data/prep-checklists'

export default function DocumentList() {
  return (
    <ScenarioChecklistTool
      icon='📄'
      title='证件材料清单'
      storageKey='documentChecklistState'
      scenarios={documentChecklistScenarios}
      notice='证件材料以当地学校、医院、社区或办事机构通知为准。'
    />
  )
}

DocumentList.onShareAppMessage = function () {
  return {
    title: '证件材料清单 - 家长工具库',
    path: '/pages/tools/document-list/index'
  }
}

DocumentList.onShareTimeline = function () {
  return {
    title: '证件材料清单 - 家长工具库',
    query: ''
  }
}
