import React, { useRef, useState, Fragment } from 'react'

const dummyTestText = 'bacon ipsum dolor amet hamburger pork chop tongue meatball turkey swine tenderloin ham bresaola capicola chislic ham hock biltong cupim jowl picanha brisket turducken pork chop filet'

type CharState = 'yay' | 'nay' | 'empty'

const yayColor = '#c7b798'
const nayColor = '#f56c42'
const emptyColor = '#808080'

function Typer() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [typedText, setTypedText] = useState('')

  const focusInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }

  const charState = (index: number): CharState => {
    if (typedText[index]) {
      const isEq = typedText.charCodeAt(index) === dummyTestText.charCodeAt(index)
      return isEq ? 'yay' : 'nay'
    }
    return 'empty'
  }

  const isSpaceChar = (char: string) => char.charCodeAt(0) === 32

  const charColor = (state: CharState) => {
    switch (state) {
      case 'yay':
        return yayColor
      case 'nay':
        return nayColor
      default:
        return emptyColor
    }
  }

  return (
    <Fragment>
      <div
        onClick={focusInput}
        style={{
          maxWidth: 720,
          fontSize: 'calc(10px + 2vmin)',
          textAlign: 'center',
          wordSpacing: 4
        }}
      >
        {dummyTestText.split('').map((char: string, index: number) => {
          const state = charState(index)
          const color = charColor(state)
          const isNaySpace = isSpaceChar(char) && state === 'nay'
          return (
            <span
              key={index}
              style={{
                color,
                backgroundColor: isNaySpace ? nayColor : 'transparent',
                borderRadius: 8
              }}
            >
              {char}
            </span>
          )
        })}
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
