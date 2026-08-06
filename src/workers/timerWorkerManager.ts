let instance: TimerWorkerManager | null = null

export class TimerWorkerManager {
  private worker: Worker

  private constructor() {
    this.worker = new Worker(new URL('../workers/timerWorker.js', import.meta.url))
  }

  public static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager()
    }
    return instance
  }

  public postMessage(message: unknown): void {
    this.worker.postMessage(message)
  }

  public onMessage(callback: (event: MessageEvent) => void): void {
    this.worker.onmessage = callback
  }

  public terminate(): void {
    this.worker.terminate()
    instance = null
  }
}
