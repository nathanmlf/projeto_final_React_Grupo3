import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";
import Header from "../Header/Header";
import { FiltroEstoque } from "../FiltroEstoque/FiltroEstoque";

const Card = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProdutos(response.data);
        setProdutosFiltrados(response.data); 
      })
      .catch(() => {
        console.log("Erro na requisição");
      });
  }, []);

  const handleFiltrar = (produtosFiltrados) => {
    setProdutosFiltrados(produtosFiltrados);
  };

  return (
    <div>
      <Header/>
      <FiltroEstoque produtos={produtos} onFiltrar={handleFiltrar} />
      <div className={styles.container}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div className={styles.card} key={produto.id}>
              <h2 className={styles.nome}>{produto.title}</h2>
              <p className={styles.descricao}>{produto.description}</p>
              <p className={styles.categoria}>
                <strong>Categoria:</strong> {produto.category}
              </p>
              <p className={styles.preco}>
                <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default Card;