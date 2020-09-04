import React, { useRef, useState, Fragment } from 'react'

const dummyTestText = 'bacon ipsum dolor amet hamburger pork chop tongue meatball turkey swine tenderloin ham bresaola capicola chislic ham hock biltong cupim jowl picanha brisket turducken pork chop filet'

function Typer() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [typedText, setTypedText] = useState('')

  const focusInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }

  return (
    <Fragment>
      <div
        onClick={ focusInput }
        style={{
          position: 'relative',
          maxWidth: 720,
          fontSize: 'calc(10px + 2vmin)'
        }}
      >
        <div
          style={{
            width: '100%',
            color: '#808080'
          }}
        >
          { dummyTestText }
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            width: '100%',
            color: '#c7b798'
          }}
        >
          { typedText }
        </div>
      </div>
      <input
        ref={inputRef}
        onChange={(ev) => setTypedText(ev.target.value)}
        style={{
          position: 'absolute',
          top: '-999999px',
          left: '-999999px'
        }}
      />
    </Fragment>
  )
}

export default Typer
