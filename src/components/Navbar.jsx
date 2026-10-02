function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        Recipe Finder
      </h2>

      <ul className="nav-links">

        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#recipes">Recipes</a>
        </li>

        <li>
          <a href="#favorites">Favorites</a>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;