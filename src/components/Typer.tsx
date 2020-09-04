import React, { useRef, useState, Fragment } from 'react'

type CharState = 'yay' | 'nay' | 'empty'

const yayColor = '#c7b798'
const nayColor = '#f56c42'
const emptyColor = '#808080'

export function Typer({ typedText, setTypedText, testText }: {
  typedText: string
  setTypedText: (value: string) => void
  testText: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const focusInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }

  const charState = (index: number): CharState => {
    if (typedText[index]) {
      const isEq = typedText.charCodeAt(index) === testText.charCodeAt(index)
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
          fontFamily: 'monospace, monospace',
          textAlign: 'center',
          wordSpacing: '0.25rem',
          letterSpacing: '-0.25rem'
        }}
      >
        {testText.split('').map((char: string, index: number) => {
          const state = charState(index)
          const color = charColor(state)
          const isNaySpace = isSpaceChar(char) && state === 'nay'
          const isLastTypedChar = index === typedText.length - 1
          const isTypedEmpty = typedText.length === 0

          const borderStyle = isFocused ? {
            borderLeft: `solid 2px ${isTypedEmpty && index === 0 ? yayColor : 'transparent'}`,
            borderRight: `solid 2px ${isLastTypedChar && !isTypedEmpty ? yayColor : 'transparent'}`,
            borderRadius: isLastTypedChar || isTypedEmpty ? 0 : 8
          } : {
            borderLeft: 'solid 2px transparent',
            borderRight: 'solid 2px transparent'
          }

          return (
            <span
              key={index}
              style={{
                color,
                backgroundColor: isNaySpace ? nayColor : 'transparent',
                ...borderStyle
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          position: 'absolute',
          top: '-999999px',
          left: '-999999px'
        }}
      />
    </Fragment>
  )
}
