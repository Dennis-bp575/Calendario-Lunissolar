// services/calendar.js
import { poeticMonths, primavera235 } from '../data/months.js'; // Adicionado .js no final
import { getPeriodName } from '../data/periods.js';           // Adicionado .js no final

export const CYCLE_START = new Date('2000-01-06');
export const SYNODIC_MONTH = 29.530588;

export const monthColors = {
  'O Alvorecer': '#F9D976',
  'O Florescer': '#52B788',
  'O Esverdear': '#40916C',
  'O Irradiar': '#FFD166',
  'O Amadurecer': '#F4A261',
  'O Acolher': '#E9C46A',
  'O Entardecer': '#D97706',
  'O Silenciar': '#92400E',
  'O Despir': '#78350F',
  'O Recolher': '#2563EB',
  'O Adormecer': '#1E3A8A',
  'O Gestar': '#0F172A',
  'O Flutuar': '#7C3AED',
};

// Removemos as tipagens dos parâmetros das funções abaixo (ex: date, daysSinceStart, lunarDay)
export function getLunisolarDate(date) {
  const days = getDaysSinceCycleStart(date);
  const poeticMonth = getPoeticMonth(days);
  const lunarDay = getRealLunarDay(days);
  const period = getPeriodName(lunarDay);
  const primavera = getPrimavera(days);
  const cycle = getCycle(days);
  const frasedodia = getReflection();
  const estacaoAtual = getCurrentSeason(date);
  const moon = getMoonEmoji(lunarDay);

  return { lunarDay, poeticMonth, period, primavera, cycle, estacaoAtual, frasedodia, moon };
}

export function getMoonEmoji(lunarDay) {
  if (lunarDay <= 2) return '🌑';
  if (lunarDay <= 7) return '🌒';
  if (lunarDay <= 10) return '🌓';
  if (lunarDay <= 14) return '🌔';
  if (lunarDay === 15) return '🌕';
  if (lunarDay <= 20) return '🌖';
  if (lunarDay <= 24) return '🌗';
  return '🌘';
}

export function getDaysSinceCycleStart(date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const difference = date.getTime() - CYCLE_START.getTime();
  return Math.floor(difference / millisecondsPerDay);
}

export function getPoeticMonth(daysSinceStart) {
  const monthIndex = Math.floor(daysSinceStart / SYNODIC_MONTH) % 235;
  return poeticMonths[monthIndex];
}

export function getPrimavera(daysSinceStart) {
  const yearsSinceStart = Math.floor(daysSinceStart / SYNODIC_MONTH) % 235;
  return getPrimaveraLuni(yearsSinceStart);
}

export function getCycle(daysSinceStart) {
  const yearsSinceStart = Math.floor(daysSinceStart / 360);
  return Math.floor(yearsSinceStart / 19);
}

export function getRealLunarAge(daysSinceStart) {
  return daysSinceStart % SYNODIC_MONTH;
}

export function getRealLunarDay(daysSinceStart) {
  const lunarAge = getRealLunarAge(daysSinceStart);
  return Math.floor(lunarAge) + 1;
}

export function getPrimaveraLuni(monthNumber) {
  const yearIndex = primavera235.findIndex((endMonth) => monthNumber <= endMonth);
  return yearIndex + 1;
}

export function getCurrentSeason(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) return 'Verão';
  if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) return 'Outono';
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 22)) return 'Inverno';
  return 'Primavera';
}

export function getReflection() { 
  return `O horizonte escurece lentamente, mas nada do que cumpriu sua função se perde.`; 
}
