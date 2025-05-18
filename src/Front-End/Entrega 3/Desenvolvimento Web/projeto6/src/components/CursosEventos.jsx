import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/cursosEventos.css';

const CursosEventos = () => {
  const [cursos, setCursos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('cursos');

  useEffect(() => {
    axios.get('http://localhost:3000/cursos')
      .then(res => setCursos(res.data))
      .catch(err => console.error('Erro ao buscar cursos', err));

    axios.get('http://localhost:3000/eventos')
      .then(res => setEventos(res.data))
      .catch(err => console.error('Erro ao buscar eventos', err));
  }, []);

  const renderCard = (item, tipo) => (
    <div className="course-card" key={item.id}>
      <div className="course-image">
        <img src={`http://localhost:3000/uploads/${item.imagem}`} alt={item.titulo} />
        <span className="course-tag">{tipo === 'curso' ? item.nivel : 'Evento'}</span>
      </div>
      <div className="course-content">
        <h3>{item.titulo}</h3>
        <p>{item.descricao}</p>
        <div className="course-meta">
          {tipo === 'curso' ? (
            <>
              <span>⏱ {item.cargaHoraria}</span>
              <span>🎓 {item.nivel}</span>
            </>
          ) : (
            <>
              <span>📅 {new Date(item.data).toLocaleDateString()}</span>
              <span>📍 {item.local}</span>
            </>
          )}
        </div>
        <a href="#" className="btn btn-small">Saiba mais</a>
      </div>
    </div>
  );

  return (
    <section className="courses-section" id="cursos">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Nossas soluções educacionais</span>
          <h2 className="section-title">Cursos e Eventos</h2>
          <div className="divider"></div>
        </div>

        <div className="courses-tabs">
          <button className={`tab-btn ${abaAtiva === 'cursos' ? 'active' : ''}`} onClick={() => setAbaAtiva('cursos')}>Cursos</button>
          <button className={`tab-btn ${abaAtiva === 'eventos' ? 'active' : ''}`} onClick={() => setAbaAtiva('eventos')}>Eventos</button>
        </div>

        <div className="courses-grid">
          {abaAtiva === 'cursos'
            ? cursos.map(c => renderCard(c, 'curso'))
            : eventos.map(e => renderCard(e, 'evento'))
          }
        </div>
      </div>
    </section>
  );
};

export default CursosEventos;
