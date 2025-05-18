import { useState, useEffect } from 'react';
import '../css/dashboard.css';
import '../css/main.css';
import axios from 'axios';
import { getToken, isAdmin, isProfessor, getPerfil } from '../utils/auth';
import Header from '../components/Header'; // ✅ Import do Header

const Eventos = () => {
  const [tipoCadastro, setTipoCadastro] = useState('evento');
  const [eventos, setEventos] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await axios.get("http://localhost:3000/eventos");
        setEventos(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar eventos:", erro);
      }
    };

    buscarEventos();
  }, []);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const perfil = getPerfil();
    const token = getToken();
    const formData = new FormData();

    if (tipoCadastro === "evento" && perfil !== "admin") {
      alert("Apenas administradores podem cadastrar eventos.");
      return;
    }

    if (tipoCadastro === "curso" && !(perfil === "admin" || perfil === "professor")) {
      alert("Apenas administradores ou professores podem cadastrar cursos.");
      return;
    }

    if (tipoCadastro === "evento") {
      formData.append("titulo", e.target[1].value);
      formData.append("descricao", e.target[2].value);
      formData.append("data", e.target[3].value);
      formData.append("local", e.target[4].value);
      formData.append("imagem", e.target[5].files[0]);
    } else {
      formData.append("titulo", e.target[1].value);
      formData.append("descricao", e.target[2].value);
      formData.append("cargaHoraria", e.target[3].value);
      formData.append("nivel", e.target[4].value);
      formData.append("link", e.target[5].value);
      formData.append("imagem", e.target[6].files[0]);
    }

    try {
      const url = tipoCadastro === "evento"
        ? "http://localhost:3000/eventos"
        : "http://localhost:3000/cursos";

      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert(`${tipoCadastro === 'evento' ? 'Evento' : 'Curso'} cadastrado com sucesso!`);
          setPreview(null);
          document.getElementById("eventModal").close();
          window.location.reload();
        });
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar. Veja o console.");
    }
  };

  return (
    <>
      <Header /> {}

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link active">Eventos</a></li>
              <li className="nav-item"><a href="/meus-eventos" className="nav-link">Meus Eventos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <header className="header">
            <div className="header-actions">
              {(isAdmin() || isProfessor()) && (
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById('eventModal').showModal()}
                >
                  Adicionar {tipoCadastro === "evento" ? "Evento" : "Curso"}
                </button>
              )}
            </div>
          </header>

          <div className="card mb-4">
            <div className="card-body">
              <div className="filters">
                {}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4">
                {eventos.map((ev, idx) => (
                  <div key={idx} className="event-card">{ev.titulo}</div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <dialog id="eventModal" className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h3>Adicionar Novo {tipoCadastro === 'evento' ? 'Evento' : 'Curso'}</h3>

              <select
                className="form-control"
                value={tipoCadastro}
                onChange={e => setTipoCadastro(e.target.value)}
              >
                <option value="evento">Evento</option>
                <option value="curso">Curso</option>
              </select>

              {tipoCadastro === 'evento' ? (
                <>
                  <input type="text" placeholder="Título" className="form-control" required />
                  <textarea rows="4" placeholder="Descrição" className="form-control" required></textarea>
                  <input type="date" className="form-control" required />
                  <input type="text" placeholder="Local" className="form-control" required />
                  <input type="file" accept="image/*" onChange={handleImagePreview} className="form-control" required />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              ) : (
                <>
                  <input type="text" placeholder="Título do curso" className="form-control" required />
                  <textarea rows="4" placeholder="Descrição" className="form-control" required></textarea>
                  <input type="text" placeholder="Carga horária" className="form-control" required />
                  <select className="form-control" required>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                  <input type="url" placeholder="Link do curso" className="form-control" required />
                  <input type="file" accept="image/*" onChange={handleImagePreview} className="form-control" required />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              )}

              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <button className="btn btn-primary" type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Eventos;
