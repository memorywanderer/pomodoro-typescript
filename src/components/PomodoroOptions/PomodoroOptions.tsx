import PomodoroOptionsInput from './PomodoroOptionsInput.jsx'

import './PomodoroOptions.css'

export default function PomodoroOptions() {
  return (
    <div className='options pomodoro__options'>
      <PomodoroOptionsInput type="session" />
      <PomodoroOptionsInput type="break" />
    </div>
  )
}
