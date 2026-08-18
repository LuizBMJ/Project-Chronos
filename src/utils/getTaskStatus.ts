import type { TaskModel } from '../models/TaskModel'

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.id === activeTask?.id) {
    return 'Em andamento'
  }

  if (task.interruptDate) {
    return 'Interrompida'
  }

  if (task.completeDate) {
    return 'Concluída'
  }

  return 'Abandonada'
}
