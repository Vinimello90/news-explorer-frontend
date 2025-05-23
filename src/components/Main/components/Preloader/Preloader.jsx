import "./Preloader.css";

export function Preloader() {
  return (
    <>
      <div className="preloader">
        <i className="preloader__circle"></i>
        <p className="preloader__text">Procurando Notícias...</p>
      </div>
    </>
  );
}
