import { useState, useEffect } from 'react'
import { TestMode } from '../lib/types'
import { charsDict, wordsDict } from '../lib/dictionary'

const randint = (max: number) => (
  Math.floor(Math.random() * max)
)

const generateWords = (amount: number) => {
  let words: string[] = []

  for (let i = 0; i < amount; i++) {
    const index = randint(wordsDict.length)
    words.push(wordsDict[index])
  }
  
  return words
}

const charWordLength = 5
const generateChars = (amount: number) => {
  let chars: string[] = []

  for (let w = 0; w < amount; w++) {
    let word = ''
    for (let i = 0; i < charWordLength; i++) {
      const index = randint(charsDict.length)
      word += charsDict[index]
    }
    chars.push(word)
  }

  return chars
}

const useWords = (amount: number, testMode: TestMode, isRunning: boolean) => {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    if (!isRunning) {
      if (testMode === 'words' && !isRunning){
        setWords(generateWords(amount))
      }

      if (testMode === 'chars' && !isRunning) {
        setWords(generateChars(amount))
      }
    }
  }, [amount, testMode, isRunning])

  return words.join(' ')
}

export default useWords

