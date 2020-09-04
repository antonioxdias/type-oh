import { useState, useEffect } from 'react'

const useWords = (amount: number, request: boolean, onRequestComplete: () => void) => {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    if (request) {
      fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`)
        .then(response => response.json())
        .then(data => {
          setWords(data)
          onRequestComplete()
        })
        .catch(e => {
          console.log(e)
          setWords('failed to retreive words'.split(' '))
          onRequestComplete()
        })
    }
  }, [amount, request])

  return words
}

export default useWords

