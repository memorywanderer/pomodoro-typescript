import { useContext, useEffect, useState } from 'react'
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer.jsx'
import PomodoroOptions from '../PomodoroOptions/PomodoroOptions.jsx'
import { PomodoroContext } from '../context/PomodoroContext.js'
import './Pomodoro.css'
import {
  DEFAULT_SESSION_TIME,
  DEFAULT_BREAK_TIME,
  MIN_TIME,
  MINUTE,
  MAX_TIME
} from '../../constants/timeConstants'


export default function Pomodoro() {
  const { sessionTime, breakTime, active } = useContext(PomodoroContext)
  const [sessionDuration, setSessionDuration] = useState(DEFAULT_SESSION_TIME)
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_TIME)

  useEffect(() => {
    if (+sessionTime * MINUTE <= MIN_TIME) {
      setSessionDuration(MIN_TIME)
    } else if (+sessionTime * MINUTE >= MAX_TIME) {
      setSessionDuration(MAX_TIME)
    } else {
      setSessionDuration(+sessionTime * MINUTE)
    }
  }, [sessionTime])

  useEffect(() => {
    if (+breakTime * MINUTE <= MIN_TIME) {
      setBreakDuration(MIN_TIME)
    } else if (+breakTime * MINUTE >= MAX_TIME) {
      setBreakDuration(MAX_TIME)
    } else {
      setBreakDuration(+breakTime * MINUTE)
    }
  }, [breakTime])

  return (
    <>
      <section className="pomodoro">
        <PomodoroTimer
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
        />
        {!active && <PomodoroOptions />}
      </section>
      <svg className='absolute'>
        <filter id='noiseFilter'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.7'
            stitchTiles='stitch' />
        </filter>
      </svg>
      <div className="decoration decoration--one"></div>
      <div className="decoration decoration--two"></div>
    </>
  )
}
