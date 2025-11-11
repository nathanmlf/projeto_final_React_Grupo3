import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import DarkModeButton from "./components/Contraste";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <DarkModeButton /> 
    </BrowserRouter>
  );
};

export default App;
