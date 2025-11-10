import React from "react";
import styles from "./Card.module.css";

const Card = ({ nome, descricao, categoria, preco }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.nome}>{nome}</h2>
      <p className={styles.descricao}>{descricao}</p>
      <p className={styles.categoria}>
        <strong>Categoria:</strong> {categoria}
      </p>
      <p className={styles.preco}>
        <strong>Preço:</strong> R$ {preco.toFixed(2)}
      </p>
    </div>
  );
};

export default Card;
