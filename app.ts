import { getLunisolarDate } from './services/calendar'
import './App.css'
import { monthColors } from './services/calendar'
const dados = getLunisolarDate(new Date())

function App() {

  return (
    <main>
      <div className="app">

          <div
              className="card"
              style={{
                borderTop: `6px solid ${monthColors[dados.poeticMonth]}`
              }}
            >
          
            <div className="moon">
              {dados.moon}
            </div>

            <h1 className="month">
              {dados.poeticMonth}
            </h1>

            <p>
              Hoje é o {dados.lunarDay}º dia lunar
            </p>

            <p>
              {dados.period}
            </p>

            <p>
              Estamos na {dados.primavera}ª Primavera
            </p>

            <p>
              Ciclo {dados.cycle} 
            </p>

            <p>
            Restando {19 - dados.primavera} primaveras para o alinhamento e o início de um novo ciclo.
            </p>

            <h3>☀️ Estação Solar</h3>

            <p>
              {dados.estacaoAtual}
            </p>

            <div className="reflection">
                <h3>✨ Reflexão</h3>

                <p>
                  {dados.frasedodia}
                </p>
            </div>

          </div>
        
      </div>

    </main>
  )
}

export default App
