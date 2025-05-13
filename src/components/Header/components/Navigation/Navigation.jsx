export function Navigation() {
  return (
    <nav className="navigation">
      <h1 className="navigation__logo">NewsExplorer</h1>
      <ul className="navigation__menu">
        <li className="navigation__menu-item">
          <a href="" className="navigation__link">
            Início
          </a>
        </li>
        <li className="navigation__menu-item">
          <button type="button" className="navigation__button">
            Entrar
          </button>
        </li>
      </ul>
    </nav>
  );
}
