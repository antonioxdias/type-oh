import React, { useState, Fragment } from 'react'
import { Title, Typer } from './components'
import useWords from './lib/useWords'
import { backgroundColor } from './lib/utils'

function App() {
  const [resultText, setResultText] = useState('')
  const words = useWords(15, resultText)

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
          onFinish={typedText => setResultText(typedText)}
        />
      </main>
    </Fragment>
  )
}

export default App
