type ProgressData = {
  [key: string]: number
}

const PROGRESS_KEY = "deutschLernProgress"

export const saveProgress = (category: string, score: number) => {
  const progressData = getAllProgress()
  progressData[category] = score
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData))
}

export const getProgress = (category: string): number => {
  const progressData = getAllProgress()
  return progressData[category] || 0
}

export const getAllProgress = (): ProgressData => {
  const storedProgress = localStorage.getItem(PROGRESS_KEY)
  return storedProgress ? JSON.parse(storedProgress) : {}
}

