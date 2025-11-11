import * as styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <div className={styles.linkContainer}>
          <a className={styles.linkHome} href="">
            Top
            <span>Serra</span>
          </a>
        </div>
        <nav className={styles.navContainer}>
          <ul>
            <li>
              <a className={styles.navLinks} href="">
                Horários
              </a>
            </li>
            <li>
              <a className={styles.navLinks} href="">
                Cadastro
              </a>
            </li>
            <li>
              <a className={styles.navLinks} href="">
                Estoque
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.linkContainer}>
          <a className={styles.linkLogin} href="">
            Login
          </a>
          <a className={styles.linkLogin} href="">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;