import React, { useRef, useState, useEffect, Fragment } from 'react'
import { CharState } from '../lib/types'
import { backgroundColor, yayColor, nayColor, emptyColor } from '../lib/utils'

export function Typer({ testText, isRunning, onStart, onFinish, latestWPM }: {
  testText: string
  isRunning: boolean
  onStart: () => void
  onFinish: (typedText: string) => void
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
  }, [isFocused])

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
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          maxWidth: 720,
          height: '25%',
          fontSize: 'calc(10px + 2vmin)',
          textAlign: 'center',
          wordSpacing: '0.25rem'
        }}
      >
        <div>
          {testText.split('').map((char: string, index: number) => {
            const state = charState(typedText, testText, index)
            const color = charColor(state)
            const isNaySpace = isSpaceChar(char) && state === 'nay'
            const isLastTypedChar = index === typedText.length - 1
            const isTypedEmpty = typedText.length === 0

            const borderStyle = isFocused ? {
              borderLeft: isTypedEmpty && index === 0 ? `solid 2px ${yayColor}` : 'none',
              borderRight: `solid 2px ${isLastTypedChar && !isTypedEmpty ? yayColor : '#282d33'}`,
              borderRadius: isLastTypedChar || isTypedEmpty ? 0 : '40%'
            } : {
              borderRight: 'solid 2px transparent',
              borderLeft: isTypedEmpty && index === 0 ? `solid 2px transparent` : 'none',
              borderRadius: '40%'
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
              Click here to start typing! (or press Enter)
            </div>
          )
        }
        {
          !isFocused && !isRunning && latestWPM && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor,
                color: yayColor,
                pointerEvents: 'none' 
              }}
            >
              <span style={{ fontSize: 92 }}>{latestWPM}</span>
              <span style={{ fontSize: 24 }}>wpm</span>
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
