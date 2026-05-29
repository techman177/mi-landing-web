import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import './index.css'; 

function App() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    // Jalamos los datos dinámicos desde Sanity
    client.fetch('*[_type == "landingInversion"][0]')
      .then((data) => setDatos(data))
      .catch(console.error);
  }, []);

  // Pantalla de carga mientras Vercel se comunica con Sanity
  if (!datos) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando plataforma...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      
      {/* SECCIÓN HERO (Encabezado principal) */}
      <header className="hero-section">
        <div className="container">
          {datos.fotoPerfil && (
            <img 
              src={urlFor(datos.fotoPerfil).width(300).url()} 
              alt="Mentor" 
              className="foto-perfil"
            />
          )}
          <h1 className="title">{datos.tituloPrincipal}</h1>
          <p className="desc">{datos.descripcion}</p>
        </div>
      </header>

      {/* SECCIÓN VENTAJAS (Tarjetas dinámicas) */}
      {datos.ventajas && datos.ventajas.length > 0 && (
        <section className="ventajas-section">
          <div className="container">
            <h2 className="subtitle">¿Qué vas a lograr?</h2>
            <div className="grid-ventajas">
              {datos.ventajas.map((ventaja, index) => (
                <div key={index} className="card-ventaja">
                  <span className="check-icon">✅</span>
                  <p>{ventaja}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN LLAMADO A LA ACCIÓN (El enlace seguro) */}
      <section className="cta-section">
        <div className="container">
          <h2>Da el primer paso hacia tu libertad</h2>
          <p>Únete al canal privado y toma el control de tu capital hoy mismo.</p>
          
          {/* Tu número ya no está aquí, viene inyectado de Sanity */}
          <a href={datos.enlaceWhatsApp} target="_blank" rel="noopener noreferrer">
            <button className="btn-inversion">Escribe "INVERSIÓN"</button>
          </a>
        </div>
      </section>

    </div>
  );
}

export default App;