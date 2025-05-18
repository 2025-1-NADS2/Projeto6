import React, { useEffect, useState } from 'react';
import '../css/main.css';
import '../css/dashboard.css';
import { getToken, } from '../utils/auth';
import axios from 'axios';

const MeusEventos = () => {
  const [tab, setTab] = useState('upcoming');
  const [meusEventos, setMeusEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const token = getToken();

  useEffect(() => {
    if (token) {
      axios
        .get('/api/meus-eventos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMeusEventos(res.data))
        .catch((err) => console.error('Erro ao carregar eventos:', err));
    }
  }, [token]);

  const handleTabClick = (selectedTab) => {
    setTab(selectedTab);
  };

  const abrirModal = (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEventoSelecionado(null);
  };

  const cancelarInscricao = () => {
    if (eventoSelecionado) {
      axios
        .delete(`/api/meus-eventos/${eventoSelecionado.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMeusEventos(meusEventos.filter((ev) => ev.id !== eventoSelecionado.id));
          fecharModal();
        })
        .catch((err) => console.error('Erro ao cancelar inscrição:', err));
    }
  };

  const eventosFiltrados = meusEventos.filter((evento) => {
    const agora = new Date();
    const dataEvento = new Date(evento.data);
    return tab === 'upcoming' ? dataEvento >= agora : dataEvento < agora;
  });

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="https://institutocriativo.com.br/images/Logo.svg" alt="Educa+" height="30" />
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <a href="/dashboard" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/eventos" className="nav-link">
                <span className="nav-icon">📅</span>
                <span>Eventos</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/meus-eventos" className="nav-link active">
                <span className="nav-icon">✅</span>
                <span>Meus Eventos</span>
              </a>
            </li>
            <li className="nav-item admin-only">
              <a href="/estatisticas" className="nav-link">
                <span className="nav-icon">📊</span>
                <span>Estatísticas</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>Meus Eventos</h2>
          <div className="header-actions">
            <div className="tabs">
              <button
                className={`tab-btn ${tab === 'upcoming' ? 'active' : ''}`}
                onClick={() => handleTabClick('upcoming')}
              >
                Próximos
              </button>
              <button
                className={`tab-btn ${tab === 'past' ? 'active' : ''}`}
                onClick={() => handleTabClick('past')}
              >
                Passados
              </button>
            </div>
          </div>
        </header>

        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4">
              {eventosFiltrados.length === 0 ? (
                <p>Sem eventos cadastrados nesta aba.</p>
              ) : (
                eventosFiltrados.map((evento) => (
                  <div className="event-card" key={evento.id}>
                    <h4>{evento.titulo}</h4>
                    <p>{evento.descricao}</p>
                    <p><strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}</p>
                    <p><strong>Local:</strong> {evento.local}</p>
                    <button className="btn btn-outline" onClick={() => abrirModal(evento)}>
                      Cancelar Inscrição
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmar Ação</h3>
              <button className="modal-close" onClick={fecharModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja cancelar sua inscrição no evento <strong>{eventoSelecionado?.titulo}</strong>?</p>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={cancelarInscricao}>Confirmar</button>
                <button className="btn btn-outline" onClick={fecharModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusEventos;
