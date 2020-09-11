import { useState, useEffect } from 'react'
import { TestMode } from '../lib/types'

const charsDictionary = 'qwertyuiopasdfghjkl;zxcvbnm,.-QWERTYUIOPASDFGHJKL:ZXCVBNM<>_()|!@#$%&/\'"*{}[]^~`]\\?=+1234567890'
const charWordLength = 5

const generateChars = (amount: number) => {
  let chars: string[] = []

  for (let w = 0; w < amount; w++) {
    let word = ''
    for (let i = 0; i < charWordLength; i++) {
      const index = Math.floor(Math.random() * charsDictionary.length)
      word += charsDictionary[index]
    }
    chars.push(word)
  }

  return chars
}

const useWords = (amount: number, testMode: TestMode, isRunning: boolean) => {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    const fetchWords = async () => {
      await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`)
        .then(response => response.json())
        .then(data => {
          setWords(data)
        })
        .catch(e => {
          console.log(e)
          setWords('failed to retreive words'.split(' '))
        })
    }

    if (!isRunning) {
      if (testMode === 'words' && !isRunning) fetchWords()

      if (testMode === 'chars' && !isRunning) {
        setWords(generateChars(amount))
      }
    }

  }, [amount, testMode, isRunning])

  return words.join(' ')
}

export default useWords

