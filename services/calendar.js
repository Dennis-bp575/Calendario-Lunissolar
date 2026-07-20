// services/calendar.js
import { poeticMonths, primavera235 } from '../data/months.js'; // Adicionado .js no final
import { getPeriodName } from '../data/periods.js';           // Adicionado .js no final
import { culturalReflections } from '../data/reflections.js';

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
   return `services/Luas/Lua${lunarDay}.png`;
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

export function getReflectionByAbsoluteMonth(absoluteMonth, lunarDay) {
    // 1. Descobre a qual Primavera (Ano) este mês absoluto pertence (1 a 19)
    const primaveraIndex = primavera235.findIndex(fimMes => absoluteMonth <= fimMes);
    if (primaveraIndex === -1) return null; // Mês fora do limite dos 235
  
    // 2. Calcula o início do bloco da Primavera atual
    const mesInicioPrimavera = primaveraIndex === 0 ? 1 : primavera235[primaveraIndex - 1] + 1;
  
    // 3. Descobre a posição real do mês dentro do ano (1 a 12, ou 13 se for bissexto)
    const monthArchetypeNumber = (absoluteMonth - mesInicioPrimavera) + 1;
  
    // 4. Mapeia a Fase da Lua pelo dia (1 a 28) com a sintaxe correta do JS
    let phase;
    if (lunarDay === 1) phase = "Nova";
    else if (lunarDay >= 2 && lunarDay <= 14) phase = "Crescente";
    else if (lunarDay === 15) phase = "Cheia";
    else if (lunarDay >= 16 && lunarDay <= 28) phase = "Minguante";
    else return null;
  
    // 5. Busca na nossa matriz de 13 meses usando o número arquetípico e a fase
    const monthData = culturalReflections[monthArchetypeNumber];
    if (!monthData) return null;
  
    const phaseReflections = monthData[phase];
    if (!phaseReflections || phaseReflections.length === 0) return null;
  
    // 6. Sorteio determinístico diário (muda a cada dia do ano civil, fixo no refresh)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % phaseReflections.length;
  
    return phaseReflections[index];
}
