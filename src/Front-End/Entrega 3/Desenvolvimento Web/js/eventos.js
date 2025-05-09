// document.addEventListener('DOMContentLoaded', function() {
//     // Verificar autenticação
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     if (!currentUser) {
//         window.location.href = 'index.html';
//         return;
//     }
    
//     // Configurar interface baseada no tipo de usuário
//     setupUI(currentUser);
    
//     // Carregar eventos
//     loadEvents();
    
//     // Configurar eventos
//     setupEventListeners();
// });

// function setupUI(user) {
//     // Mostrar/ocultar botão de adicionar evento
//     const addEventBtn = document.getElementById('addEventBtn');
//     if (user.role !== 'admin') {
//         addEventBtn.style.display = 'none';
//     }
// }

// function loadEvents() {
//     // Dados mockados
//     const events = [
//         {
//             id: 1,
//             title: 'Workshop de Programação Web',
//             description: 'Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 3 horas.',
//             type: 'workshop',
//             date: '15/12/2023',
//             time: '14:00 - 17:00',
//             image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             capacity: 30,
//             registered: 24,
//             isRegistered: false
//         },
//         {
//             id: 2,
//             title: 'Palestra: Educação no Século XXI',
//             description: 'Discussão sobre as novas metodologias e tecnologias que estão transformando a educação.',
//             type: 'palestra',
//             date: '20/12/2023',
//             time: '19:00 - 21:00',
//             image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             capacity: 100,
//             registered: 45,
//             isRegistered: true
//         },
//         {
//             id: 3,
//             title: 'Curso de Design Instrucional',
//             description: 'Aprenda a criar materiais educacionais eficazes e engajadores.',
//             type: 'curso',
//             date: '05/01/2024',
//             time: '09:00 - 12:00',
//             image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             capacity: 25,
//             registered: 12,
//             isRegistered: false
//         }
//     ];
    
//     const container = document.getElementById('eventsList');
//     container.innerHTML = '';
    
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     const isAdmin = currentUser.role === 'admin';
    
//     if (events.length === 0) {
//         container.innerHTML = `
//             <div class="empty-state">
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 12L11 14L15 10M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="var(--light-gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//                 <p>Nenhum evento encontrado</p>
//             </div>
//         `;
//         return;
//     }
    
//     events.forEach(event => {
//         const progress = Math.min(Math.round((event.registered / event.capacity) * 100), 100);
        
//         const eventCard = document.createElement('div');
//         eventCard.className = 'event-card card';
//         eventCard.innerHTML = `
//             <div class="event-image">
//                 <img src="${event.image}" alt="${event.title}">
//                 <span class="event-badge">${event.type}</span>
//             </div>
//             <div class="event-content">
//                 <h4 class="event-title">${event.title}</h4>
//                 <p class="event-description">${event.description}</p>
//                 <div class="event-meta">
//                     <span>${event.date}</span>
//                     <span>${event.time}</span>
//                 </div>
//                 <div class="progress-bar mt-3">
//                     <div class="progress-track">
//                         <div class="progress-fill" style="width: ${progress}%;"></div>
//                     </div>
//                     <div class="progress-text">${event.registered}/${event.capacity} vagas</div>
//                 </div>
//                 <div class="event-actions mt-3">
//                     ${isAdmin ? `
//                         <button class="btn btn-primary btn-sm" onclick="editEvent(${event.id})">
//                             Editar
//                         </button>
//                         <button class="btn btn-outline btn-sm" onclick="deleteEvent(${event.id})">
//                             Excluir
//                         </button>
//                     ` : `
//                         ${event.isRegistered ? `
//                             <button class="btn btn-outline btn-sm" onclick="cancelRegistration(${event.id})">
//                                 Cancelar Inscrição
//                             </button>
//                         ` : `
//                             <button class="btn btn-primary btn-sm" onclick="registerForEvent(${event.id})">
//                                 Inscrever-se
//                             </button>
//                         `}
//                     `}
//                 </div>
//             </div>
//         `;
        
//         container.appendChild(eventCard);
//     });
// }

// function setupEventListeners() {
//     // Modal de evento
//     const modal = document.getElementById('eventModal');
//     const addEventBtn = document.getElementById('addEventBtn');
//     const closeBtns = document.querySelectorAll('.modal-close');
    
//     // Abrir modal para adicionar evento
//     if (addEventBtn) {
//         addEventBtn.addEventListener('click', function() {
//             document.getElementById('modalTitle').textContent = 'Adicionar Novo Evento';
//             document.getElementById('eventForm').reset();
//             document.getElementById('eventId').value = '';
//             modal.classList.add('active');
//         });
//     }
    
//     // Fechar modal
//     closeBtns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             modal.classList.remove('active');
//         });
//     });
    
//     // Fechar modal ao clicar fora
//     window.addEventListener('click', function(event) {
//         if (event.target === modal) {
//             modal.classList.remove('active');
//         }
//     });
    
//     // Formulário de evento
//     document.getElementById('eventForm').addEventListener('submit', function(e) {
//         e.preventDefault();
//         saveEvent();
//     });
    
//     // Filtros
//     document.getElementById('eventType').addEventListener('change', filterEvents);
//     document.getElementById('eventDate').addEventListener('change', filterEvents);
//     document.getElementById('eventSearch').addEventListener('input', filterEvents);
// }

// function filterEvents() {
//     // Implementar lógica de filtragem
//     console.log('Filtrando eventos...');
// }

// function saveEvent() {
//     const form = document.getElementById('eventForm');
//     const eventId = document.getElementById('eventId').value;
    
//     const eventData = {
//         title: document.getElementById('eventTitle').value,
//         description: document.getElementById('eventDescription').value,
//         type: document.getElementById('eventType').value,
//         capacity: document.getElementById('eventCapacity').value,
//         date: document.getElementById('eventDate').value,
//         time: document.getElementById('eventTime').value,
//         image: document.getElementById('eventImage').value
//     };
    
//     // Em produção, seria uma chamada API
//     console.log(eventId ? 'Atualizando evento:' : 'Criando novo evento:', eventData);
    
//     // Fechar modal e recarregar eventos
//     document.getElementById('eventModal').classList.remove('active');
//     loadEvents();
// }

// function editEvent(id) {
//     // Em produção, seria uma chamada API para buscar o evento
//     const events = [
//         {
//             id: 1,
//             title: 'Workshop de Programação Web',
//             description: 'Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 3 horas.',
//             type: 'workshop',
//             date: '2023-12-15',
//             time: '14:00',
//             image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             capacity: 30
//         }
//     ];
    
//     const event = events.find(e => e.id === id);
//     if (!event) return;
    
//     document.getElementById('modalTitle').textContent = 'Editar Evento';
//     document.getElementById('eventId').value = event.id;
//     document.getElementById('eventTitle').value = event.title;
//     document.getElementById('eventDescription').value = event.description;
//     document.getElementById('eventType').value = event.type;
//     document.getElementById('eventCapacity').value = event.capacity;
//     document.getElementById('eventDate').value = event.date;
//     document.getElementById('eventTime').value = event.time;
//     document.getElementById('eventImage').value = event.image;
    
//     document.getElementById('eventModal').classList.add('active');
// }

// function deleteEvent(id) {
//     if (confirm('Tem certeza que deseja excluir este evento?')) {
//         // Em produção, seria uma chamada API
//         console.log('Excluindo evento:', id);
//         loadEvents();
//     }
// }

// function registerForEvent(id) {
//     // Em produção, seria uma chamada API
//     alert('Inscrição realizada com sucesso!');
//     loadEvents();
// }

// function cancelRegistration(id) {
//     if (confirm('Tem certeza que deseja cancelar sua inscrição?')) {
//         // Em produção, seria uma chamada API
//         alert('Inscrição cancelada com sucesso!');
//         loadEvents();
//     }
// }
// // Adicionar estas funções ao arquivo eventos.js

// function loadMyEvents() {
//     // Verificar se estamos na página correta
//     if (!document.getElementById('myEventsList')) return;
    
//     // Dados mockados
//     const events = [
//         {
//             id: 1,
//             title: 'Workshop de Programação Web',
//             description: 'Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 3 horas.',
//             date: '15/12/2023',
//             time: '14:00 - 17:00',
//             type: 'workshop',
//             image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             status: 'confirmado',
//             certificate: true
//         },
//         {
//             id: 2,
//             title: 'Palestra: Educação no Século XXI',
//             description: 'Discussão sobre as novas metodologias e tecnologias que estão transformando a educação.',
//             date: '20/12/2023',
//             time: '19:00 - 21:00',
//             type: 'palestra',
//             image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             status: 'pendente',
//             certificate: false
//         },
//         {
//             id: 3,
//             title: 'Curso de Design Instrucional',
//             description: 'Aprenda a criar materiais educacionais eficazes e engajadores.',
//             date: '05/01/2024',
//             time: '09:00 - 12:00',
//             type: 'curso',
//             image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//             status: 'confirmado',
//             certificate: false
//         }
//     ];
    
//     const container = document.getElementById('myEventsList');
//     container.innerHTML = '';
    
//     if (events.length === 0) {
//         container.innerHTML = `
//             <div class="empty-state">
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9 12L11 14L15 10M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="var(--light-gray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//                 <p>Você não está inscrito em nenhum evento</p>
//                 <a href="eventos.html" class="btn btn-outline mt-2">Explorar eventos</a>
//             </div>
//         `;
//         return;
//     }
    
//     events.forEach(event => {
//         const statusClass = event.status === 'confirmado' ? 'badge-success' : 'badge-warning';
        
//         const eventCard = document.createElement('div');
//         eventCard.className = 'event-card card';
//         eventCard.innerHTML = `
//             <div class="event-image">
//                 <img src="${event.image}" alt="${event.title}">
//                 <span class="event-badge">${event.type}</span>
//             </div>
//             <div class="event-content">
//                 <h4 class="event-title">${event.title}</h4>
//                 <p class="event-description">${event.description}</p>
//                 <div class="event-meta">
//                     <span>${event.date}</span>
//                     <span>${event.time}</span>
//                 </div>
//                 <div class="event-status mt-2">
//                     <span class="badge ${statusClass}">${event.status}</span>
//                     ${event.certificate ? '<span class="badge badge-info">Certificado disponível</span>' : ''}
//                 </div>
//                 <div class="event-actions mt-3">
//                     <button class="btn btn-outline btn-sm" onclick="showCancelModal(${event.id}, '${event.title}')">
//                         Cancelar inscrição
//                     </button>
//                     ${event.certificate ? `
//                         <button class="btn btn-primary btn-sm" onclick="downloadCertificate(${event.id})">
//                             Baixar certificado
//                         </button>
//                     ` : ''}
//                 </div>
//             </div>
//         `;
        
//         container.appendChild(eventCard);
//     });
    
//     // Configurar tabs
//     setupTabs();
// }

// function setupTabs() {
//     const tabs = document.querySelectorAll('.tab-btn');
    
//     tabs.forEach(tab => {
//         tab.addEventListener('click', function() {
//             tabs.forEach(t => t.classList.remove('active'));
//             this.classList.add('active');
            
//             // Em produção, carregaria os eventos correspondentes
//             const tabType = this.getAttribute('data-tab');
//             console.log('Mostrar eventos:', tabType);
//         });
//     });
// }

// function showCancelModal(id, title) {
//     const modal = document.getElementById('confirmModal');
//     document.getElementById('confirmTitle').textContent = 'Cancelar Inscrição';
//     document.getElementById('confirmMessage').textContent = `Tem certeza que deseja cancelar sua inscrição no evento "${title}"?`;
    
//     const confirmBtn = document.getElementById('confirmAction');
//     confirmBtn.onclick = function() {
//         cancelRegistration(id);
//         modal.classList.remove('active');
//     };
    
//     modal.classList.add('active');
// }

// function downloadCertificate(id) {
//     // Em produção, seria uma chamada API para gerar/download do certificado
//     alert(`Gerando certificado para o evento ${id}...`);
// }

// // Chamar loadMyEvents se estiver na página correta
// if (window.location.pathname.includes('meus-eventos.html')) {
//     document.addEventListener('DOMContentLoaded', function() {
//         // Verificar autenticação
//         const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//         if (!currentUser) {
//             window.location.href = 'index.html';
//             return;
//         }
        
//         // Carregar eventos do usuário
//         loadMyEvents();
        
//         // Configurar modal de confirmação
//         document.querySelectorAll('.modal-close').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 document.getElementById('confirmModal').classList.remove('active');
//             });
//         });
        
//         window.addEventListener('click', function(event) {
//             if (event.target === document.getElementById('confirmModal')) {
//                 document.getElementById('confirmModal').classList.remove('active');
//             }
//         });
//     });
// }