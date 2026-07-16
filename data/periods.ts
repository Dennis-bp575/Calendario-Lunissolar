export function getPeriodName(lunarDay: number) {
  if (lunarDay <= 7) {
    return 'O Sopro'
  }

  if (lunarDay <= 14) {
    return 'O Crescer'
  }

  if (lunarDay === 15) {
    return 'A Plenitude'
  }

  if (lunarDay <= 22) {
    return 'O Declinar'
  }

  if (lunarDay <= 29) {
    return 'O Retorno'
  }

  return 'O Véu'
}
