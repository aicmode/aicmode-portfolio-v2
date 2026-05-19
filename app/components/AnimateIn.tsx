'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  blur?: boolean
  y?: number
  once?: boolean
}

export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  blur = true,
  y = 30,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.12 }}
      transition={{
        duration: 0.95,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
