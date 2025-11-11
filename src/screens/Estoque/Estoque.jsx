
import styles from "./Estoque.module.css";
import { FiltroEstoque } from "../../components/FiltroEstoque/FiltroEstoque";
import { useState } from "react";
import Header from "../../components/Header/Header";

// Definindo o componente Estoque
const Estoque = () => {
  // Criando um array de produtos
  const [produtos] = useState([
    { id: 1, descricao: "Jóias", quantidade: 20, imagemUrl: "https://img.freepik.com/fotos-premium/joias-na-vitrine-da-loja_756262-8079.jpg" },
    { id: 2, descricao: "Roupas Masculinas", quantidade: 32, imagemUrl: "https://i.pinimg.com/originals/46/34/e2/4634e2de80fa2a26c442130af989eb8f.jpg" },
    { id: 3, descricao: "Roupas Femininas", quantidade: 18, imagemUrl: "https://i.pinimg.com/originals/c1/ed/88/c1ed880dd75ab3a0bf74910edaf79a9c.jpg" },
    { id: 4, descricao: "Produto Baixo Estoque", quantidade: 5, imagemUrl: "https://www.grupocpcon.com/wp-content/uploads/2024/01/empresas-que-fazem-balanco-de-estoque-768x439.jpg" },
  ]);

  
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);

  const handleFiltrar = (produtosFiltrados) => {
    setProdutosFiltrados(produtosFiltrados);
  };


  return (
    <div>
    <Header/>
    <div className={styles['estoque-container']}>
      <h1>Estoque de Produtos</h1>
      
      <FiltroEstoque produtos={produtos} onFiltrar={handleFiltrar} />
      
      <table className={styles['estoque-tabela']}>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>ID</th>
            <th>Descrição</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <tr key={produto.id}>
                <td>
                  <img
                    src={produto.imagemUrl}
                    alt={produto.descricao}
                    className={styles['produto-imagem']}
                  />
                </td>
                <td>{produto.id}</td>
                <td>{produto.descricao}</td>
                <td
                  className={
                    produto.quantidade <= 10
                      ? styles['quantidade-baixa']
                      : styles['quantidade-normal']
                  }
                >
                  {produto.quantidade}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum produto encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    </div>
  );
};

export default Estoque;
