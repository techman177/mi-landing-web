import { useState } from 'react';
import { createClient } from '@sanity/client';

// Configuramos el puente hacia tu base de datos
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-28',
  token: import.meta.env.VITE_SANITY_TOKEN,
});

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    correo: '',
    experiencia: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const doc = {
        _type: 'prospecto',
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        correo: formData.correo,
        experiencia: formData.experiencia,
      };

      await client.create(doc);
      
      const mensajeAEnviar = encodeURIComponent(`¡Hola Nicolás! Acabo de registrarme en la web. Mi nombre es ${formData.nombre} y quiero agendar la asesoría de inversiones de $37 USD.`);
      window.location.href = `https://wa.me/18094301811?text=${mensajeAEnviar}`;
      
      setFormData({ nombre: '', whatsapp: '', correo: '', experiencia: '' });
    } catch (error) {
      console.error("Error al guardar en Sanity:", error);
      alert("Hubo un error al enviar tus datos. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* 1. HERO SECTION */}
      <header className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
            🚀 Asesoría Privada 1 a 1
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-8 mb-6 leading-tight">
            Aprende a invertir en la Bolsa de EE. UU. desde Latinoamérica empezando con $20 USD.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto">
            Sin intermediarios, sin comisiones bancarias ocultas y con el control total de tu dinero. Te llevo de la mano para que abras tu cuenta y hagas tu primera inversión.
          </p>
          <a href="#agendar" className="inline-block bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
            Agendar Asesoría por $37 USD
          </a>
        </div>
      </header>

      {/* 2. LOGOS DE CONFIANZA */}
      <section className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Aprenderás a usar plataformas reguladas como:</p>
          <div className="flex justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            <span className="text-2xl font-black text-slate-800">HAPI</span>
            <span className="text-2xl font-black text-slate-800">EXNESS</span>
            <span className="text-xl font-bold text-slate-800 border-l-2 border-slate-300 pl-8">Regulación FINRA / SIPC</span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMA Y SOLUCIÓN */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-slate-900">Invertir no debería ser un dolor de cabeza.</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
              <span>❌</span> El Problema
            </h3>
            <p className="text-slate-600 leading-relaxed">
              ¿Te confunden los impuestos para extranjeros? ¿Los bancos locales te cobran demasiado por enviar tu dinero a un broker internacional?
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-2">
              <span>✅</span> La Solución
            </h3>
            <p className="text-slate-600 leading-relaxed">
              En una videollamada de 45 minutos resolvemos todo eso. Te enseño el método exacto para fondear tu cuenta rápido y seguro. Tú haces los clics, yo te guío.
            </p>
          </div>
        </div>
      </section>

      {/* 4. AUTORIDAD (TU PERFIL) */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
            {/* AQUÍ VA TU FOTO: Asegúrate de que se llame perfil.png y esté en la carpeta public */}
            <img src="/perfil.png" alt="Nicolás - Mentor de Inversiones" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Hola, soy Nicolás 👋</h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-4">
              Soy inversor y mentor financiero. Durante años vi cómo las personas de Latinoamérica perdían dinero en comisiones abusivas de los bancos locales al intentar invertir en el extranjero.
            </p>
            <p className="text-slate-300 leading-relaxed text-lg">
              Mi misión hoy es democratizar el acceso a la Bolsa de Valores. Te enseñaré a usar herramientas como <strong>Hapi y Exness</strong> para que tomes el control absoluto de tu capital, sin intermediarios.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRUEBA SOCIAL (TESTIMONIOS) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Lo que dicen mis alumnos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex text-yellow-400 mb-4">★★★★★</div>
            <p className="text-slate-600 italic mb-4">"En 40 minutos Nicolás me ayudó a abrir mi cuenta en Hapi y comprar mi primer ETF. Algo que llevaba meses posponiendo por miedo a equivocarme."</p>
            <p className="font-bold text-slate-900">— Carlos M.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex text-yellow-400 mb-4">★★★★★</div>
            <p className="text-slate-600 italic mb-4">"Me ahorró muchísimo dinero explicándome cómo fondear la cuenta sin pagar las tarifas absurdas de mi banco. 100% recomendado."</p>
            <p className="font-bold text-slate-900">— Laura G.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex text-yellow-400 mb-4">★★★★★</div>
            <p className="text-slate-600 italic mb-4">"Explicación directa y al grano. Pagué los $37 dólares y considero que ha sido la mejor inversión en educación financiera que he hecho."</p>
            <p className="font-bold text-slate-900">— Roberto D.</p>
          </div>
        </div>
      </section>

      {/* 6. FAQ (PREGUNTAS FRECUENTES) */}
      <section className="bg-slate-100 py-20 px-6 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-slate-900">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">¿Necesito tener mucho dinero para empezar?</h4>
              <p className="text-slate-600">No. Te enseñaré cómo puedes empezar a invertir en acciones fraccionadas y ETFs desde tan solo $20 USD.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">¿Mi dinero pasa por tus manos?</h4>
              <p className="text-slate-600">Jamás. Tú crearás tu propia cuenta en un broker regulado y fonderás con tus propios métodos. Yo solo te guío en el paso a paso a través de la pantalla compartida.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">¿Cómo se paga la asesoría?</h4>
              <p className="text-slate-600">Al llenar el formulario, te redirigiré a mi WhatsApp donde te pasaré los métodos de pago disponibles y acordaremos el día y la hora de la videollamada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FORMULARIO DE CIERRE (CON PRECIO) */}
      <section id="agendar" className="py-24 px-6 max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
          
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">Agenda tu sesión de 45 minutos</h3>
          <div className="text-center mb-8">
            <span className="text-4xl font-black text-blue-600">$37</span>
            <span className="text-slate-500 font-medium"> USD</span>
            <p className="text-slate-500 mt-2 text-sm px-4">Completa tus datos. Te contactaré por WhatsApp para coordinar el pago y la fecha.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Número de WhatsApp</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="+1 809 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo Electrónico</label>
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} required 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="tu@correo.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nivel de Experiencia</label>
              <select name="experiencia" value={formData.experiencia} onChange={handleChange} required 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                <option value="" disabled>Selecciona una opción</option>
                <option value="ninguna">Ninguna (Empiezo desde cero)</option>
                <option value="basica">Básica (Conozco la teoría, pero no he invertido)</option>
                <option value="intermedia">Intermedia (Ya tengo cuenta en un broker)</option>
              </select>
            </div>
            <button type="submit" disabled={isSubmitting}
              className={`w-full text-white font-bold text-lg py-4 px-4 rounded-xl transition-all mt-4 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]'}`}>
              {isSubmitting ? 'Conectando...' : 'Ir a WhatsApp para agendar'}
            </button>
          </form>
        </div>
      </section>
      
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200">
        <p>© {new Date().getFullYear()} Inversor Libre por Nicolás. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;