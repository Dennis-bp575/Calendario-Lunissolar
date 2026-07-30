// app.js
import { getLunisolarDate, monthColors, getDailyReflection} from './services/calendar.js';
const dadosAtuais = getLunisolarDate(); 

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

  // 1. Ajustamos a caixa de fora (tiramos o drop-shadow fixo daqui)
  if (moonDisplay) moonDisplay.className = "my-2 flex justify-center items-center animate-float";
  // 2. Colocamos a foto dentro da caixa com as novas classes do Tailwind (transition, duration, ease-out, transform)
  if (moonDisplay) moonDisplay.innerHTML = `<img id="imagem-lua" src="${dadosAtuais.moon}" alt="Lua" class="w-24 h-24 rounded-full object-cover transition-all duration-700 ease-out transform" />`;

  const imgLua = document.getElementById('imagem-lua');
  
  if (imgLua && moonDisplay) {
    const dia = dadosAtuais.lunarDay;
    const intensidade = 1 - (Math.abs(dia - 14) / 14);
    
    const ganhoBrilho = 100 + (intensidade * 60); 
    imgLua.style.filter = `brightness(${ganhoBrilho}%)`;
    
    const raioDesfoque = intensidade * 35;
    const opacidadeAura = intensidade * 0.6;
    moonDisplay.style.filter = `drop-shadow(0 0 ${raioDesfoque}px rgba(255, 255, 255, ${opacidadeAura}))`;

    imgLua.style.transform = 'rotate(-90deg)';

    setTimeout(() => {
      imgLua.style.transform = 'rotate(0deg)';
    }, 50);
  }



  
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
  
});

