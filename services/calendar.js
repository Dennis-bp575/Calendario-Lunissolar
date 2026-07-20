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
  const frasedodia = getDailyReflection(days,lunarDay);
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

export function getDailyReflection(daysSinceStart, lunarDay) {
    // 1. Calcula o mesmo índice de 0 a 234 que você já usa no seu motor
    const monthIndex = Math.floor(daysSinceStart / SYNODIC_MONTH) % 235;
    
    // Converte para o número do mês absoluto (1 a 235) para bater com o array primavera235
    const absoluteMonth = monthIndex + 1; 
  
    // 2. Descobre qual é a Primavera atual (0 a 18)
    const primaveraIdx = primavera235.findIndex(fimMes => absoluteMonth <= fimMes);
    if (primaveraIdx === -1) return null;
  
    // 3. Descobre o mês absoluto onde a Primavera atual começou
    const mesInicioPrimavera = primaveraIdx === 0 ? 1 : primavera235[primaveraIdx - 1] + 1;
  
    // 4. Descobre o número arquetípico do mês (1 a 12, ou 13 se for o mês bissexto)
    const archetypeNumber = (absoluteMonth - mesInicioPrimavera) + 1;
    console.log("archetypeNumber", archetypeNumber)
    // 5. Mapeia a Fase da Lua pelo dia (1 a 28) com a sintaxe correta do JS
    let phase;
    if (lunarDay === 1) phase = "Nova";
    else if (lunarDay >= 2 && lunarDay <= 14) phase = "Crescente";
    else if (lunarDay === 15) phase = "Cheia";
    else if (lunarDay >= 16 && lunarDay <= 28) phase = "Minguante";
    else return null;
    console.log("phase", phase)
    // 6. Busca os dados na matriz estática de 13 meses
    const monthData = culturalReflections[archetypeNumber];
    if (!monthData) return null;
    
    const phaseReflections = monthData[phase];
    if (!phaseReflections || phaseReflections.length === 0) return null;
    console.log("phaseReflections", phaseReflections)
    // 7. Sorteio diário determinístico (muda o card todo dia, fixo no refresh)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log("dayOfYear", dayOfYear)
    const index = dayOfYear % phaseReflections.length;
    console.log("phaseReflections", phaseReflections[index])
    console.log("index", index)
    return phaseReflections[index];
}
