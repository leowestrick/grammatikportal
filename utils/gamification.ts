let points = 0
const badges: { [key: string]: boolean } = {}

export const addPoints = (amount: number) => {
  points += amount
  // Here you might want to check if the user has reached a new level
  checkLevelUp()
}

export const getPoints = () => points

export const unlockBadge = (badgeId: string) => {
  badges[badgeId] = true
}

export const getBadges = () => badges

const checkLevelUp = () => {
  const level = Math.floor(points / 100) + 1
  // Here you might want to trigger a level up animation or notification
  console.log(`Current level: ${level}`)
}

// Initialize with some badges
const initialBadges = [
  'verb-konjugation-meister',
  'perfekte-konjugation',
  'praepositionen-profi',
  'satzbau-genie',
  'rechtschreib-champion'
]

initialBadges.forEach(badge => {
  badges[badge] = false
})

