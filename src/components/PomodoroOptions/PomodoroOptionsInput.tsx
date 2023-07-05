import { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'

type OptionsInputProps = {
  type: string
}

export default function PomodoroOptionsInput({ type }: OptionsInputProps) {
  const {
    sessionTime,
    breakTime,
    increaseSessionTime,
    increaseBreakTime,
    decreaseSessionTime,
    decreaseBreakTime,
    handleSessionTime,
    handleBreakTime } = useContext(PomodoroContext)

  return (
    <div className='input options__input'>
      <button
        onClick={
          (type === 'session')
            ? increaseSessionTime
            : increaseBreakTime
        }
        className="btn-up input__btn-up"
      >
        <i className="fas fa-angle-double-up"></i>
      </button>
      <span className="input__title">Set {type}</span>
      <input
        onChange={
          (type === 'session')
            ? handleSessionTime
            : handleBreakTime}
        value={
          (type === 'session')
            ? sessionTime
            : breakTime
        }
        type="number"
        className="input__field" />
      <button
        onClick={
          (type === 'session')
            ? decreaseSessionTime
            : decreaseBreakTime
        }
        className="btn-down input__btn-down"
      >
        <i className="fas fa-angle-double-down"></i>
      </button>
    </div>
  )
}
