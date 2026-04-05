// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/navbar image/logo.png";
// import search from "../../assets/navbar image/search-icon.png";
// import cart from "../../assets/navbar image/cart.png";
// import "./header.css";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="apple-header">
//       <nav className="apple-nav">
//         {/* Mobile hamburger */}
//         <button
//           className="hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>

//         {/* Nav links */}
//         <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <li>
//             <Link to="/" className="nav-logo">
//               <img src={logo} alt="Apple" />
//             </Link>
//           </li>
//           <li><Link to="/mac" onClick={() => setMenuOpen(false)}>Mac</Link></li>
//           <li><Link to="/iphone" onClick={() => setMenuOpen(false)}>iPhone</Link></li>
//           <li><Link to="/ipad" onClick={() => setMenuOpen(false)}>iPad</Link></li>
//           <li><Link to="/watch" onClick={() => setMenuOpen(false)}>Watch</Link></li>
//           <li><Link to="/tv" onClick={() => setMenuOpen(false)}>TV</Link></li>
//           <li><Link to="/music" onClick={() => setMenuOpen(false)}>Music</Link></li>
//           <li><Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link></li>
//           <li>
//             <Link to="/search" onClick={() => setMenuOpen(false)}>
//               <img src={search} alt="Search" className="nav-icon" />
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" onClick={() => setMenuOpen(false)}>
//               <img src={cart} alt="Cart" className="nav-icon" />
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }
