import '../css/home.css';

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src="https://www.institutocriativo.com.br/images/Logo.svg" alt="Instituto Criativo" />
            </a>
            <nav className="desktop-nav">
              <ul className="nav-links">
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#segmentos">Segmentos</a></li>
                <li><a href="#impacto">Impacto</a></li>
                <li><a href="#cursos">Cursos</a></li>
                <li><a href="#equipe">Equipe</a></li>
                <li><a href="#parceiros">Parceiros</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
              <div className="nav-buttons">
                <a href="#" className="btn btn-primary">Doar</a>
                <a href="/" className="btn btn-outline">Entrar</a>
              </div>
            </nav>
            <button className="menu-toggle" aria-label="Menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-slider">
          <div className="slide active" style={{ backgroundImage: `url('Imagens/arte.jpg')` }}>
            <div className="overlay"></div>
            <div className="container">
              <div className="hero-content">
                <h1>Transformando vidas através da educação criativa</h1>
                <p className="subtitle">Empoderamos pessoas com conhecimento inovador para mudar suas vidas e a sociedade</p>
                <div className="hero-buttons">
                  <a href="#cursos" className="btn btn-primary">Conheça nossos cursos</a>
                  <a href="#sobre" className="btn btn-outline">Saiba mais</a>
                </div>
              </div>
            </div>
          </div>

          <div className="slide" style={{ backgroundImage: `url('Imagens/arte2.jpg')` }}>
            <div className="overlay"></div>
            <div className="container">
              <div className="hero-content">
                <h1>Educação que transforma realidades</h1>
                <p className="subtitle">Projetos inovadores para todas as idades e necessidades</p>
                <div className="hero-buttons">
                  <a href="#segmentos" className="btn btn-primary">Nossos segmentos</a>
                  <a href="#impacto" className="btn btn-outline">Nosso impacto</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-controls">
          <button className="slider-prev"><i className="fas fa-chevron-left"></i></button>
          <div className="slider-dots">
            <button className="dot active"></button>
            <button className="dot"></button>
          </div>
          <button className="slider-next"><i className="fas fa-chevron-right"></i></button>
        </div>
      </section>

      {/* Seções adicionais como Sobre, Segmentos, Impacto, Cursos, Equipe, Parceiros, Contato, Footer devem ser separadas em componentes ou continuadas aqui conforme necessário */}

    </>
  );
};

export default Home;