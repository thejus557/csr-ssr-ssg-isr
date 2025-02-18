import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./pages/Cart.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    
    <Router>
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-semibold dark:text-white">FakeStore</span>
        <div>
          <Link to={'/'} className="px-4 py-2 text-gray-900 dark:text-white">Home</Link>
          <Link to={'/cart'} className="px-4 py-2 text-gray-900 dark:text-white">Cart</Link>
          </div>
        </div>
    </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  </>
   
);
