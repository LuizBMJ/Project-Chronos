self.onmessage = (event) => {
  console.log('Timer worker recebeu mensagem:', event.data)

  switch (event.data) {
    case 'OLA':
      self.postMessage('OLA')
      break
  }
}
