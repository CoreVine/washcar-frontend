import React from "react"

export default function BackgroundBubbles() {
  return (
    <div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className='absolute rounded-full bg-blue-400/30'
          style={{
            width: `${Math.floor(Math.random() * 150 + 20)}px`,
            height: `${Math.floor(Math.random() * 150 + 20)}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.3
          }}
        />
      ))}
    </div>
  )
}
