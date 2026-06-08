import { motion } from 'framer-motion'
import { floatingTags } from '../../data/cv'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

const tagColors = {
  Java: 'cyan', Python: 'cyan', 'Vue.js': 'cyan',
  React: 'cyan', SpringBoot: 'cyan', FastAPI: 'cyan',
  Dify: 'purple', Claude: 'purple', GraphQL: 'cyan',
  'Node.js': 'cyan', PostgreSQL: 'cyan', Redis: 'cyan',
  Neo4j: 'cyan', SAP: 'cyan',
}

export default function FloatingTags() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 200 }}>
      {floatingTags.map((tag, i) => {
        const duration = randomBetween(3, 6)
        const yAmt = randomBetween(8, 18)
        const delay = randomBetween(0, 2.5)
        const color = tagColors[tag] || 'cyan'

        return (
          <motion.span
            key={tag}
            className={`tag tag-${color}`}
            style={{
              position: 'absolute',
              top: `${(i % 7) * 14 + randomBetween(-3, 3)}%`,
              left: `${Math.floor(i / 7) * 45 + randomBetween(-5, 5)}%`,
              fontSize: '0.75rem',
            }}
            animate={{
              y: [0, -yAmt, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {tag}
          </motion.span>
        )
      })}
    </div>
  )
}
