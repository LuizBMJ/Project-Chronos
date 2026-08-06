import { useEffect, useReducer, useRef } from 'react'
import { initialTaskState } from './InitialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/timerWorkerManager'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const workerRef = useRef<TimerWorkerManager | null>(null)

  useEffect(() => {
    workerRef.current = TimerWorkerManager.getInstance()

    workerRef.current.onmessage((e) => {
      const countDownSeconds = e.data
      console.log(countDownSeconds)

      if (countDownSeconds <= 0) {
        console.log('Worker COMPLETED')
      }
    })
  }, [])

  useEffect(() => {
    if (!state.activeTask || !workerRef.current) return

    workerRef.current.postMessage(state)
  }, [state])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}
