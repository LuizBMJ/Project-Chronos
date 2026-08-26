import { useCallback, useEffect, useReducer, useRef } from 'react'
import { initialTaskState } from './InitialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/timerWorkerManager'
import { TaskActionTypes } from './taskActions'
import { loadBeep } from '../../utils/loadBeep'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state')

    if (storageState === null) return initialTaskState

    try {
      const parsedState = JSON.parse(storageState)
      if (typeof parsedState === 'object' && parsedState !== null) {
        return { ...initialTaskState, ...parsedState }
      }
    } catch {
      // Ignore JSON parse errors
    }

    return initialTaskState
  })
  const workerRef = useRef<TimerWorkerManager | null>(null)
  const lastActiveTaskIdRef = useRef<string | null>(null)
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null)

  const handleWorkerMessage = useCallback((e: MessageEvent) => {
    const countDownSeconds = e.data

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current()
        playBeepRef.current = null
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      })
      workerRef.current?.terminate()
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      })
    }
  }, [])

  useEffect(() => {
    workerRef.current = TimerWorkerManager.getInstance()
    workerRef.current.onmessage(handleWorkerMessage)
  }, [handleWorkerMessage])

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
    document.title = state.activeTask ? `${state.formattedSecondsRemaining} - Chronos` : 'Chronos'
  }, [state])

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    const currentTaskId = state.activeTask?.id ?? null

    if (currentTaskId === lastActiveTaskIdRef.current) return

    if (!currentTaskId) {
      if (lastActiveTaskIdRef.current !== null) {
        workerRef.current?.terminate()
        workerRef.current = TimerWorkerManager.getInstance()
        workerRef.current.onmessage(handleWorkerMessage)
        lastActiveTaskIdRef.current = null
      }
      return
    }

    lastActiveTaskIdRef.current = currentTaskId
    workerRef.current?.postMessage(state)
  }, [state, handleWorkerMessage])

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep()
    } else {
      playBeepRef.current = null
    }
  }, [state.activeTask])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
