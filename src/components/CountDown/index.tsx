import { useTaskContext } from '../../contexts/TaskContext/UseTaskContext'
import { CyclesArc } from '../CyclesArc'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import styles from './styles.module.css'

const cycleLabelByType = {
  workTime: 'Foco',
  shortBreakTime: 'Descanso curto',
  longBreakTime: 'Descanso longo',
}

export function CountDown() {
  const { state } = useTaskContext()

  const nextCycle = getNextCycle(state.currentCycle)
  const activeType = state.activeTask?.type ?? getNextCycleType(nextCycle)
  const activeCycle = state.activeTask ? state.currentCycle : nextCycle

  return (
    <CyclesArc>
      <span className={styles.time}>{state.formattedSecondsRemaining}</span>
      <span className={styles.label}>
        Ciclo {activeCycle} · {cycleLabelByType[activeType]}
      </span>
    </CyclesArc>
  )
}
