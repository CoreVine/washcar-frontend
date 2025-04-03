import { useState, useEffect, useRef } from "react"

type CooldownTimerProps = {
  cooldown?: number
  onCooldownEnd?: () => void
}

const CooldownTimer: React.FC<CooldownTimerProps> = ({ cooldown = 60, onCooldownEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(cooldown)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeLeft === 0) {
      if (onCooldownEnd) onCooldownEnd()
      return
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timeLeft])

  const startCooldown = () => {
    if (timeLeft === 0) {
      setTimeLeft(cooldown)
    }
  }

  return <div className='text-center'>00:{timeLeft}</div>
}

export default CooldownTimer
