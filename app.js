// ==========================================
// 1. MOTOR DO CALENDÁRIO (Simulação dos seus dados)
// ==========================================
function getLunisolarDate() {
    // Aqui entra a sua lógica real de 06/01/2000 que você já desenvolveu
    return {
        lunarDay: 28,
        poeticMonth: "O Entardecer",
        period: "O Retorno",
        primavera: 8,
        cycle: 1,
        solarSeason: "Inverno"
    };
}

// ==========================================
// 2. CONFIGURAÇÃO DA IA (Mantenha localmente!)
// ==========================================
// Para testar, gere uma chave gratuita no Google AI Studio (Gemini)
const GEMINI_API_KEY = "SUA_API_KEY_AQUI_APENAS_LOCAL"; 
const API_URL = `https://googleapis.com{GEMINI_API_KEY}`;

// ==========================================
// 3. LÓGICA DE PROMPT ENGINEERING & FETCH
// ==========================================
async function chamarIA(dadosCalendario) {
    const promptSistema = `Você é o Oráculo do Tempo Natural, um filósofo e poeta ancestral. 
Sua missão é gerar uma "Reflexão do Dia" curta, profunda e contemplativa baseada estritamente nos dados fornecidos do calendário lunissolar.
Regras: NUNCA preveja o futuro. Foque no presente e na ciclicidade. Use linguagem orgânica e poética. Máximo de 2 frases.`;

    const promptUsuario = `Dados atuais do tempo: 
    Dia Lunar: ${dadosCalendario.lunarDay}, 
    Mês Poético: ${dadosCalendario.poeticMonth}, 
    Período: ${dadosCalendario.period}, 
    Estação Solar: ${dadosCalendario.solarSeason}. 
    Gere a reflexão poética do dia.`;

    // Montando o JSON no formato estrito que o Gemini pede
    const corpoRequisicao = {
        contents: [{
            parts: [{ text: `${promptSistema}\n\nEntrada do Usuário: ${promptUsuario}` }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150
        }
    };

    // Executando o fetch com async/await
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpoRequisicao)
    });

    if (!resposta.ok) throw new Error("Erro na comunicação com o Oráculo.");

    const json = await resposta.json();
    // Extraindo o texto de dentro da estrutura JSON do Gemini
    return json.candidates[0].content.parts[0].text.trim();
}

// ==========================================
// 4. ESTRATÉGIA DE CACHE LOCAL (localStorage)
// ==========================================
async function obterReflexaoComCache(dadosCalendario) {
    // Criamos uma chave única para o dia combinando as variáveis mecânicas
    const chaveDoDia = `reflexao_${dadosCalendario.cycle}_${dadosCalendario.primavera}_${dadosCalendario.poeticMonth}_${dadosCalendario.lunarDay}`;
    
    // Tentamos buscar do cache local do navegador
    const reflexaoSalva = localStorage.getItem(chaveDoDia);
    
    if (reflexaoSalva) {
        console.log("Obtido do Cache Local (Economizou API)");
        return reflexaoSalva;
    }

    // Se não tiver no cache, chama a API
    try {
        const novaReflexao = await chamarIA(dadosCalendario);
        // Salva no cache do navegador para os próximos acessos do mesmo dia
        localStorage.setItem(chaveDoDia, novaReflexao);
        return novaReflexao;
    } catch (erro) {
        console.error(erro);
        return "O tempo flui invisível. Contemple a transição sob o manto do silêncio atual.";
    }
}

// ==========================================
// 5. INICIALIZAÇÃO DA INTERFACE (DOM)
// ==========================================
async function iniciarApp() {
    const dados = getLunisolarDate();

    // Injeta os dados mecânicos no HTML
    document.getElementById("data-poetica").innerText = `Hoje é o ${dados.lunarDay}º dia lunar de ${dados.poeticMonth}`;
    document.getElementById("periodo-atual").innerText = `Vivemos o período de ${dados.period}`;
    document.getElementById("estacao-solar").innerText = dados.solarSeason;
    document.getElementById("primavera-atual").innerText = dados.primavera;
    document.getElementById("ciclo-atual").innerText = dados.cycle;
    document.getElementById("alinhamento-restante").innerText = `${19 - dados.primavera} Primaveras`;

    // Gerencia a IA e o Cache
    const elementoTextoIA = document.getElementById("texto-reflexao");
    const reflexaoFinal = await obterReflexaoComCache(dados);
    elementoTextoIA.innerText = reflexaoFinal;
}

// Roda o app assim que a página carrega
window.addEventListener("DOMContentLoaded", iniciarApp);
