export function getPeriodName(lunarDay) {
  if (lunarDay === 1) {
    return 'Nova'
  }
  if (lunarDay >= 2 && lunarDay <= 14)  {
    return 'Crescente'
  }
  if (lunarDay === 15) {
    return 'Cheia'
  }
  if (lunarDay >= 16 && lunarDay <= 28) {
    return 'Minguante'
  }
}
