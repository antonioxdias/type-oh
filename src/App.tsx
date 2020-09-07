import React, { useState, Fragment } from 'react'
import { Title, Typer } from './components'
import useWords from './lib/useWords'
import { backgroundColor } from './lib/utils'

const wordCount = 15

function App() {
  const [resultText, setResultText] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWPM] = useState<number | null>(null)
  const words = useWords(wordCount, resultText)

  const onRunStart = () => {
    setIsRunning(true)
    setStartTime(Date.now())
  }

  const onRunFinish = (typedText: string) => {
    setResultText(typedText)
    setIsRunning(false)
    setWPM(calcWPM(Date.now()))
    setStartTime(null)
  }

  const calcWPM = (endTime: number): number => {
    if (!startTime) return 0
    return Math.round(wordCount / ((endTime - startTime) / 60000))
  }

  return (
    <Fragment>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor,
          height: '100vh',
          color: 'white'
        }}
      >
        <Title />
        <Typer
          testText={words.join(' ')}
          isRunning={isRunning}
          onStart={onRunStart}
          onFinish={onRunFinish}
          latestWPM={wpm}
        />
      </main>
    </Fragment>
  )
}

export default App
