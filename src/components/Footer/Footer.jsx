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
      <div className="footer__column">
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
        </ul>
      </div>
      <div className="footer__column footer__column_socials">
        <ul className="footer__list footer__list_socials">
          <li className="footer__item-list footer__item-list_socials">
            <Link
              to="https://github.com/vinimello90"
              className="footer__link footer__link_social"
              target="_blank"
            >
              <img src={githubIcon} alt="" className="footer__icon" />
            </Link>
          </li>
          <li className="footer__item-list">
            <Link
              to="https://www.linkedin.com/in/vinicius-barretto-mello/"
              className="footer__link footer__link_social"
              target="_blank"
            >
              <img src={linkedinIcon} alt="" className="footer__icon" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
