import { useState, useEffect } from 'react'
import { TestMode } from '../lib/types'

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

    if (testMode === 'words' && !isRunning) fetchWords()
  }, [amount, testMode, isRunning])

  return words.join(' ')
}

export default useWords

