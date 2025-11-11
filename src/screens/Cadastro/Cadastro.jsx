import { useState } from "react";
import ListaProdutos from "../../components/ListaProdutos/ListaProdutos";
import styles from "./Cadastro.module.css";
import FormProdutos from "../../components/FormProdutos/FormProdutos.jsx";
import Header from "../../components/Header/Header.jsx";

const Cadastro = () => {
  const [products, setProducts] = useState([]);
  return (
    <>
      <Header />
      <div className={styles.paginaContainer}>
        <div className={styles.formContainer}>
          <FormProdutos setProducts={setProducts} />
        </div>
        <div className={styles.cardsContainer}>
          <ListaProdutos products={products} />
        </div>
      </div>
    </>
  );
};

export default Cadastro;
