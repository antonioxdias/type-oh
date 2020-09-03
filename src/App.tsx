import React from 'react'
import Typer from './components/Typer'

function App() {
  return (
    <main
      style={{
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#282c34',
        height: '100vh',
        color: 'white'
      }}
    >
      <Typer />
    </main>
  )
}

export default App
