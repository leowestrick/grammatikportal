type ProgressData = {
  [key: string]: number;
};

export const saveProgress = (category: string, score: number) => {
  const storedProgress = localStorage.getItem('deutschLernProgress');
  const progressData: ProgressData = storedProgress ? JSON.parse(storedProgress) : {};
  progressData[category] = score;
  localStorage.setItem('deutschLernProgress', JSON.stringify(progressData));
};

export const getProgress = (category: string): number => {
  const storedProgress = localStorage.getItem('deutschLernProgress');
  if (storedProgress) {
    const progressData: ProgressData = JSON.parse(storedProgress);
    return progressData[category] || 0;
  }
  return 0;
};

export const getAllProgress = (): ProgressData => {
  const storedProgress = localStorage.getItem('deutschLernProgress');
  return storedProgress ? JSON.parse(storedProgress) : {};
};

