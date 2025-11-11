import { useEffect, useState } from "react";
import styles from "./Estoque.module.css";
import formStyles from "./FormEdicao.module.css";
import axios from "axios";
import Header from "../../components/Header/Header";
import { FiltroEstoque } from "../../components/FiltroEstoque/FiltroEstoque";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTrash } from "react-icons/fa";

const validacaoFormProdutos = yup
  .object({
    title: yup.string().required("O título é obrigatório"),
    price: yup
      .number()
      .typeError("Informe um valor numérico")
      .positive("O preço deve ser positivo")
      .required("O preço é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
    category: yup.string().required("A categoria é obrigatória"),
    image: yup.string().url("Deve ser uma URL válida"),
  })
  .required();

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validacaoFormProdutos),
  });

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

  useEffect(() => {
    if (produtoEmEdicao) {
      reset(produtoEmEdicao);
    }
  }, [produtoEmEdicao, reset]);

  const handleFiltrar = (produtosFiltrados) => {
    setProdutosFiltrados(produtosFiltrados);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    const produtosAnteriores = produtos;
    const produtosFiltradosAnteriores = produtosFiltrados;

    const novosProdutos = produtos.filter((produto) => produto.id !== id);
    const novosProdutosFiltrados = produtosFiltrados.filter(
      (produto) => produto.id !== id
    );
    
    setProdutos(novosProdutos);
    setProdutosFiltrados(novosProdutosFiltrados);
    setExcluindo(id);

    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      console.log("Produto excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      
      setProdutos(produtosAnteriores);
      setProdutosFiltrados(produtosFiltradosAnteriores);
      
      alert("Erro ao excluir produto. Tente novamente.");
    } finally {
      setExcluindo(null);
    }
  };

  const handleSalvarEdicao = async (data) => {
    setLoading(true);
    console.log("Enviando PUT para o ID:", produtoEmEdicao.id, data);

    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${produtoEmEdicao.id}`,
        data
      );

      const produtoAtualizado = { ...produtoEmEdicao, ...response.data };

      const atualizarLista = (lista) =>
        lista.map((p) =>
          p.id === produtoAtualizado.id ? produtoAtualizado : p
        );

      setProdutos(atualizarLista);
      setProdutosFiltrados(atualizarLista);

      alert("Produto atualizado (simulado) com sucesso!");
      setProdutoEmEdicao(null);
    } catch (error) {
      console.error("Erro na requisição PUT!", error);
      alert("Falha ao atualizar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <FiltroEstoque produtos={produtos} onFiltrar={handleFiltrar} />
      {produtoEmEdicao && (
        <div className={formStyles.overlay}>
          <form
            className={formStyles.formContainer}
            onSubmit={handleSubmit(handleSalvarEdicao)}
          >
            <h1>Editar Produto (ID: {produtoEmEdicao.id})</h1>

            <div className={formStyles.inputContainer}>
              <label htmlFor="title">Nome do produto:</label>
              <input type="text" id="title" {...register("title")} />
              <p>{errors.title?.message}</p>
            </div>

            <div className={formStyles.inputContainer}>
              <label htmlFor="price">Preço do produto:</label>
              <input
                type="number"
                step="0.01"
                id="price"
                {...register("price")}
              />
              <p>{errors.price?.message}</p>
            </div>

            <div className={formStyles.inputContainer}>
              <label htmlFor="description">Descrição:</label>
              <textarea id="description" {...register("description")} />
              <span>{errors.description?.message}</span>
            </div>

            <div className={formStyles.inputContainer}>
              <label htmlFor="category">Categoria:</label>
              <select id="category" {...register("category")}>
                <option value="jewelery">Joias</option>
                <option value="men's clothing">Roupas Masculinas</option>
                <option value="women's clothing">Roupas Femininas</option>
                <option value="electronics">Eletrônicos</option>
              </select>
              <p>{errors.category?.message}</p>
            </div>

            <div className={formStyles.btnContainer}>
              <button
                type="button"
                className={formStyles.btnCancel}
                onClick={() => setProdutoEmEdicao(null)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className={formStyles.btnSubmit}
                type="submit"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.container}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div className={styles.card} key={produto.id}>
              <div className={styles.cardHeader}>
                <h2 className={styles.nome}>{produto.title}</h2>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleExcluir(produto.id)}
                  disabled={excluindo === produto.id}
                  aria-label="Excluir produto"
                  title="Excluir produto"
                >
                  {excluindo === produto.id ? (
                    "Excluindo..."
                  ) : (
                    <FaTrash size={18} />
                  )}
                </button>
              </div>
              <p className={styles.descricao}>{produto.description}</p>
              <p className={styles.categoria}>
                <strong>Categoria:</strong> {produto.category}
              </p>
              <p className={styles.preco}>
                <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
              </p>
              <button
                className={styles.botaoEditar}
                onClick={() => setProdutoEmEdicao(produto)}
              >
                Editar
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default Estoque;