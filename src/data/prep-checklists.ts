export type ChecklistGroup = {
  title: string
  items: string[]
}

export type ChecklistScenario = {
  id: string
  name: string
  groups: ChecklistGroup[]
}

export const documentChecklistScenarios: ChecklistScenario[] = [
  {
    id: 'kindergarten',
    name: '入园报名',
    groups: [
      { title: '身份证明', items: ['户口本原件及复印件', '孩子出生证明', '父母身份证原件及复印件'] },
      { title: '健康资料', items: ['预防接种证', '儿童保健手册', '入园体检报告'] },
      { title: '报名材料', items: ['报名表', '孩子近期证件照', '居住证明或房产相关材料'] }
    ]
  },
  {
    id: 'school',
    name: '小学入学',
    groups: [
      { title: '基础证件', items: ['户口本原件及复印件', '孩子出生证明', '父母身份证原件及复印件'] },
      { title: '入学材料', items: ['入学通知或报名回执', '预防接种查验证明', '孩子近期证件照'] },
      { title: '居住材料', items: ['房产证或购房合同', '租房合同或居住证', '水电燃气缴费凭证'] }
    ]
  },
  {
    id: 'medical',
    name: '就医住院',
    groups: [
      { title: '就医证件', items: ['医保卡或电子医保凭证', '孩子身份证或户口本', '监护人身份证'] },
      { title: '病情资料', items: ['既往病历', '检查报告', '正在服用的药品清单'] },
      { title: '住院备用', items: ['银行卡或现金', '换洗衣物', '洗漱用品'] }
    ]
  },
  {
    id: 'hukou',
    name: '宝宝上户口',
    groups: [
      { title: '新生儿资料', items: ['出生医学证明', '宝宝姓名确认信息', '父母结婚证'] },
      { title: '父母资料', items: ['父母双方身份证', '父母双方户口本', '落户方户口本首页及本人页'] },
      { title: '办理备用', items: ['申请表', '复印件若干份', '黑色签字笔'] }
    ]
  },
  {
    id: 'insurance',
    name: '医保办理',
    groups: [
      { title: '身份资料', items: ['孩子户口本', '监护人身份证', '孩子近期证件照'] },
      { title: '办理材料', items: ['参保登记表', '银行卡或缴费凭证', '出生证明'] },
      { title: '备用材料', items: ['居住证明', '社保卡照片回执', '复印件若干份'] }
    ]
  }
]

export const schoolPrepScenarios: ChecklistScenario[] = [
  {
    id: 'kindergarten',
    name: '幼儿园开学',
    groups: [
      { title: '生活用品', items: ['姓名贴', '水杯', '汗巾', '备用衣裤', '小毛巾'] },
      { title: '健康防护', items: ['口罩', '湿巾', '纸巾', '驱蚊用品', '常用药说明卡'] },
      { title: '入园准备', items: ['接送卡', '体检表', '预防接种证明', '午睡被褥', '室内鞋'] }
    ]
  },
  {
    id: 'primary',
    name: '小学开学',
    groups: [
      { title: '学习用品', items: ['书包', '笔袋', '铅笔', '橡皮', '直尺', '文件袋'] },
      { title: '生活用品', items: ['水杯', '纸巾', '雨衣', '运动鞋', '备用口罩'] },
      { title: '家长准备', items: ['课程表', '接送安排', '班级群备注', '作息调整计划', '姓名贴'] }
    ]
  },
  {
    id: 'middle',
    name: '初中开学',
    groups: [
      { title: '学习用品', items: ['书包', '中性笔', '笔记本', '文件夹', '便利贴', '计算器'] },
      { title: '生活用品', items: ['水杯', '纸巾', '校服', '运动鞋', '雨伞'] },
      { title: '资料事项', items: ['录取通知', '体检表', '证件照', '住宿用品清单', '缴费凭证'] }
    ]
  },
  {
    id: 'boarding',
    name: '住校准备',
    groups: [
      { title: '床上用品', items: ['被子', '床单', '枕头', '枕套', '床垫'] },
      { title: '洗漱用品', items: ['牙刷牙膏', '毛巾', '洗发水', '沐浴露', '脸盆'] },
      { title: '收纳备用', items: ['衣架', '收纳袋', '拖鞋', '小锁', '常用药品'] }
    ]
  }
]
