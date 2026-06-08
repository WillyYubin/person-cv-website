# 个人简历网站 设计方案 v3

## 一、简历内容

**姓名：** 余彬 / Yu Bin
**定位：** 全栈开发工程师
**联系：** 15901816166 · 361887648@qq.com · 上海
**亮点：** 默克中国 5 年+ · UCD 硕士 GPA 3.76 Top 5% · CISP 认证 · AI Agent 实践

---

## 二、GitHub Pages 构建保障

### 2.1 部署架构（确保 push 即可用）

```
main 分支（源码）
  ├── src/           React + Vite 源码
  ├── public/
  │   └── .nojekyll  ← 关键：阻止 GitHub Pages 运行 Jekyll
  ├── vite.config.js ← base 设为 '/person-cv-website/'
  └── .github/workflows/deploy.yml

  git push main
       │
       ▼
  GitHub Actions
  ① npm ci
  ② npm run build  →  dist/
  ③ dist/ 复制 .nojekyll（peaceiris/actions-gh-pages 自动处理）
  ④ force push → gh-pages 分支
       │
       ▼
  GitHub Pages 托管 gh-pages 分支
  URL: https://<user>.github.io/person-cv-website/
```

### 2.2 完整 GitHub Actions 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy CV to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          force_orphan: true
```

### 2.3 关键配置文件

**vite.config.js**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/person-cv-website/',   // ← 必须匹配 GitHub 仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

**public/.nojekyll**（空文件，阻止 GitHub Pages 运行 Jekyll）
```
（空文件，无内容）
```

**public/404.html**（SPA 路由刷新不 404）
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    // GitHub Pages SPA 重定向 hack
    var l = window.location;
    l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '')
      + l.pathname.split('/').slice(0, 1 + 1).join('/') + '/?p=/'
      + l.pathname.slice(1).split('/').slice(1).join('/').replace(/&/g, '~and~')
      + (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '')
      + l.hash);
  </script>
</head>
</html>
```

**index.html**（根目录 Vite 模板，加对应 script 处理重定向）
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>余彬 - Full Stack Engineer</title>
  <!-- SPA redirect script -->
  <script>
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**package.json 关键字段**
```json
{
  "name": "person-cv-website",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.15.0",
    "lenis": "^1.1.14",
    "@tsparticles/react": "^3.0.0",
    "@tsparticles/slim": "^3.7.1",
    "react-intersection-observer": "^9.13.1",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  }
}
```

**Jekyll 配置（本地预览用，不影响构建）**

```yaml
# _config.yml
theme: jekyll-theme-primer
title: 余彬 - Full Stack Engineer CV
exclude:
  - src/
  - node_modules/
  - dist/
  - package.json
  - package-lock.json
  - vite.config.js
  - .github/
```

```ruby
# Gemfile
source "https://rubygems.org"
gem "jekyll", "~> 3.10.0"
gem "jekyll-theme-primer"
```

---

## 三、文件结构

```
person-cv-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── cv.js                  # 所有简历数据
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── TypeWriter.jsx
│   │   │   ├── FloatingTags.jsx
│   │   │   └── Particles.jsx
│   │   ├── Nav/
│   │   │   └── SideNav.jsx
│   │   ├── Skills/
│   │   │   ├── SkillSection.jsx
│   │   │   └── SkillCard.jsx
│   │   ├── Experience/
│   │   │   ├── Timeline.jsx
│   │   │   └── ProjectCard.jsx
│   │   ├── Education/
│   │   │   └── EduSection.jsx
│   │   ├── Certifications/
│   │   │   └── BadgeList.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   └── shared/
│   │       ├── SectionReveal.jsx  # 通用 scroll-reveal 包装组件
│   │       ├── MagneticButton.jsx # 磁性按钮
│   │       └── GlowCard.jsx       # 发光悬浮卡片
│   ├── hooks/
│   │   ├── useScrollSpy.js
│   │   ├── useTypewriter.js
│   │   └── useMagnet.js
│   └── styles/
│       ├── globals.css
│       ├── variables.css
│       └── animations.css
├── public/
│   ├── .nojekyll
│   ├── 404.html
│   └── resume.pdf
├── index.html
├── vite.config.js
├── package.json
├── _config.yml
└── Gemfile
```

---

## 四、视觉设计

### 4.1 配色方案

```css
:root {
  /* 背景层级 */
  --bg-base:       #050d1a;   /* 最深底色 */
  --bg-primary:    #0a1628;   /* 主背景 */
  --bg-card:       #0f2038;   /* 卡片背景 */
  --bg-card-hover: #132540;

  /* 强调色 */
  --cyan:          #00d4ff;   /* 主强调 - Cyan */
  --cyan-dim:      #00d4ff33; /* 半透明用于发光 */
  --purple:        #a855f7;   /* AI 相关 - Purple */
  --purple-dim:    #a855f733;
  --green:         #10b981;   /* 在职/成功 */

  /* 文字 */
  --text-primary:  #e2e8f0;
  --text-secondary:#7090b0;
  --text-muted:    #3a5068;

  /* 边框 & 效果 */
  --border:        #1a3050;
  --border-hover:  #00d4ff66;
  --glow-cyan:     0 0 30px #00d4ff40, 0 0 60px #00d4ff20;
  --glow-purple:   0 0 30px #a855f740, 0 0 60px #a855f720;

  /* 渐变 */
  --grad-hero:     linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #0d1f3c 100%);
  --grad-cyan:     linear-gradient(135deg, #00d4ff, #0099cc);
  --grad-text:     linear-gradient(90deg, #00d4ff, #a855f7);
}
```

### 4.2 字体

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?
  family=Inter:wght@300;400;500;700;900&
  family=Noto+Sans+SC:wght@300;400;500;700&
  family=JetBrains+Mono:wght@400;500&
  display=swap" rel="stylesheet">
```

---

## 五、动画系统（motionsites.ai 风格）

### 5.1 核心动画效果列表

参考 motionsites.ai 的 prompt 风格，使用以下效果：

#### A. Text Split Reveal（文字逐字/逐行揭示）

每个字符独立入场，错落有致：

```jsx
// SplitTextReveal.jsx
// 将文字拆成单字，用 framer-motion stagger 依次 y:20→0, opacity:0→1
const chars = text.split('').map((char, i) => (
  <motion.span
    key={i}
    variants={{
      hidden: { opacity: 0, y: 20, rotateX: -90 },
      visible: { opacity: 1, y: 0, rotateX: 0 }
    }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.03 }}
  >
    {char}
  </motion.span>
))
```

#### B. Magnetic Button（磁性吸附按钮）

鼠标靠近时按钮被吸引，移开时弹回：

```jsx
// useMagnet.js
// 监听 mousemove，计算鼠标与按钮中心距离
// 在一定半径内，按钮跟随鼠标偏移（弱化系数 0.3）
// 使用 framer-motion useSpring 实现弹性回弹
const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
const x = useSpring(0, springConfig)
const y = useSpring(0, springConfig)
// 离开时 x.set(0), y.set(0) → 弹回原位
```

#### C. Smooth Scroll（Lenis 平滑滚动）

```jsx
// App.jsx - Lenis 全局平滑滚动
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
  return () => lenis.destroy()
}, [])
```

#### D. Scroll Progress Bar（顶部阅读进度条）

```jsx
// 顶部 2px 高度的细线，随页面滚动从左到右扩展
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
<motion.div style={{ scaleX, transformOrigin: '0%' }}
  className="progress-bar" />  // position:fixed, top:0, height:2px, background: var(--grad-cyan)
```

#### E. Cursor Glow（鼠标跟随光晕）

```jsx
// 一个 radial-gradient 圆形光晕跟随鼠标
// 通过 CSS custom property --mouse-x/y 传递鼠标位置
// 使用 requestAnimationFrame 平滑追踪，不会造成卡顿
```

#### F. Stagger Reveal on Scroll（滚动触发错落入场）

```jsx
// SectionReveal.jsx - 通用包装组件
// 使用 react-intersection-observer 的 useInView
// 子元素依次从 y:40 + opacity:0 → y:0 + opacity:1
// delay 按 index 递增 0.1s
<motion.div
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
>
  {children}
</motion.div>
```

#### G. Glowing Card Hover（鼠标位置感知发光卡片）

```jsx
// GlowCard.jsx
// onMouseMove: 计算鼠标在卡片内的相对位置 (x%, y%)
// 通过 CSS custom property 设置 radial-gradient 跟随鼠标
// 产生"光源在鼠标处"的发光效果
// 卡片本身 scale(1.02) + 边框 var(--border-hover)
style={{
  '--mouse-x': `${mouseX}%`,
  '--mouse-y': `${mouseY}%`,
  background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y),
    var(--bg-card-hover) 0%, var(--bg-card) 60%)`
}}
```

#### H. Timeline Draw Animation（时间轴绘制动画）

```jsx
// 时间轴竖线：用 Framer Motion pathLength 0→1 动画（SVG）
// 或用 scaleY: 0→1 + transformOrigin: top
// 随滚动进度延伸，使用 useScroll + useTransform
const { scrollYProgress } = useScroll({ target: timelineRef })
const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
```

#### I. Floating Tech Tags（随机漂浮标签）

```jsx
// 每个标签独立的随机漂浮参数
// y: [0, -randomBetween(8,15), 0], rotate: [-1, 1, -1]
// duration: randomBetween(3, 6), delay: randomBetween(0, 2)
// repeat: Infinity, repeatType: "mirror"
```

#### J. Number Counter（数字滚动计数）

```jsx
// 进入视口时，数字从 0 动画到目标值
// 用 Framer Motion useMotionValue + useTransform
// 如：GPA 3.76 → 从 0.00 滚动到 3.76
```

### 5.2 动画时序规范

```
页面加载:
  0ms   → Hero 粒子背景渐显
  200ms → Hero 标题 Split Text Reveal
  600ms → Hero 副标题轮播启动
  900ms → Hero 按钮磁性按钮入场
  1100ms → 右侧终端卡片滑入
  1400ms → 浮动标签逐个漂浮启动

滚动触发（各 section 进入视口时）:
  → SectionReveal stagger（0.1s 间隔）
  → GlowCard 边框渐显
  → 进度条/计数器启动
```

---

## 六、各页面模块

### Section 1 — Hero（首屏）

```
┌───────────────────────────────────────────────────────┐
│ [粒子背景: 深色星空连线，低密度，颜色 #00d4ff 透明度低] │
│ [顶部 2px 进度条: cyan 渐变]                           │
│                                                       │
│  ┌──────────────────────┐  ┌─────────────────────┐   │
│  │                      │  │ ┌─────────────────┐ │   │
│  │  Hi, I'm             │  │ │$ whoami         │ │   │
│  │  余彬·Yu Bin  [打字机]│  │ │                 │ │   │
│  │  ──────────────────  │  │ │ Yu Bin          │ │   │
│  │                      │  │ │ Full Stack Eng. │ │   │
│  │  [文字轮播]           │  │ │ @ Merck China   │ │   │
│  │  Full Stack Engineer │  │ │ MSc UCD Ireland │ │   │
│  │  AI Integration      │  │ │ CISP Certified  │ │   │
│  │  5+ Yrs @ Merck      │  │ │ Shanghai, China │ │   │
│  │                      │  │ └─────────────────┘ │   │
│  │  默克中国·UCD硕士·   │  │                     │   │
│  │  CISP·5年+           │  │  Java   Python      │   │
│  │                      │  │  Vue    React       │   │
│  │  [查看项目▶] [⬇PDF]  │  │  Dify   Claude      │   │
│  │  ↑ MagneticButton    │  │  SpringBoot FastAPI │   │
│  │                      │  │  ↑ FloatingTags     │   │
│  │  📱 📧 📍            │  └─────────────────────┘   │
│  └──────────────────────┘                            │
│                                                      │
│              ↓  [弹跳箭头]  Scroll Down              │
└───────────────────────────────────────────────────────┘
```

**组件树：**
```
Hero
├── Particles (tsParticles slim)
├── ProgressBar (useScroll + scaleX)
├── HeroLeft
│   ├── SplitTextReveal ("余彬 / Yu Bin")
│   ├── RoleCarousel (framer AnimatePresence 轮播)
│   ├── SubTitle (stagger fade-in)
│   ├── MagneticButton × 2
│   └── ContactInfo (icon + text)
└── HeroRight
    ├── TerminalCard (slide-in from right)
    └── FloatingTags (随机漂浮)
```

---

### Section 2 — Skills（技能）

**6 个 GlowCard，2×3 Grid：**

| 图标 | 分类 | 技术 |
|------|------|------|
| 🖥 | 后端 | Java · SpringBoot · Undertow · Python · FastAPI |
| 🎨 | 前端 | Vue.js · Nuxt.js · React · Vuetify |
| 🔀 | 中间件 | GraphQL · Node.js · WebSocket · Spring Security |
| 🗄 | 数据库 | MySQL · PostgreSQL · Redis · Neo4j · MongoDB · Kingbase |
| 🤖 | AI / LLM | Dify · Qdrant · OpenClaw · ChatGPT · Claude · RAG |
| 🔧 | 集成平台 | SAP · SFDC · Palantir Foundry · Mybatis |

- GlowCard hover：鼠标位置感知发光
- 每个 Pill 入场：stagger 0.05s 依次 scale(0)→scale(1)
- AI 分类卡片：紫色系 + 边框 glow-purple 常亮闪烁

---

### Section 3 — Experience（工作经历）

**时间轴 + 可展开项目卡片：**

```
2020.3               默克（中国）投资有限公司
至今    ●────────────────────────────────────────
        │  全栈开发工程师  [在职 · 5年+]  ●绿色标签
        │
        ├── ▶ AI Agent: Order→Contract  [2025.12-]
        │      [AI][Dify][Python][Java][React]
        │      ↓ 展开（AnimatePresence）
        │      ┌─────────────────────────────────┐
        │      │ 目标：多格式PDF→标准Excel→SAP   │
        │      │ ✦ Dify workflow 转换8种PDF格式  │
        │      │ ✦ 动态识别，扩展至20种Excel模板 │
        │      │ ✦ 跨平台多租户，React前端       │
        │      └─────────────────────────────────┘
        │
        ├── ▶ CTS Media Management      [2024.1-2025.12]
        ├── ▶ Media Assist Platform     [2021.10-2023.12]
        ├── ▶ Coronavirus Analytics CAP [2020.7-2021.10]
        └── ▶ Multiplex Protein         [2020.3-2020.9]

2018.10 ●  University College Dublin
        └── ASGARD Project  [数字取证]
```

- 时间轴竖线：`scaleY: 0→1` 随滚动延伸
- 时间轴节点 `●`：进入视口时 pulse 发光动画
- 项目展开：`AnimatePresence` + `height: 0→auto`
- 展开内容：成就条目逐行 stagger 入场

---

### Section 4 — Education（教育背景）

```
┌──────────────────────────┐   ┌──────────────────────────┐
│ 🇮🇪 UCD Dublin           │   │ 🇨🇳 桂林理工大学          │
│──────────────────────────│   │──────────────────────────│
│ MSc Computer Science     │   │ 工学学士·计算机科学        │
│ Digital Investigation    │   │ 2014.9 — 2018.6          │
│ & Forensic Computing     │   │                          │
│ 2018.9 — 2019.11         │   │ GPA  3.5 / 4.0           │
│                          │   │ ████████████░░  Top 10%  │
│ GPA  3.76 / 4.0          │   │ ← 动画进度条             │
│ ████████████████░ Top5% │   │                          │
│ ← 动画进度条             │   │ Java 94 · C++ 92         │
│                          │   │ 数据库 96 · Web 90       │
│ 一年半提前毕业 ✦          │   └──────────────────────────┘
│ Dublin, Ireland          │
└──────────────────────────┘
```

- GPA 进度条：`whileInView` 触发 `width: 0→N%`，配合数字 Counter
- 卡片入场：左卡从左滑入，右卡从右滑入

---

### Section 5 — Certifications（资质证书）

水平滚动 Badge 列表（桌面换行 / 移动横滑）：

```
[🛡 CISP 2024]  [🌍 雅思 6.5]  [🏆 IBM讲师]  [🎓 JAVA奖金]  [🏅 省级优秀]  [⭐ 三好]
```

- 入场：stagger bounce（spring 弹性）
- Hover：`scale(1.05)` + `box-shadow: var(--glow-cyan)`

---

### Section 6 — Contact（联系方式）

```
      ─────────── Get In Touch ───────────

  [📱 15901816166]  [📧 361887648@qq.com]  [📍 上海]

           [ ⬇  下载 PDF 简历 ]
           ↑ MagneticButton + pulse 动画
```

---

## 七、src/data/cv.js 数据结构

```js
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

export const skills = [
  {
    icon: '🖥', label: '后端',
    tags: ['Java', 'SpringBoot', 'Undertow', 'Python', 'FastAPI'],
    color: 'cyan',
  },
  {
    icon: '🎨', label: '前端',
    tags: ['Vue.js', 'Nuxt.js', 'React', 'Vuetify'],
    color: 'cyan',
  },
  {
    icon: '🔀', label: '中间件',
    tags: ['GraphQL', 'Node.js', 'WebSocket', 'Spring Security', 'Mybatis'],
    color: 'cyan',
  },
  {
    icon: '🗄', label: '数据库',
    tags: ['MySQL', 'PostgreSQL', 'Redis', 'Neo4j', 'MongoDB', 'Kingbase', 'SqlServer'],
    color: 'cyan',
  },
  {
    icon: '🤖', label: 'AI / LLM',
    tags: ['Dify', 'Qdrant', 'OpenClaw', 'ChatGPT', 'Claude', 'RAG'],
    color: 'purple',
    glow: true,
  },
  {
    icon: '🔧', label: '集成平台',
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
    { icon: '🛡', label: '(CISSP) Certified Information Systems Security Professional', year: '2025', color: 'cyan' },
  { icon: '🛡', label: 'CISP 注册信息安全专业人员', year: '2024', color: 'cyan' },
  { icon: '🌍', label: '雅思 6.5 / CET-6', year: '2017', color: 'blue' },
  { icon: '🏆', label: 'IBM 中级讲师', year: '2017', color: 'gold' },
  { icon: '🎓', label: 'JAVA 奖学金 B 类 · 全国八届', year: '2017', color: 'green' },
  { icon: '🏅', label: '广西计算机技能大赛省级优秀', year: '2016', color: 'orange' },
  { icon: '⭐', label: '三好学生 · 优秀干事 · 积极分子', year: '2015-2017', color: 'gray' },
]
```

---

## 八、响应式断点

```css
/* 桌面：左侧 SideNav 固定 */
@media (min-width: 1280px) { ... }

/* 中屏：SideNav 收缩为图标条 */
@media (min-width: 1024px) and (max-width: 1279px) { ... }

/* 平板：顶部 Nav，Hero 单栏 */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* 手机：hamburger，全单列，技能卡片 1 列 */
@media (max-width: 767px) { ... }
```

---

## 九、开发里程碑

| # | 任务 | 关键文件 |
|---|------|----------|
| 1 | 项目初始化 + GitHub Actions 配置 | `package.json`, `vite.config.js`, `deploy.yml`, `.nojekyll`, `404.html` |
| 2 | CSS 变量 + 全局样式 + Lenis | `globals.css`, `App.jsx` |
| 3 | Hero 组件（粒子 + 打字机 + 磁性按钮 + 浮动标签） | `Hero/` |
| 4 | SideNav + ScrollSpy | `Nav/` |
| 5 | Skills GlowCard + stagger 入场 | `Skills/` |
| 6 | Experience 时间轴 + 项目展开 | `Experience/` |
| 7 | Education GPA 进度条 + Counter | `Education/` |
| 8 | Certifications Badge + Contact | `Certifications/`, `Contact/` |
| 9 | 响应式全面适配 | 所有组件 media queries |
| 10 | 性能优化 + 部署验证 | Lighthouse 90+ |
