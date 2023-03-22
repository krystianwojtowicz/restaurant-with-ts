import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { Basket } from "./components/Basket";
import { List } from "./components/List";
import { Confirmation } from "./components/Confirmation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <span>PIZZA HUNT</span>
          <Link to="/basket">Basket</Link>
          <Link to="/confirmation">Confirmation</Link>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
