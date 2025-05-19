import "./Footer.css";
import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/linkedin-brands.svg";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &#169; 2025 Supersite, desenvolvido pela News API
      </p>
      <div className="footer__columns">
        <div className="footer__column">
          <ul className="footer__list">
            <li className="footer__item-list">
              <a href="#header" className="footer__link">
                Início
              </a>
            </li>
            <li className="footer__item-list">
              <a
                href="https://tripleten.com/"
                className="footer__link"
                target="_blank"
              >
                TripleTen
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__column footer__column_socials">
          <ul className="footer__list footer__list_socials">
            <li className="footer__item-list footer__item-list_socials">
              <a
                href="https://github.com/vinimello90"
                className="footer__link footer__link_social"
                target="_blank"
              >
                <img src={githubIcon} alt="" className="footer__icon" />
              </a>
            </li>
            <li className="footer__item-list">
              <a
                href="https://www.linkedin.com/in/vinicius-barretto-mello/"
                className="footer__link footer__link_social"
                target="_blank"
              >
                <img src={linkedinIcon} alt="" className="footer__icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
