import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="navbar">
            <span className="nav-logo">PIZZA HUNT</span>
            <div className={`nav-items ${isOpen && "open"}`}>
              <Link
                className="link"
                to="/basket"
                onClick={() => setIsOpen(false)}
              >
                Basket
              </Link>
              <Link
                className="link"
                to="/confirmation"
                onClick={() => setIsOpen(false)}
              >
                Confirmation
              </Link>
              <Link className="link" to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </div>
            <div
              className={`nav-toggle ${isOpen && "open"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar"></div>
            </div>
          </div>
    )
}