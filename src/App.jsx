import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import './index.css'; 

function App() {
  const [datos, setDatos] = useState(null);
  const [modalLegal, setModalLegal] = useState({ show: false, title: '', content: '' });
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    client.fetch('*[_type == "landingInversion"][0]').then(setDatos).catch(console.error);
  }, []);

  const openModal = (title, content) => setModalLegal({ show: true, title, content });
  const closeModal = () => setModalLegal({ show: false, title: '', content: '' });
  const toggleFaq = (index) => setFaqOpen(faqOpen === index ? null : index);

  if (!datos) return <div className="loader-container"><div className="spinner"></div><p>Iniciando plataforma...</p></div>;

  return (
    <div className="app-wrapper">
      <div className="bg-glow"></div>

      <header className="hero-section animate-fade-in">
        <div className="container">
          <div className="badge animate-slide-up">🚀 Mentoría Premium</div>
          {datos.fotoPerfil?.asset && (
            <div className="foto-wrapper animate-pop">
              <div className="foto-ring"></div>
              <img src={urlFor(datos.fotoPerfil).width(300).url()} alt={datos.fotoPerfil.alt || "Mentor"} className="foto-perfil"/>
            </div>
          )}
          <h1 className="title gradient-text">{datos.tituloPrincipal}</h1>
          <p className="desc">{datos.descripcion}</p>
        </div>
      </header>

      {datos.ventajas?.length > 0 && (
        <section className="ventajas-section animate-slide-up">
          <div className="container">
            <h2 className="subtitle">Tu camino hacia la rentabilidad</h2>
            <div className="grid-ventajas">
              {datos.ventajas.map((ventaja, idx) => (
                <div key={idx} className="card-ventaja">
                  <div className="icon-wrapper"><span className="check-icon">✓</span></div>
                  <p>{ventaja}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {datos.testimonios?.length > 0 && (
        <section className="testimonios-section animate-slide-up">
          <div className="container">
            <h2 className="subtitle">Lo que dicen nuestros alumnos</h2>
            <div className="grid-testimonios">
              {datos.testimonios.map((test, idx) => (
                <div key={idx} className="card-testimonio">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p className="testimonio-texto">"{test.texto}"</p>
                  <p className="testimonio-autor"><strong>{test.autor}</strong></p>
                  <p className="testimonio-pais">{test.pais}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {datos.faqs?.length > 0 && (
        <section className="faq-section animate-slide-up">
          <div className="container">
            <h2 className="subtitle">Preguntas Frecuentes</h2>
            <div className="faq-container">
              {datos.faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${faqOpen === idx ? 'open' : ''}`}>
                  <h3 className="faq-question" onClick={() => toggleFaq(idx)}>
                    {faq.pregunta}
                    <span className="faq-icon">+</span>
                  </h3>
                  <div className="faq-answer">
                    <p>{faq.respuesta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-section animate-slide-up">
        <div className="container">
          <div className="cta-card">
            <h2>Toma el control de tu capital</h2>
            <p>El mercado no espera. Únete hoy y comienza a construir tu patrimonio en dólares.</p>
            <a href={datos.enlaceWhatsApp} target="_blank" rel="noopener noreferrer" className="btn-link">
              <button className="btn-inversion pulse-effect">Quiero empezar ahora</button>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>© {new Date().getFullYear()} {datos.textoFooter}</p>
        <div className="legal-links">
          {datos.terminosCondiciones && <span onClick={() => openModal('Términos y Condiciones', datos.terminosCondiciones)} className="legal-link">Términos y Condiciones</span>}
          {datos.terminosCondiciones && datos.politicaPrivacidad && " | "}
          {datos.politicaPrivacidad && <span onClick={() => openModal('Política de Privacidad', datos.politicaPrivacidad)} className="legal-link">Política de Privacidad</span>}
        </div>
      </footer>

      {datos.enlaceWhatsApp && (
        <a href={datos.enlaceWhatsApp} target="_blank" rel="noopener noreferrer" className="wa-flotante">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="35" height="35"><path fill="white" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        </a>
      )}

      {modalLegal.show && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalLegal.title}</h2>
            <div className="modal-body">{modalLegal.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}</div>
            <button className="btn-close-modal" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;