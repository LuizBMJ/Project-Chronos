import { useTaskContext } from '../../contexts/TaskContext/UseTaskContext'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { getArcSegmentPath } from './getArcSegmentPath'
import type { TaskModel } from '../../models/TaskModel'
import styles from './styles.module.css'

const TOTAL_SEGMENTS = 8
const SIZE = 280
const CENTER = SIZE / 2
const RADIUS = 118
const STROKE_WIDTH = 14

type CyclesArcProps = {
  children?: React.ReactNode
}

const segmentColorByType: Record<TaskModel['type'], string> = {
  workTime: 'var(--primary)',
  shortBreakTime: 'var(--primary)',
  longBreakTime: 'var(--error)',
}

export function CyclesArc({ children }: CyclesArcProps) {
  const { state } = useTaskContext()

  const cycleDescriptionMap: Record<TaskModel['type'], string> = {
    workTime: 'Tempo de foco',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  }

  return (
    <div className={styles.wrapper}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role='img'
        aria-label={`Ciclo ${state.currentCycle} de ${TOTAL_SEGMENTS}`}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill='none'
          stroke='var(--gray-700)'
          strokeWidth={STROKE_WIDTH}
        />

        {Array.from({ length: TOTAL_SEGMENTS }).map((_, segmentIndex) => {
          // Ciclos são 1-indexados no restante do app (ver TaskStateModel)
          const cycleNumber = segmentIndex + 1
          const isCompleted = cycleNumber <= state.currentCycle

          const nextCycle = getNextCycle(segmentIndex)
          const cycleType = getNextCycleType(nextCycle)

          const path = getArcSegmentPath({
            cx: CENTER,
            cy: CENTER,
            radius: RADIUS,
            segmentIndex,
            totalSegments: TOTAL_SEGMENTS,
          })

          return (
            <path
              key={`${cycleType}_${cycleNumber}`}
              d={path}
              fill='none'
              stroke={isCompleted ? segmentColorByType[cycleType] : 'var(--gray-600)'}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap='butt'
              className={isCompleted ? styles.segmentCompleted : styles.segmentPending}
              aria-label={`Indicador de ciclo de foco: ${cycleDescriptionMap[cycleType]}`}
            >
              <title>{cycleDescriptionMap[cycleType]}</title>
            </path>
          )
        })}
      </svg>

      <div className={styles.content}>{children}</div>
    </div>
  )
}
