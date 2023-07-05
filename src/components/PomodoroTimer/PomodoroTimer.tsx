import { useContext, useEffect, useMemo, useState } from 'react'
import './PomodoroTimer.css'

import TimerCountdown from './TimerCountdown.jsx'

import StartButton from './StartButton.jsx'
import PauseButton from './PauseButton.js'
import ResetButton from './ResetButton.jsx'

import { INTERVAL } from '../../constants/timeConstants'
import { PomodoroContext } from '../context/PomodoroContext.js'
import useLocalStorage from '../../hooks/useLocalStorage.js'

type PomodoroTimerProps = {
  sessionDuration: number,
  breakDuration: number,
}

const nearMidnight = new Date(new Date().setHours(24, 0, 0, 0))

export default function PomodoroTimer({ sessionDuration, breakDuration }: PomodoroTimerProps) {
  const { enableTimer, disableTimer, active } = useContext(PomodoroContext)

  const [deadline, setDeadline] = useState<Date>(new Date(Date.now() + sessionDuration));
  const parsedDeadline = useMemo<number>(() => Date.parse(deadline.toString()), [deadline]);
  const [timespan, setTimespan] = useState<number>(new Date(parsedDeadline - Date.now()).getTime())

  const [isSession, setIsSession] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [localSessions, setLocalSessions] = useLocalStorage('sessions', 0, nearMidnight.getTime())
  const [localBreaks, setLocalBreaks] = useLocalStorage('breaks', 0, nearMidnight.getTime())

  useEffect(() => {
    setIsReset(false);
    disableTimer();
    (isBreak) && setDeadline(new Date(Date.now() + breakDuration));
    (isSession) && setDeadline(new Date(Date.now() + sessionDuration));
  }, [isSession, isBreak, breakDuration, sessionDuration, isReset])

  useEffect(() => {
    let intervalId: number
    if (active && isSession) {
      intervalId = setInterval(() => {
        setTimespan((_timespan) => {
          if (_timespan > 1000) {
            return _timespan - INTERVAL
          } else {
            setIsSession(false)
            setIsBreak(true)
            clearInterval(intervalId);
            setLocalSessions(localSessions + 1)
            return 0
          }
        })
      }, INTERVAL)
    } else if (active && isBreak) {
      intervalId = setInterval(() => {
        setTimespan((_timespan) => {
          if (_timespan > 1000) {
            return _timespan - INTERVAL
          } else {
            setIsSession(true)
            setIsBreak(false)
            clearInterval(intervalId);
            setLocalBreaks(localBreaks + 1)
            return 0
          }
        })
      }, INTERVAL)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [INTERVAL, active])

  useEffect(() => {
    setTimespan(new Date(parsedDeadline - Date.now()).getTime());
  }, [parsedDeadline]);

  const handleOnStartClick = () => {
    enableTimer()
  }

  const handleOnPauseClick = () => {
    disableTimer()
  }

  const handleOnResetClick = () => {
    setIsReset(true)
  }

  return (
    <section className="timer pomodoro__timer">
      <h1 className='timer__title'>Focus Timer</h1>
      <p className='timer__descr'>Sessions today: {localSessions ? localSessions : 0}</p>
      <p className='timer__descr'>Breaks today: {localBreaks ? localBreaks : 0}</p>
      <TimerCountdown
        time={timespan}
      />
      <section className="timer__controls">
        {!active
          ? <StartButton onStartClick={handleOnStartClick} />
          : <PauseButton onPauseClick={handleOnPauseClick} />}
        {!active && <ResetButton onResetClick={handleOnResetClick} />}
      </section>

    </section>
  )
}
