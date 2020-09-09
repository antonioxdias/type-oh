import React, { useRef, useState, useEffect, Fragment } from 'react'
import { CharState } from '../lib/types'
import { backgroundColor, yayColor, nayColor, emptyColor } from '../lib/utils'

export function Typer({ testText, isRunning, onStart, onFinish, showWPM, latestWPM }: {
  testText: string
  isRunning: boolean
  onStart: () => void
  onFinish: (typedText: string) => void
  showWPM: boolean
  latestWPM: number | null
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [typedText, setTypedText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (testText === '') return
    if (typedText.length === testText.length && isRunning) {
      onFinish(typedText)
      blurInput()
    }
  }, [typedText, testText, isRunning, onFinish])

  useEffect(() => setTypedText(''), [testText])

  useEffect(() => {
    const focusOnEnterDown = (ev: KeyboardEvent) => {
      if (ev.keyCode === 13 && !isFocused) focusInput()
    }
    document.addEventListener('keydown', focusOnEnterDown)
    return () => {
      document.removeEventListener('keydown', focusOnEnterDown)
    }
  }, [])

  const focusInput = () => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }

  const blurInput = () => {
    if (inputRef && inputRef.current) inputRef.current.blur()
  }
  
  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) onStart()
    setTypedText(ev.target.value)
  }

  if (!testText) return null

  return (
    <Fragment>
      <div
        onClick={focusInput}
        style={{
          position: 'relative',
          maxWidth: 720,
          fontSize: 'calc(10px + 2vmin)',
          textAlign: 'center',
          wordSpacing: '0.25rem'
        }}
      >
        {testText.split('').map((char: string, index: number) => {
          const state = charState(typedText, testText, index)
          const color = charColor(state)
          const isNaySpace = isSpaceChar(char) && state === 'nay'
          const isLastTypedChar = index === typedText.length - 1
          const isTypedEmpty = typedText.length === 0

          const borderStyle = isFocused ? {
            borderLeft: isTypedEmpty && index === 0 ? `solid 2px ${yayColor}` : 'none',
            borderRight: `solid 2px ${isLastTypedChar && !isTypedEmpty ? yayColor : '#282d33'}`,
            borderRadius: isLastTypedChar || isTypedEmpty ? 0 : 8
          } : {
            borderRight: 'solid 2px transparent',
            borderLeft: isTypedEmpty && index === 0 ? `solid 2px transparent` : 'none',
            borderRadius: 8
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
        {
          !isFocused && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                backgroundColor,
                opacity: 0.8,
                verticalAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Click here to start typing!
            </div>
          )
        }
        {
          !isFocused && showWPM && latestWPM && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                backgroundColor,
                color: yayColor,
                fontSize: 24,
                pointerEvents: 'none' 
              }}
            >
              {latestWPM}
            </div>
          )
        }
      </div>
      <input
        ref={inputRef}
        value={typedText}
        onChange={onInputChange}
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

const charState = (typedText: string, testText: string, index: number): CharState => {
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
