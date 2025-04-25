import { useCallback } from 'react'

const useSound = (audioId: string) => {
  const play = useCallback(() => {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    if (audioElement) {
      audioElement.currentTime = 0
      audioElement.play()
    } else {
      console.warn(`Audio element with id "${audioId}" not found.`)
    }
  }, [audioId])

  return { play }
}

export default useSound
