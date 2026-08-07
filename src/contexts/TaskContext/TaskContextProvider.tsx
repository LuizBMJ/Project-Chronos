import { useEffect, useReducer, useRef } from 'react'
import { initialTaskState } from './InitialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/timerWorkerManager'
import { TaskActionTypes } from './taskActions'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const workerRef = useRef<TimerWorkerManager | null>(null)
  const lastActiveTaskIdRef = useRef<string | null>(null)

  function handleWorkerMessage(e: MessageEvent) {
    const countDownSeconds = e.data

    if (countDownSeconds <= 0) {
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
  }

  useEffect(() => {
    workerRef.current = TimerWorkerManager.getInstance()
    workerRef.current.onmessage(handleWorkerMessage)

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
  }, [state])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
