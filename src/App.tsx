import React, { useState, Fragment } from 'react'
import { Title, Typer } from './components'

const dummyTestText = 'bacon ipsum dolor amet hamburger pork chop tongue meatball turkey swine tenderloin ham bresaola capicola chislic ham hock biltong cupim jowl picanha brisket turducken pork chop filet'

function App() {
  const [typedText, setTypedText] = useState('')

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
          testText={dummyTestText}
        />
      </main>
    </Fragment>
  )
}

export default App
