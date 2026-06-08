import { SectionReveal, RevealItem } from '../shared/SectionReveal'
import SkillCard from './SkillCard'
import { skills } from '../../data/cv'

export default function SkillSection() {
  return (
    <div className="container">
      <SectionReveal>
        <RevealItem>
          <h2 className="section-title">
            技术栈 <span className="gradient">Tech Stack</span>
          </h2>
          <p className="section-subtitle">5 年全栈经验，覆盖后端 · 前端 · AI 集成 · 多种数据库</p>
        </RevealItem>

        <RevealItem>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
            }}
            className="skills-grid"
          >
            {skills.map((skill) => (
              <SkillCard key={skill.label} {...skill} />
            ))}
          </div>
        </RevealItem>
      </SectionReveal>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
