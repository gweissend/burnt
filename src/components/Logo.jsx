'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export function Logo({ className }) {
  let transition = {
    duration: 0.5,
    ease: 'easeInOut',
  }

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <motion.svg
        variants={{ idle: {}, active: {} }}
        initial="idle"
        whileHover="active"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        className="overflow-visible"
        fill="currentColor"
      >
        {/* Outer flame */}
        <motion.path
          d="M17 2C17 2 21 8 21 13C21 15.5 19.5 17 18 17C19 14 18 11 16.5 9C15 11 14 14 15 17C13.5 17 12 15.5 12 13C12 8 16 2 17 2Z"
          variants={{
            idle: { scale: 1 },
            active: {
              scale: [1, 1.1, 1],
              transition: {
                ...transition,
                delay: 0,
              },
            },
          }}
        />
        
        {/* Left flame */}
        <motion.path
          d="M10 8C10 8 7 13 7 17C7 20 9 22 11 22C10 20 9.5 17 10 14C10.5 11 12 8 10 8Z"
          variants={{
            idle: { scale: 1 },
            active: {
              scale: [1, 1.08, 1],
              transition: {
                ...transition,
                delay: 0.15,
              },
            },
          }}
        />
        
        {/* Right flame */}
        <motion.path
          d="M24 8C24 8 27 13 27 17C27 20 25 22 23 22C24 20 24.5 17 24 14C23.5 11 22 8 24 8Z"
          variants={{
            idle: { scale: 1 },
            active: {
              scale: [1, 1.08, 1],
              transition: {
                ...transition,
                delay: 0.15,
              },
            },
          }}
        />
        
        {/* Center/bottom flame */}
        <motion.path
          d="M17 27C12 27 6 24 6 18C6 22 10 30 17 30C24 30 28 22 28 18C28 24 22 27 17 27Z"
          variants={{
            idle: { scale: 1 },
            active: {
              scale: [1, 1.05, 1],
              transition: {
                ...transition,
                delay: 0.2,
              },
            },
          }}
        />
      </motion.svg>
      
      {/* Text as HTML */}
      <span className="text-xl font-medium">Burnt</span>
    </div>
  )
}

export function Mark({ className }) {
  return (
    <svg viewBox="0 0 34 34" fill="currentColor" className={className}>
      {/* Outer flame */}
      <path d="M17 2C17 2 21 8 21 13C21 15.5 19.5 17 18 17C19 14 18 11 16.5 9C15 11 14 14 15 17C13.5 17 12 15.5 12 13C12 8 16 2 17 2Z" />
      
      {/* Left flame */}
      <path d="M10 8C10 8 7 13 7 17C7 20 9 22 11 22C10 20 9.5 17 10 14C10.5 11 12 8 10 8Z" />
      
      {/* Right flame */}
      <path d="M24 8C24 8 27 13 27 17C27 20 25 22 23 22C24 20 24.5 17 24 14C23.5 11 22 8 24 8Z" />
      
      {/* Center/bottom flame */}
      <path d="M17 27C12 27 6 24 6 18C6 22 10 30 17 30C24 30 28 22 28 18C28 24 22 27 17 27Z" />
    </svg>
  )
}