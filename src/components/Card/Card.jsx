import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";
import Header from "../Header/Header";

const Card = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch(() => {
        console.log("Erro na requisição");
      });
  }, []);

  return (
    <div>
      <Header/>
    <div className={styles.container}>
      {produtos.map((produto) => (
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
      ))}
    </div>
    </div>
  );
};

export default Card;
