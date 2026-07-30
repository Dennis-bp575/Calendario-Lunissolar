// app.js
import { getLunisolarDate, monthColors, getDailyReflection} from './services/calendar.js';
const hoje = new Date();
const dadosAtuais = getLunisolarDate(hoje); 

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
  const reflectionOrigin = document.getElementById('reflection-origin');

  if (card) {
    const corDoMes = monthColors[dadosAtuais.poeticMonth] || '#475569';
    card.style.borderTop = `6px solid ${corDoMes}`;
  }

  // Adicionamos 'relative z-10' (para vir para a frente) e 'overflow-visible' (para o brilho não ser cortado)
  if (moonDisplay) moonDisplay.className = "my-2 flex justify-center items-center animate-float relative z-10 overflow-visible";
  if (moonDisplay) moonDisplay.innerHTML = `<img id="imagem-lua" src="${dadosAtuais.moon}" alt="Lua" class="w-32 h-32 rounded-full object-cover transition-all duration-700 ease-out transform" />;`;

  if (poeticMonth) poeticMonth.innerText = dadosAtuais.poeticMonth;
  if (lunarDay) lunarDay.innerText = `Hoje é o ${dadosAtuais.lunarDay}º dia lunar`;
  if (periodDisplay) periodDisplay.innerText = dadosAtuais.period;
  if (primaveraDisplay) primaveraDisplay.innerText = `Estamos na ${dadosAtuais.primavera}ª Primavera`;
  if (cycleDisplay) cycleDisplay.innerText = `Ciclo ${dadosAtuais.cycle}`;
  
  if (alignmentDisplay) {
    alignmentDisplay.innerText = `Restando ${19 - dadosAtuais.primavera} primaveras para o alinhamento e o início de um novo ciclo.`;
  }
  
  if (solarSeason) solarSeason.innerText = dadosAtuais.estacaoAtual;
  if (reflectionText) reflectionText.innerText = dadosAtuais.frasedoDia.text;
  if (reflectionOrigin) reflectionOrigin.innerText = dadosAtuais.frasedoDia.origin;
  window.diaLunarAtual = dadosAtuais.lunarDay;
  
});
// Função para disparar o giro quando o carregamento sumir
window.iniciarAnimacaoDaLua = function() {
  const imgLua = document.getElementById('imagem-lua');
  if (imgLua) {
    imgLua.style.transform = 'rotate(0deg)';
  }
}

