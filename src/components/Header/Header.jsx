const Header = () => {
<<<<<<< Updated upstream
  return <div>Header</div>;
=======
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <div className={styles.linkContainer}>
          <a className={styles.linkHome} href="/">
            Top
            <span>Serra</span>
          </a>
        </div>
        <nav className={styles.navContainer}>
          <ul>
            <li>
              <a className={styles.navLinks} href="/horarios">
                Horários
              </a>
            </li>
            <li>
              <a className={styles.navLinks} href="/cadastro">
                Cadastro
              </a>
            </li>
            <li>
              <a className={styles.navLinks} href="/estoque">
                Estoque
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.linkContainer}>
          <a className={styles.linkLogin} href="/login">
            Login
          </a>
          <a className={styles.linkLogin} href="">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
>>>>>>> Stashed changes
};

export default Header;
