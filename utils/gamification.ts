const POINTS_KEY = "deutschLernPoints"
const BADGES_KEY = "deutschLernBadges"

export const addPoints = (amount: number) => {
  const currentPoints = getPoints()
  const newPoints = currentPoints + amount
  localStorage.setItem(POINTS_KEY, newPoints.toString())
  checkLevelUp(newPoints)
}

export const getPoints = (): number => {
  const points = localStorage.getItem(POINTS_KEY)
  return points ? Number.parseInt(points, 10) : 0
}

export const unlockBadge = (badgeId: string) => {
  const badges = getBadges()
  badges[badgeId] = true
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
}

export const getBadges = (): { [key: string]: boolean } => {
  const badges = localStorage.getItem(BADGES_KEY)
  return badges ? JSON.parse(badges) : {}
}

const checkLevelUp = (points: number) => {
  const level = Math.floor(points / 100) + 1
  console.log(`Current level: ${level}`)
}

// Initialize badges if they don't exist
const initializeBadges = () => {
  if (!localStorage.getItem(BADGES_KEY)) {
    const initialBadges = [
      "verb-konjugation-meister",
      "perfekte-konjugation",
      "praepositionen-profi",
      "satzbau-genie",
      "rechtschreib-champion",
    ]
    const badges = initialBadges.reduce(
        (acc, badge) => {
          acc[badge] = false
          return acc
        },
        {} as { [key: string]: boolean },
    )
    localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
  }
}

initializeBadges()

