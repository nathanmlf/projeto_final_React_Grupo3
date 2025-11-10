import { useState } from "react";
import styles from "./FiltroEstoque.module.css";

export function FiltroEstoque({ produtos, onFiltrar }) {
  const [pesquisa, setPesquisa] = useState("");

  const handlePesquisa = (e) => {
    const valor = e.target.value;
    setPesquisa(valor);

    const produtosFiltrados =
      valor === ""
        ? produtos
        : produtos.filter((produto) => {
            const pesquisaLower = valor.toLowerCase();
            return (
              produto.descricao.toLowerCase().includes(pesquisaLower) ||
              produto.id.toString().includes(pesquisaLower)
            );
          });

    onFiltrar(produtosFiltrados);
  };

  return (
    <div className={styles["filtro-container"]}>
      <input
        type="text"
        placeholder="Pesquisar por descrição ou ID..."
        value={pesquisa}
        onChange={handlePesquisa}
        className={styles["filtro-input"]}
      />
    </div>
  );
}
