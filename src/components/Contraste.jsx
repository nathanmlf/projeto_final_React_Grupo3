import { useState } from "react";
import "./Contraste.css";

export default function Contraste() {
  const [dark, setDark] = useState(false);

  function toggleDark() {
    setDark(!dark);

    if (!dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  return (
    <button className="darkButton" onClick={toggleDark}>
      {dark ? "🌞" : "🌙"}
    </button>
  );
}
