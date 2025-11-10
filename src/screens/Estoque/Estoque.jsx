import React, { useState } from "react";
import styles from "./Estoque.module.css";


// Definindo o componente Estoque
const Estoque = () => {
 
// Criando um array de produtos
 const [produtos] = useState([
  { id: 1, descricao: "Jewelery", quantidade: 20, imagemUrl: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" },
  { id: 2, descricao: "Men's clothing", quantidade: 32, imagemUrl: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" },
  { id: 3, descricao: "Woman's clothing", quantidade: 18, imagemUrl: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" },
  { id: 4, descricao: "Produto Baixo Estoque", quantidade: 5, imagemUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
 ]);


  return (
    <div className="estoque-container">
      <h1>Estoque de Produtos</h1> // titulo da pagina
      <table className="estoque-tabela"> //  criando uma tabela
        <thead> // cabeçalho da tabela
          <tr> // linha da tabela
            <th>Imagem</th>
            <th>ID</th>
            <th>Descrição</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (  // percorrendo o array de produtos
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
                  produto.quantidade <= 10 // verificando a quantidade do produto
                    ? "quantidade baixa"
                    : "quantidade normal"
                }
              >
                {produto.quantidade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
