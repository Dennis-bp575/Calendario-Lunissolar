// app.ts
import { getLunisolarDate, monthColors } from './services/calendar';

// Executa o seu motor passando a data exata de hoje
const dadosAtuais = getLunisolarDate(new Date());

window.addEventListener('DOMContentLoaded', () => {
  // Pega os elementos da nossa estrutura HTML
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

  // Injeta a cor dinâmica na borda superior do seu Card baseada no mês poético atual
  if (card) {
    // Busca a cor correspondente no seu objeto monthColors
    const corDoMes = monthColors[dadosAtuais.poeticMonth as keyof typeof monthColors] || '#475569';
    card.style.borderTop = `6px solid ${corDoMes}`;
  }

  // Alimenta o HTML com as funções matemáticas puras que você criou
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

