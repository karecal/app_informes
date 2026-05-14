import { useState, useEffect } from 'react'

function useClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatted = time.toLocaleString('es-ES', {
  weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return formatted
}

export default useClock