import { useState } from "react";
import styles from "./Horarios.module.css";

export default function Horarios() {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  const [darkMode, setDarkMode] = useState(false);

  const [pontosFeitos, setPontosFeitos] = useState([1, 3,4,5]); 
  const totalDiasMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay(); 

  function semana(day) {
    return new Date(anoAtual, mesAtual, day).getDay();
  }

  function baterPonto() {
    const diaHoje = hoje.getDate();
    if (!pontosFeitos.includes(diaHoje)) {
      setPontosFeitos([...pontosFeitos, diaHoje]);
    }
  }

  const dias = [];
  for (let d = 1; d <= totalDiasMes; d++) {
    dias.push({
      dia: d,
      diaSemana: semana(d),
      podeTrabalhar: semana(d) !== 0, 
      bateuPonto: pontosFeitos.includes(d),
    });
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`${styles.wrapper} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.calendarContainer}>
        <h2>
          Calendário - {hoje.toLocaleString("pt-BR", { month: "long" })} {anoAtual}
        </h2>

        <div className={styles.calendarGrid}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <div key={d} className={styles.weekHeader}>{d}</div>
          ))}

          {Array(primeiroDiaSemana).fill(null).map((_, i) => (
            <div key={`e-${i}`} className={styles.empty}></div>
          ))}

          {dias.map(({ dia, podeTrabalhar, bateuPonto }) => (
            <div
              key={dia}
              className={`${styles.day} 
                         ${!podeTrabalhar ? styles.disabled : ""} 
                         ${bateuPonto ? styles.pontoBatido : ""}`}
            >
              {dia}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sidePanel}>
        <h3>Registro de Ponto</h3>
        <p>Hoje: {hoje.toLocaleDateString("pt-BR")}</p>

          <button className={styles.btnPonto} onClick={baterPonto}>Bater ponto</button>
      </div>
      <button className={styles.darkButton} onClick={toggleDarkMode}>
            {darkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}
