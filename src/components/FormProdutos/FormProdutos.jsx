import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import * as styles from "./FormProdutos.module.css";

const validationFormProdutos = yup
  .object({
    title: yup.string().required("O título é obrigatório"),
    price: yup
      .number()
      .typeError("Informe um valor numérico")
      .positive("O preço deve ser positivo")
      .required("O preço é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
    category: yup.string().required("A categoria é obrigatória"),
    image: yup
      .string()
      .url("Deve ser uma URL válida")
      .required("A URL da imagem é obrigatória"),
  })
  .required();

const FormProdutos = ({ setProducts }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationFormProdutos) });

  const addProduct = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        data
      );

      const newProduct = response.data;

      setProducts((produtosAtuais) => [...produtosAtuais, newProduct]);

      console.log("Produto (simulado) enviado com sucesso!", newProduct);
      reset();
    } catch (error) {
      console.error("Erro na requisição!", error);
      alert("Falha ao cadastrar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(addProduct)}
        >
          <h1>Cadastro de Produtos</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="title">Nome do produto:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Nome do produto"
              {...register("title")}
            />
            <p>{errors.title?.message}</p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="price">Preço do produto:</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              placeholder="Ex: 99.90"
              {...register("price")}
            />
            <p>{errors.price?.message}</p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              {...register("description")}
              placeholder="Detalhes do produto..."
            />
            <span>{errors.description?.message}</span>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="category">Categoria do produto:</label>
            <select id="category" name="category" {...register("category")}>
              <option value="">Selecione a categoria...</option>
              <option value="jewelery">Joias</option>
              <option value="men's clothing">Roupas Masculinas</option>
              <option value="women's clothing">Roupas Femininas</option>
            </select>
            <p>{errors.category?.message}</p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="image">URL da imagem:</label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder=""
              {...register("image")}
            ></input>
            <span>{errors.image?.message}</span>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={styles.btnSubmit}
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Cadastrar Produto"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default FormProdutos;
