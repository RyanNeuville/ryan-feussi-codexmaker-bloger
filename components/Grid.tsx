import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Square {
  id: number
  x: number
  y: number
}

const GridBackground: React.FC = () => {
  const [squares, setSquares] = useState<Square[]>([])

  // Créer quelques carrés de manière aléatoire
  useEffect(() => {
    const initialSquares: Square[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 6),
    }))
    setSquares(initialSquares)

    const interval = setInterval(() => {
      setSquares((prev) =>
        prev.map((sq) => ({
          ...sq,
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 6),
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 grid h-full w-full grid-cols-10 grid-rows-6 gap-px bg-black">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="bg-neutral-900/80" />
      ))}

      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          className="absolute h-6 w-6 rounded bg-white/10"
          animate={{
            top: `${sq.y * 100}px`,
            left: `${sq.x * 100}px`,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default GridBackground
