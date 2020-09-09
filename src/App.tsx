import React, { useState, Fragment } from 'react'
import { Title, Typer } from './components'
import { TestMode } from './lib/types'
import useWords from './lib/useWords'
import useChars from './lib/useChars'
import { backgroundColor } from './lib/utils'

const wordCount = 5
const symbolsCount = 20

function App() {
  const [mode, setMode] = useState<TestMode>('chars')
  const [isRunning, setIsRunning] = useState(false)
  const [resultText, setResultText] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWPM] = useState<number | null>(null)
  const words = useWords(wordCount, mode, isRunning)
  const symbols = useChars(symbolsCount, mode, isRunning)

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
          testText={mode === 'words' ? words : symbols}
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
