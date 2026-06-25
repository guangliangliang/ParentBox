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
