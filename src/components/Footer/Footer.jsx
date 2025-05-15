import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/linkedin-brands.svg";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &#169; 2025 Supersite, desenvolvido pela News API
      </p>
      <ul className="footer__list">
        <li className="footer__item-list">
          <Link to="/" className="footer__link">
            Início
          </Link>
        </li>
        <li className="footer__item-list">
          <Link
            to="https://tripleten.com/"
            className="footer__link"
            target="_blank"
          >
            TripleTen
          </Link>
        </li>
        <li className="footer__item-list">
          <Link to="https://github.com/vinimello90" target="_blank">
            <img src={githubIcon} alt="" className="footer__icon" />
          </Link>
        </li>
        <li className="footer__item-list">
          <Link
            to="https://www.linkedin.com/in/vinicius-barretto-mello/"
            target="_blank"
          >
            <img src={linkedinIcon} alt="" className="footer__icon" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
