import Home from "../screens/Home/Home.jsx";
import Login from "../screens/Login/Login.jsx";
import Estoque from "../screens/Estoque/Estoque.jsx";
import Horarios from "../screens/Horarios/Horarios.jsx";
import Cadastro from "../screens/Cadastro/Cadastro.jsx";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login/:id" element={<Login />}></Route>
        <Route path="/estoque" element={<Estoque />}></Route>
        <Route path="/horarios" element={<Horarios />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
