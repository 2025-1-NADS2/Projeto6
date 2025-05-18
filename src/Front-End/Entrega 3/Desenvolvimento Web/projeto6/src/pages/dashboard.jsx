import React, { useEffect } from 'react';
import '../css/main.css';
import '../css/dashboard.css';
import { isAdmin, isProfessor } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redireciona se não estiver logado
    }
  }, [navigate]);

  const handleCriarEvento = () => {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.showModal();
    }
  };

  const editarCurso = (id) => {
    navigate(`/cursos/editar/${id}`);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="https://institutocriativo.com.br/images/Logo.svg" alt="Educa+" height="30" />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <a href="/dashboard" className="nav-link active">
                <span className="nav-icon">
                  <i className="fas fa-home"></i>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/eventos" className="nav-link">
                <span className="nav-icon">
                  <i className="fas fa-calendar"></i>
                </span>
                <span>Eventos</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/meus-eventos" className="nav-link">
                <span className="nav-icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>Meus Eventos</span>
              </a>
            </li>
            {isAdmin() && (
              <li className="nav-item admin-only">
                <a href="/estatisticas" className="nav-link">
                  <span className="nav-icon">
                    <i className="fas fa-chart-bar"></i>
                  </span>
                  <span>Estatísticas</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Dashboard</h2>
          <div className="user-menu">
            <div className="user-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            </div>
          </div>
        </header>

        {/* Botões de ação condicional */}
        <div style={{ margin: "20px 0" }}>
          {(isAdmin() || isProfessor()) && (
            <>
              <button onClick={handleCriarEvento} className="btn btn-primary" style={{ marginRight: '10px' }}>
                Adicionar Evento ou Curso
              </button>
              <button onClick={() => editarCurso(1)} className="btn btn-outline">
                Editar Curso Exemplo
              </button>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">1,248</div>
            <div className="stat-label">Total de Inscrições</div>
            <div className="stat-change up">
              <i className="fas fa-arrow-up"></i>
              <span>12% em relação ao mês passado</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">48</div>
            <div className="stat-label">Eventos Ativos</div>
            <div className="stat-change up">
              <i className="fas fa-arrow-up"></i>
              <span>5 novos eventos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">R$ 24,560</div>
            <div className="stat-label">Arrecadação</div>
            <div className="stat-change down">
              <i className="fas fa-arrow-down"></i>
              <span>8% em relação ao mês passado</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">87%</div>
            <div className="stat-label">Taxa de Satisfação</div>
            <div className="stat-change up">
              <i className="fas fa-arrow-up"></i>
              <span>3% em relação ao mês passado</span>
            </div>
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="card mb-4">
          <div className="card-header">
            <h3>Próximos Eventos</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-3 gap-4" id="upcomingEvents">
              {/* Eventos futuros podem ser mapeados aqui */}
            </div>
          </div>
          <div className="card-footer text-center">
            <a href="/eventos" className="text-link">Ver todos os eventos</a>
          </div>
        </div>

        {/* Minhas Inscrições */}
        <div className="card">
          <div className="card-header">
            <h3>Minhas Inscrições</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4" id="myRegistrations">
              {/* Inscrições do backend podem ser exibidas aqui */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
