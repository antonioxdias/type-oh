import React, { useState, Fragment, useEffect } from 'react'
import { Title, Typer } from './components'
import useWords from './lib/useWords'

function App() {
  const [typedText, setTypedText] = useState('')
  const [requestWords, setRequestWords] = useState(true)

  const requestCompleted = () => setRequestWords(false)
  const words = useWords(50, requestWords, requestCompleted)
  useEffect(() => requestCompleted, [])

  return (
    <Fragment>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#282d33',
          height: '100vh',
          color: 'white'
        }}
      >
        <Title />
        <Typer
          typedText={typedText}
          setTypedText={setTypedText}
          testText={words.join(' ')}
        />
      </main>
    </Fragment>
  )
}

export default App
