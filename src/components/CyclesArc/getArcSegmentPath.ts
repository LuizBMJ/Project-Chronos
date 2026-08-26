// Calcula o "d" (path) de um segmento de arco SVG.
//
// O arco completo do relógio de Chronos é dividido em `totalSegments` partes
// iguais, cada uma representando um ciclo (foco, descanso curto ou longo).
// Começamos no topo (-90°) e giramos no sentido horário, com um pequeno
// espaço (gap) entre os segmentos para que cada ciclo fique visualmente
// separado — como marcações em um relógio de sol.

type GetArcSegmentPathParams = {
  cx: number // centro X do círculo
  cy: number // centro Y do círculo
  radius: number
  segmentIndex: number // índice do segmento, começando em 0
  totalSegments: number
  gapDegrees?: number // espaço entre segmentos, em graus
}

function polarToCartesian(cx: number, cy: number, radius: number, angleDegrees: number) {
  const angleRadians = ((angleDegrees - 90) * Math.PI) / 180

  return {
    x: cx + radius * Math.cos(angleRadians),
    y: cy + radius * Math.sin(angleRadians),
  }
}

export function getArcSegmentPath({
  cx,
  cy,
  radius,
  segmentIndex,
  totalSegments,
  gapDegrees = 4,
}: GetArcSegmentPathParams): string {
  const segmentSweep = 360 / totalSegments
  const startAngle = segmentIndex * segmentSweep + gapDegrees / 2
  const endAngle = (segmentIndex + 1) * segmentSweep - gapDegrees / 2

  const start = polarToCartesian(cx, cy, radius, startAngle)
  const end = polarToCartesian(cx, cy, radius, endAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}
