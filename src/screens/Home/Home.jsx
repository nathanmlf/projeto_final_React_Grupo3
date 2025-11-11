import Header from "../../components/Header/Header.jsx";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Bem-vindo ao Sistema de Estoque</h1>
        <h1 className={styles.logo}>📦TopSerra📦</h1>
        <p className={styles.subtitle}>
          Organize, controle e acompanhe seus produtos com facilidade.
        </p>
      </main>
    </div>
  );
}

export default Home;
