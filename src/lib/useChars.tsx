import { useState, useEffect } from 'react'
import { TestMode } from './types'

const charsDictionary = 'qwertyuiopasdfghjkl;zxcvbnm,.-QWERTYUIOPASDFGHJKL:ZXCVBNM<>_()|!@#$%&/\'"*{}[]^~`]\\?=+1234567890 '

const generateChars = (amount: number) => {
  let chars = ''

  for (let i = 0; i < amount ; i++) {
    const index = Math.floor(Math.random() * charsDictionary.length)
    chars += charsDictionary[index]
  }
  
  return chars
}

const useChars = (amount: number, testMode: TestMode, isRunning: boolean) => {
  const [chars, setChars] = useState('')

  useEffect(() => {
    if (testMode === 'chars' && !isRunning) {
      setChars(generateChars(amount))
    }
  }, [amount, testMode, isRunning])

  return chars
}

export default useChars
