// app.js
import { getLunisolarDate, monthColors } from './services/calendar.js';

const dadosAtuais = getLunisolarDate(new Date());

window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('calendar-card');
  const moonDisplay = document.getElementById('moon-display');
  const poeticMonth = document.getElementById('poetic-month');
  const lunarDay = document.getElementById('lunar-day');
  const periodDisplay = document.getElementById('period-display');
  const primaveraDisplay = document.getElementById('primavera-display');
  const cycleDisplay = document.getElementById('cycle-display');
  const alignmentDisplay = document.getElementById('alignment-display');
  const solarSeason = document.getElementById('solar-season');
  const reflectionText = document.getElementById('reflection-text');

  if (card) {
    // JS puro busca a propriedade direto no objeto sem precisar validar o tipo antes
    const corDoMes = monthColors[dadosAtuais.poeticMonth] || '#475569';
    card.style.borderTop = `6px solid ${corDoMes}`;
  }

  if (moonDisplay) moonDisplay.innerText = dadosAtuais.moon;
  if (poeticMonth) poeticMonth.innerText = dadosAtuais.poeticMonth;
  if (lunarDay) lunarDay.innerText = `Hoje é o ${dadosAtuais.lunarDay}º dia lunar`;
  if (periodDisplay) periodDisplay.innerText = dadosAtuais.period;
  if (primaveraDisplay) primaveraDisplay.innerText = `Estamos na ${dadosAtuais.primavera}ª Primavera`;
  if (cycleDisplay) cycleDisplay.innerText = `Ciclo ${dadosAtuais.cycle}`;
  
  if (alignmentDisplay) {
    alignmentDisplay.innerText = `Restando ${19 - dadosAtuais.primavera} primaveras para o alinhamento e o início de um novo ciclo.`;
  }
  
  if (solarSeason) solarSeason.innerText = dadosAtuais.estacaoAtual;
  if (reflectionText) reflectionText.innerText = dadosAtuais.frasedodia;
});

