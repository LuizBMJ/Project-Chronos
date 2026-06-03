import { createContext } from 'react'
import type { TaskStateModel } from '../../models/TaskStateModel'
import { initialTaskState } from './InitialTaskState'

type TaskContextProps = {
  state: TaskStateModel
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>
}

const InitialContextValue = {
  state: initialTaskState,
  setState: () => {},
}
export const TaskContext = createContext<TaskContextProps>(InitialContextValue)
