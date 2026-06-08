export const profile = {
  name: { zh: '余彬', en: 'Willy Yu' },
  title: 'Full Stack Engineer',
  roles: ['Full Stack Engineer', 'AI Integration Expert', '5+ Years @ Merck'],
  summary: '默克中国全栈工程师 · UCD 硕士 · CISSP 认证',
  contact: {
    phone: '15901816166',
    email: '361887648@qq.com',
    location: '上海',
  },
}

export const floatingTags = [
  'Java', 'Python', 'Vue.js', 'React', 'SpringBoot',
  'FastAPI', 'Dify', 'Claude', 'GraphQL', 'Node.js',
  'PostgreSQL', 'Redis', 'Neo4j', 'SAP',
]

export const skills = [
  {
    icon: '🖥',
    label: '后端',
    tags: ['Java', 'SpringBoot', 'Undertow', 'Python', 'FastAPI'],
    color: 'cyan',
  },
  {
    icon: '🎨',
    label: '前端',
    tags: ['Vue.js', 'Nuxt.js', 'React', 'Vuetify'],
    color: 'cyan',
  },
  {
    icon: '🔀',
    label: '中间件',
    tags: ['GraphQL', 'Node.js', 'WebSocket', 'Spring Security', 'Mybatis'],
    color: 'cyan',
  },
  {
    icon: '🗄',
    label: '数据库',
    tags: ['MySQL', 'PostgreSQL', 'Redis', 'Neo4j', 'MongoDB', 'Kingbase', 'SqlServer'],
    color: 'cyan',
  },
  {
    icon: '🤖',
    label: 'AI / LLM',
    tags: ['Dify', 'Qdrant', 'OpenClaw', 'ChatGPT', 'Claude', 'RAG'],
    color: 'purple',
    glow: true,
  },
  {
    icon: '🔧',
    label: '集成平台',
    tags: ['SAP', 'SFDC', 'Palantir Foundry'],
    color: 'cyan',
  },
]

export const experiences = [
  {
    company: '默克（中国）投资有限公司',
    role: '全栈开发工程师',
    period: '2020.3 — 至今',
    current: true,
    projects: [
      {
        name: 'AI Agent for Customer Order to Contract',
        period: '2025.12 — 至今',
        tags: ['AI', 'Dify', 'Python', 'Java', 'React'],
        tagColor: 'purple',
        goal: '多格式 PDF 订单自动转换为指定 Excel 格式并处理 SAP 流程',
        achievements: [
          'Dify AI workflow 成功转换 8 种格式 PDF，动态识别 PDF 结构',
          '扩展至 20 种 Excel 模板，不影响原有格式与公式',
          'Vibe Coding React 前端，跨平台多租户架构',
        ],
      },
      {
        name: 'CTS Media Management',
        period: '2024.1 — 2025.12',
        tags: ['Java', 'Vue', 'Python', 'SpringBoot'],
        tagColor: 'cyan',
        goal: '实验室实验自动化管理与预测平台',
        achievements: [
          '实验员每日日程 SOP 自动化，累计调用 5000+ 次',
          '实现未预约实验预测 + 每日累计计数/插值预测',
          '精细实验细节汇总报告及全量邮件通知',
        ],
      },
      {
        name: 'Media Assist Platform (MAP)',
        period: '2021.10 — 2023.12',
        tags: ['SpringBoot', 'Vue', 'Nuxt', 'SAP', 'SFDC', 'Palantir'],
        tagColor: 'cyan',
        goal: '大规模 GMP 合规项目管理平台',
        achievements: [
          '多项目阶段状态实时追踪与通知，对接 SAP / SFDC / Palantir Foundry',
          'Schedule Job + WebSocket 实现项目状态更新',
          '自定义线程池 @Async 异步邮件，提升系统响应性能',
        ],
      },
      {
        name: 'Coronavirus Analytics Platform (CAP)',
        period: '2020.7 — 2021.10',
        tags: ['SpringBoot', 'Vue', 'Genomics'],
        tagColor: 'cyan',
        goal: '新冠序列数据分析网站，Genomics / Proteomics / Vaccine Design',
        achievements: [
          '改造开源 JS 库 igv.js / blaster.js，修复关键算法',
          'MySQL 全文索引优化，查询时间从 1 分钟降至 10 秒',
          'Spring Security 双 Token 自动续签机制',
        ],
      },
      {
        name: 'Multiplex Protein',
        period: '2020.3 — 2020.9',
        tags: ['GraphQL', 'Node.js', 'Vue', 'Java'],
        tagColor: 'cyan',
        goal: '蛋白质结构分析平台（三层架构）',
        achievements: [
          'GraphQL + Express.js 中间层，API 转发 + 权限校验',
          'MySQL 8.0 JSON 字段 + Mybatis type-handler 存储动态关系数据',
        ],
      },
    ],
  },
  {
    company: 'University College Dublin (UCD)',
    role: 'Java Developer',
    period: '2018.10 — 2019.12',
    current: false,
    projects: [
      {
        name: 'ASGARD - 数字取证分析系统',
        period: '2018.10 — 2019.12',
        tags: ['Java', 'Python', 'Prolog', 'Digital Forensics'],
        tagColor: 'cyan',
        goal: 'EU Horizon 2020 项目，在 Autopsy 工具中实现 ASGARD 证据提取插件',
        achievements: [
          '阅读 Autopsy Java 源码，实现与 ASGARD 系统的数据对接',
          '修复开源库 Jline 的 backspace 处理 Bug',
          '集成 Digital Forensic Prolog + Jython 多语言支持',
        ],
      },
    ],
  },
]

export const education = [
  {
    school: 'University College Dublin',
    flag: '🇮🇪',
    degree: 'MSc Computer Science',
    major: 'Digital Investigation & Forensic Computing',
    period: '2018.9 — 2019.11',
    location: 'Dublin, Ireland',
    gpa: 3.76,
    gpaMax: 4.0,
    rank: 'Top 5%',
    note: '获得奖学金和工作室实习',
    courses: ['Application Forensics A', 'Information Security A-', 'Corporate Investigations A-'],
  },
  {
    school: '江西财经大学',
    flag: '🇨🇳',
    degree: '工学学士',
    major: '软件工程',
    period: '2014.9 — 2018.6',
    location: '江西，南昌',
    gpa: 3.5,
    gpaMax: 4.0,
    rank: 'Top 10%',
    courses: ['Java 94', 'C++ 92', '数据库 96', 'Web 90', 'Android 87', 'Hadoop 82'],
  },
]

export const certifications = [
  { icon: '🛡', label: 'CISSP · Certified Information Systems Security Professional', year: '2025', color: 'cyan' },
  { icon: '🛡', label: 'CISP · 注册信息安全专业人员', year: '2024', color: 'cyan' },
  { icon: '🌍', label: '雅思 IELTS 6.5 / CET-6', year: '2017', color: 'blue' },
  { icon: '🏆', label: 'IBM 中级讲师', year: '2017', color: 'gold' },
  { icon: '🎓', label: 'JAVA 奖学金 B 类 · 全国八届高校计算机赛', year: '2017', color: 'green' },
  { icon: '🏅', label: '广西计算机技能大赛省级优秀奖', year: '2016', color: 'orange' },
  { icon: '⭐', label: '三好学生 · 优秀干事 · 积极分子', year: '2015–2017', color: 'gray' },
]

export const navItems = [
  { id: 'hero', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
]
