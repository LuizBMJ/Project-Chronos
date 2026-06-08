import { PlayCircleIcon } from 'lucide-react'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import { useRef } from 'react'
import { getNextCycle } from '../../utils/getNextCycle'
import type { TaskModel } from '../../models/TaskModel'
import { useTaskContext } from '../../contexts/TaskContext/UseTaskContext'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes'

export function MainForm() {
  const { state, setState } = useTaskContext()
  const taskNameInput = useRef<HTMLInputElement>(null)

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  console.log('state.currentCycle', state.currentCycle)
  console.log('nextCycle', nextCycle)
  console.log('nextCycleType', nextCycleType)

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (taskNameInput.current === null) return

    const taskName = taskNameInput.current.value.trim()

    if (!taskName) {
      alert('Digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interuptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    const secondsRemaining = newTask.duration * 60

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // Conferir
        tasks: [...prevState.tasks, newTask],
      }
    })
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>
          O proximo ciclo é: <strong>{nextCycleType}</strong> com duração de{' '}
          <strong>{formatSecondsToMinutes(state.config[nextCycleType])}</strong>
        </p>
      </div>
      {state.currentCycle !== 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  )
}
