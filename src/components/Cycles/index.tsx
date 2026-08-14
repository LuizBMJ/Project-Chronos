import { useTaskContext } from '../../contexts/TaskContext/UseTaskContext'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { getNextCycle } from '../../utils/getNextCycle'
import styles from './styles.module.css'

export function Cycles() {
  const { state } = useTaskContext()

  const cycleStep = Array.from({ length: state.currentCycle })

  const cycleDescriptionMap = {
    workTime: 'Tempo de foco',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  }

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index)
          const nextCycleType = getNextCycleType(nextCycle)
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de foco: ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de foco: ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          )
        })}
      </div>
    </div>
  )
}
