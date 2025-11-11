import styles from "./ListaProdutos.module.css";

const ListaProdutos = ({ products }) => {
  return (
    <div>
      <div className={styles.container}>
        {products.map((produto) => (
          <div className={styles.card} key={produto.id}>
            <div className={styles.imageContainer}>
              <img
                src={produto.image}
                alt={produto.title}
                className={styles.productImage}
              />
            </div>
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

export default ListaProdutos;
