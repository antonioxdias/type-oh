import { useState, useEffect } from 'react'

const useWords = (amount: number, typedText: string) => {
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

    fetchWords()
  }, [amount, typedText])

  return words
}

export default useWords

