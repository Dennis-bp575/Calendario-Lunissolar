// app.js
import { getLunisolarDate, monthColors, getDailyReflection} from './services/calendar.js';

const dadosAtuais = getLunisolarDate(new Date());
// No seu app.js, onde os dados são calculados:
console.log("Conteúdo de frasedoDia:", dadosAtuais.frasedoDia);

window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('calendar-card');
  const moonDisplay = document.getElementById('moon-display');
  const moonImg = document.getElementById('moon-img');
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

  if (moonDisplay) moonDisplay.className = "my-2 flex justify-center items-center animate-float drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]";
  if (moonDisplay) moonDisplay.innerHTML = `<img src="${dadosAtuais.moon}" alt="Lua" class="w-24 h-24 rounded-full object-cover" />`
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

