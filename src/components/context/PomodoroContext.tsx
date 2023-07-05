import { ChangeEvent, ReactElement, createContext, useCallback, useReducer } from "react"
import {
  MIN_TIME,
  MINUTE,
  MAX_TIME,
  DEFAULT_SESSION_TIME,
  DEFAULT_BREAK_TIME
} from '../../constants/timeConstants'


export type PomodoroStateType = {
  sessionTime: number | string,
  breakTime: number | string,
  active: boolean
}

const initialState: PomodoroStateType = {
  sessionTime: DEFAULT_SESSION_TIME / MINUTE,
  breakTime: DEFAULT_BREAK_TIME / MINUTE,
  active: false
}

export const POMODORO_ACTION_TYPE = {
  SESSION_INCREASE_TIME: 'SESSION_INCREASE_TIME',
  SESSION_DECREASE_TIME: 'SESSION_DECREASE_TIME',
  BREAK_INCREASE_TIME: 'BREAK_INCREASE_TIME',
  BREAK_DECREASE_TIME: 'BREAK_DECREASE_TIME',
  HANDLE_SESSION_TIME: 'HANDLE_SESSION_TIME',
  HANDLE_BREAK_TIME: 'HANDLE_BREAK_TIME',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
}

export type PomodoroActionType = typeof POMODORO_ACTION_TYPE

export type PomodoroAction = {
  type: string,
  payload?: string
}

export const reducer = (state: PomodoroStateType, action: PomodoroAction): PomodoroStateType => {
  switch (action.type) {
    case POMODORO_ACTION_TYPE.START_TIMER: {
      return {
        ...state,
        active: true
      }
    }

    case POMODORO_ACTION_TYPE.STOP_TIMER: {
      return {
        ...state,
        active: false
      }
    }

    case POMODORO_ACTION_TYPE.HANDLE_SESSION_TIME: {
      if ((action.payload !== undefined)
        && (+action.payload > MIN_TIME / MINUTE || +action.payload < MAX_TIME / MINUTE)) {
        return {
          ...state,
          sessionTime: action.payload
        }
      }
      return state
    }
    /*
      If session time is less than max time constant (60 min), 
      then increase session time, else return max time in minutes (60 min)
      + converts value from string to number
    */
    case POMODORO_ACTION_TYPE.SESSION_INCREASE_TIME: {
      if (+state.sessionTime < MAX_TIME / MINUTE) {
        return {
          ...state,
          sessionTime: +state.sessionTime + 1
        }
      } else {
        return {
          ...state,
          sessionTime: MAX_TIME / MINUTE
        }
      }
    }

    case POMODORO_ACTION_TYPE.SESSION_DECREASE_TIME: {
      /*
        If session time is more than min time constant (5 min), 
        then decrease session time, else return min time in minutes (5 min)
        + converts value from string to number
      */
      if (+state.sessionTime > MIN_TIME / MINUTE) {
        return {
          ...state,
          sessionTime: +state.sessionTime - 1
        }
      } else {
        return {
          ...state,
          sessionTime: MIN_TIME / MINUTE
        }
      }
    }

    case POMODORO_ACTION_TYPE.HANDLE_BREAK_TIME: {
      if ((action.payload !== undefined)
        && (+action.payload > MIN_TIME / MINUTE || +action.payload < MAX_TIME / MINUTE)) {
        return {
          ...state,
          breakTime: action.payload
        }
      }
      return state
    }

    case POMODORO_ACTION_TYPE.BREAK_INCREASE_TIME: {
      if (+state.breakTime < MAX_TIME / MINUTE) {
        return {
          ...state,
          breakTime: +state.breakTime - 1
        }
      } else {
        return {
          ...state,
          breakTime: MAX_TIME / MINUTE
        }
      }
    }

    case POMODORO_ACTION_TYPE.BREAK_DECREASE_TIME: {
      if (+state.breakTime > MIN_TIME / MINUTE) {
        return {
          ...state,
          breakTime: +state.breakTime - 1
        }
      } else {
        return {
          ...state,
          breakTime: MIN_TIME / MINUTE
        }
      }
    }
    default:
      return state
  }
}

const usePomodoroContext = (initialState: PomodoroStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { sessionTime, breakTime, active } = state
  const increaseSessionTime = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.SESSION_INCREASE_TIME })
  }, [])

  const decreaseSessionTime = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.SESSION_DECREASE_TIME })
  }, [])

  const increaseBreakTime = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.BREAK_INCREASE_TIME })
  }, [])

  const decreaseBreakTime = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.BREAK_DECREASE_TIME })
  }, [])

  const handleSessionTime = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: POMODORO_ACTION_TYPE.HANDLE_SESSION_TIME, payload: e.target.value })
  }, [])

  const handleBreakTime = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: POMODORO_ACTION_TYPE.HANDLE_BREAK_TIME, payload: e.target.value })
  }, [])

  const enableTimer = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.START_TIMER })
  }, [])

  const disableTimer = useCallback(() => {
    dispatch({ type: POMODORO_ACTION_TYPE.STOP_TIMER })
  }, [])

  return {
    sessionTime,
    breakTime,
    active,
    increaseSessionTime,
    decreaseSessionTime,
    increaseBreakTime,
    decreaseBreakTime,
    handleSessionTime,
    handleBreakTime,
    enableTimer,
    disableTimer
  }
}

type UsePomodoroContextType = ReturnType<typeof usePomodoroContext>

const initialPomodoroContextState: UsePomodoroContextType = {
  sessionTime: DEFAULT_SESSION_TIME / MINUTE,
  breakTime: DEFAULT_BREAK_TIME / MINUTE,
  active: false,
  increaseSessionTime: () => { },
  decreaseSessionTime: () => { },
  increaseBreakTime: () => { },
  decreaseBreakTime: () => { },
  handleSessionTime: () => { },
  handleBreakTime: () => { },
  enableTimer: () => { },
  disableTimer: () => { }
}


export const PomodoroContext = createContext<UsePomodoroContextType>(initialPomodoroContextState)

type ChildrenType = {
  children?: ReactElement | ReactElement[]
}

export const PomodoroContextProvider = ({ children }: ChildrenType) => {
  return <PomodoroContext.Provider value={usePomodoroContext(initialState)}>
    {children}
  </PomodoroContext.Provider>
}
