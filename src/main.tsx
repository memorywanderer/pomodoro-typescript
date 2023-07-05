import React from 'react'
import ReactDOM from 'react-dom/client'
import Pomodoro from './components/Pomodoro/Pomodoro.tsx'
import './index.css'
import { PomodoroContextProvider } from './components/context/PomodoroContext.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PomodoroContextProvider>
      <Pomodoro />
    </PomodoroContextProvider>
  </React.StrictMode>,
)
