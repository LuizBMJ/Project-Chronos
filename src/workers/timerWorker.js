let runningTaskId = null

self.onmessage = (event) => {
  const state = event.data
  const { activeTask, secondsRemaining } = state

  if (!activeTask) return
  if (runningTaskId === activeTask.id) return

  runningTaskId = activeTask.id

  const endDate = activeTask.startDate + secondsRemaining * 1000
  const now = Date.now()
  let countDownSeconds = Math.ceil((endDate - now) / 1000)

  function tick() {
    self.postMessage(countDownSeconds)

    if (countDownSeconds <= 0) return

    const now = Date.now()
    countDownSeconds = Math.floor((endDate - now) / 1000)

    setTimeout(tick, 1000)
  }

  tick()
}
