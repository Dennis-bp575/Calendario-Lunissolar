// app.ts
import { getLunisolarDate, monthColors } from './services/calendar';

// 1. Executa o seu motor mecânico pegando a data atual
const dados = getLunisolarDate(new Date());

// 2. Aguarda o HTML carregar completamente na tela
window.addEventListener('DOMContentLoaded', () => {
  
  // Captura os elementos do HTML pelos IDs que criamos
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

  // 3. Injeta as informações dinâmicas se os elementos existirem na tela
  if (card) {
    // Aplica a sua borda superior colorida dinâmica usando o seu objeto monthColors
    const corDoMes = monthColors[dados.poeticMonth] || '#475569';
    card.style.borderTop = `6px solid ${corDoMes}`;
  }

  if (moonDisplay) moonDisplay.innerText = dados.moon;
  if (poeticMonth) poeticMonth.innerText = dados.poeticMonth;
  if (lunarDay) lunarDay.innerText = `Hoje é o ${dados.lunarDay}º dia lunar`;
  if (periodDisplay) periodDisplay.innerText = dados.period;
  if (primaveraDisplay) primaveraDisplay.innerText = `Estamos na ${dados.primavera}ª Primavera`;
  if (cycleDisplay) cycleDisplay.innerText = `Ciclo ${dados.cycle}`;
  
  if (alignmentDisplay) {
    alignmentDisplay.innerText = `Restando ${19 - dados.primavera} primaveras para o alinhamento e o início de um novo ciclo.`;
  }
  
  if (solarSeason) solarSeason.innerText = dados.estacaoAtual;
  if (reflectionText) reflectionText.innerText = dados.frasedodia;
});

