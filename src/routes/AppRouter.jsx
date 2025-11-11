import Home from "../screens/Home/Home.jsx";
import Login from "../screens/Login/Login.jsx";
import Estoque from "../screens/Estoque/Estoque.jsx";
import Horarios from "../screens/Horarios/Horarios.jsx";
import Cadastro from "../screens/Cadastro/Cadastro.jsx";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/estoque"
          element={
            <ProtectedRoute requiredRole="admin">
              <Estoque />
            </ProtectedRoute>
          }
        />
        <Route
          path="/horarios"
          element={
            <ProtectedRoute requiredRole="admin">
              <Horarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <ProtectedRoute requiredRole="admin">
              <Cadastro />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;