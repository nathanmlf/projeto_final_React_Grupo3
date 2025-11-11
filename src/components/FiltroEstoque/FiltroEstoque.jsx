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
            const descricao = produto.descricao || produto.description || "";
            const titulo = produto.title || "";
            const categoria = produto.category || "";
            const id = produto.id?.toString() || "";
            
            return (
              descricao.toLowerCase().includes(pesquisaLower) ||
              titulo.toLowerCase().includes(pesquisaLower) ||
              categoria.toLowerCase().includes(pesquisaLower) ||
              id.includes(pesquisaLower)
            );
          });

    onFiltrar(produtosFiltrados);
  };

  return (
    <div className={styles["filtro-container"]}>
      <input
        type="text"
        placeholder="Pesquisar por título, descrição, categoria ou ID..."
        value={pesquisa}
        onChange={handlePesquisa}
        className={styles["filtro-input"]}
      />
    </div>
  );
}