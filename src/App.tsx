import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Info, 
  GraduationCap, 
  Award, 
  Wrench, 
  Facebook, 
  Instagram, 
  Youtube, 
  BarChart2, 
  BookOpen, 
  FileText, 
  Radio,
  ChevronRight,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { dataService } from './services/dataService';
import { Banner, CalendarActivity, NewsItem, QuickLink, Statistic } from './types';

// Componente auxiliar para mapear nombres de iconos de texto a componentes Lucide
// Esto permite que la base de datos solo envíe un string como "BarChart2"
const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = {
    BarChart2,
    BookOpen,
    FileText,
    Radio
  };
  const Icon = icons[name] || Info;
  return <Icon className={className} />;
};

export default function App() {
  // --- ESTADOS DE DATOS (Simulación de Base de Datos) ---
  const [banners, setBanners] = useState<Banner[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [stats, setStats] = useState<Statistic[]>([]);
  const [calendar, setCalendar] = useState<CalendarActivity[]>([]);
  
  // --- ESTADOS DE INTERFAZ ---
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // EFECTO: Carga inicial de datos desde el servicio
  useEffect(() => {
    async function loadAllData() {
      try {
        setLoading(true);
        // Llamada paralela a todos los endpoints simulados
        const [bannersData, newsData, linksData, statsData, calendarData] = await Promise.all([
          dataService.getBanners(),
          dataService.getNews(),
          dataService.getQuickLinks(),
          dataService.getStats(),
          dataService.getCalendarActivities()
        ]);
        
        setBanners(bannersData);
        setNews(newsData);
        setLinks(linksData);
        setStats(statsData);
        setCalendar(calendarData);
      } catch (error) {
        console.error("Error cargando los datos de la aplicación:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, []);

  // EFECTO: Temporizador para el cambio automático del Carrusel (cada 6 segundos)
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // VISTA DE CARGA: Se muestra mientras se "obtienen" los datos del servicio
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-utn-blue animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium animate-pulse">Cargando información universitaria...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* 
          =============================================
          HEADER / NAVEGACIÓN 
          Representa la barra superior con logo y menú
          =============================================
      */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img 
              src="https://www.frre.utn.edu.ar/static/img/LOGO.png" 
              alt="UTN Logo" 
              className="h-10 md:h-14"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="group relative">
              <button className="nav-link flex items-center py-2">
                Institucional <ChevronDown size={14} className="ml-1 opacity-50" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] min-w-[240px] py-3 rounded-b-md border-t-2 border-utn-blue">
                <a href="#" className="block px-6 py-2 hover:bg-gray-50 text-sm">Autoridades</a>
                <a href="#" className="block px-6 py-2 hover:bg-gray-50 text-sm">Consejo Directivo</a>
                <div className="border-t border-gray-100 my-2 mx-4"></div>
                <span className="block px-6 py-1 text-[10px] font-bold text-blue-800 uppercase tracking-widest">Secretarías</span>
                <a href="#" className="block px-6 py-2 hover:bg-gray-50 text-sm">Secretaría Académica</a>
                <a href="#" className="block px-6 py-2 hover:bg-gray-50 text-sm">Secretaría de Extensión</a>
              </div>
            </div>
            <div className="group relative">
              <button className="nav-link flex items-center py-2">
                Carreras <ChevronDown size={14} className="ml-1 opacity-50" />
              </button>
            </div>
            <a href="#" className="nav-link">Relaciones Internacionales</a>
            <a href="#" className="nav-link">Noticias</a>
            <a href="#" className="nav-link">Investigación</a>
            <a href="#" className="nav-link">Calendario</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600 focus:outline-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Institucional</a>
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Carreras</a>
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Relaciones Internacionales</a>
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Noticias</a>
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Investigación</a>
                <a href="#" className="font-semibold text-lg border-b border-gray-50 pb-2">Calendario</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* 
            =============================================
            BARRA DE ACCESO RÁPIDO (CTA)
            Sección azul con botones de Ingreso, Grado, etc.
            =============================================
        */}
        <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-8 border-b border-blue-400/20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-xs text-blue-200 uppercase tracking-widest font-black block mb-2">Relaciones internacionales</span>
              <h2 className="text-3xl font-extrabold tracking-tight">Convertí tu formación técnica en una experiencia global</h2>
            </div>
          </div>
        </div>

        {/* 
            =============================================
            CARRUSEL PRINCIPAL (Hero Section)
            Muestra los banners destacados con animaciones
            =============================================
        */}
        {banners.length > 0 && (
          <section className="relative overflow-hidden h-[500px] md:h-[650px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${banners[currentBanner].image})` }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
                </div>
                <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="max-w-3xl"
                  >
                    <h1 className="text-4xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
                      {banners[currentBanner].title}
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 mb-10 font-medium max-w-2xl border-l-4 border-utn-blue pl-6 py-2">
                      {banners[currentBanner].subtitle}
                    </p>
                    <a 
                      href={banners[currentBanner].link || "#"}
                      className="bg-utn-blue hover:bg-blue-700 text-white px-10 py-4 rounded-xl shadow-xl shadow-blue-900/20 transition-all font-bold uppercase tracking-widest text-sm inline-block"
                    >
                      Más información
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 hidden md:flex">
              <button 
                onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
                className="bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
                className="bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {banners.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-2 transition-all duration-500 rounded-full ${idx === currentBanner ? 'w-10 bg-utn-blue shadow-lg shadow-blue-500/50' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* 
            =============================================
            SECCIÓN DE NOTICIAS
            Muestra las últimas novedades en tarjetas (Cards)
            =============================================
        */}
        <section className="py-24 container mx-auto px-4">
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <div className="h-1 w-10 bg-utn-blue"></div>
                <span className="text-gray-400 uppercase tracking-widest text-xs font-black">Actualidad</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Últimas Noticias</h2>
            </div>
            <a href="#" className="text-utn-blue font-bold flex items-center gap-2 hover:gap-3 transition-all justify-center">
              Ver todas las noticias <ChevronRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {news.map((item, idx) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden flex flex-col group shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="h-56 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 text-left flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-gray-400 mb-4 font-bold text-[10px] uppercase">
                    <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                    {new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-extrabold mb-4 group-hover:text-utn-blue transition-all cursor-pointer leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <button className="text-gray-900 font-black text-xs uppercase tracking-widest hover:text-utn-blue transition-colors flex items-center gap-1 group/btn">
                      Leer más <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 
            =============================================
            CONTADORES / ESTADÍSTICAS
            Barra oscura con números destacados
            =============================================
        */}
        <section className="bg-gray-900 py-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-1/2"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center max-w-6xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.id} className="group">
                  <div className="text-5xl font-black text-white mb-3 group-hover:text-utn-blue transition-colors duration-300">{stat.value}</div>
                  <div className="w-8 h-1 bg-utn-blue mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
            =============================================
            SECCIÓN INSTAGRAM
            Invitación a seguir las redes sociales
            =============================================
        */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 rounded-[40px] p-12 md:p-20 border border-pink-100/50 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
                  <Instagram size={14} /> @RRII.FRRE
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Viví la experiencia en <span className="text-pink-600">tiempo real</span>
                </h2>
                <p className="text-gray-600 text-lg font-medium mb-8">
                  Seguinos en Instagram para enterarte de convocatorias relámpago, ver historias de alumnos en el exterior y sumarte a nuestra comunidad global.
                </p>
                <a 
                  href="https://www.instagram.com/rrii.frre/?hl=es-la" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl shadow-pink-200"
                >
                  Seguinos ahora <ChevronRight size={20} />
                </a>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-pink-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-3 group-hover:skew-y-0 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop" alt="Instagram Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                      <span className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Instagram size={14} /> RRII UTN FRRe
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
            =============================================
            LINKS DE INTERÉS (Accesos Rápidos)
            Tarjeta interactivas para Sysacad, Campus, etc.
            =============================================
        */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Autogestión y Recursos</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">Accesos rápidos para alumnos, docentes y personal de la facultad.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {links.map((link) => (
              <a 
                key={link.id}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-8 bg-white border border-gray-100 rounded-3xl hover:border-utn-blue hover:shadow-2xl hover:shadow-blue-900/10 transition-all group relative overflow-hidden flex-1 min-w-[300px] max-w-[400px]"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-utn-blue scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
                <div className={`bg-gray-50 p-5 rounded-2xl group-hover:bg-blue-50 transition-colors shadow-inner`}>
                  <IconComponent name={link.icon} className={`text-3xl ${link.colorClass}`} />
                </div>
                <div>
                  <span className="font-extrabold text-gray-900 block mb-1 group-hover:text-utn-blue transition-colors text-sm uppercase tracking-tight">{link.title}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entrar →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 
            =============================================
            CALENDARIO ACADÉMICO
            Muestra las actividades y eventos programados
            =============================================
        */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-utn-blue font-black text-[10px] px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                Agenda Universitaria
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Calendario <span className="text-utn-blue">de Eventos</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-medium">Mantenete informado sobre las fechas clave.</p>
            </div>

            <div className="flex justify-center">
              {/* Eventos Próximos (2026) */}
              <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-8 border-b-2 border-utn-blue pb-2">
                  <h3 className="text-2xl font-black text-gray-900">Ciclo Lectivo 2026</h3>
                  <span className="text-utn-blue font-bold text-sm tracking-widest uppercase">Próximas Fechas</span>
                </div>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                  {calendar.filter(act => act.date.startsWith('2026')).map((event) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="bg-white p-6 rounded-2xl flex items-center gap-6 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-100"
                    >
                      <div className="flex-shrink-0 text-center w-16">
                        <div className="text-xs font-black text-utn-blue uppercase tracking-tighter">
                          {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                        </div>
                        <div className="text-3xl font-black text-gray-900">
                          {new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            event.type === 'Examen' ? 'bg-red-100 text-red-600' :
                            event.type === 'Feriado' ? 'bg-amber-100 text-amber-600' :
                            event.type === 'Evento' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-gray-900">{event.title}</h4>
                      </div>
                      <button className="text-gray-300 hover:text-utn-blue transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* 
          =============================================
          FOOTER (Pie de página)
          Información de contacto, logo y mapa
          =============================================
      */}
      <footer className="bg-white py-24 border-t border-gray-100 text-gray-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <img 
                src="https://www.frre.utn.edu.ar/static/img/LOGO.png" 
                alt="UTN Logo Footer" 
                className="h-16 mb-8"
              />
              <p className="text-sm leading-relaxed mb-8 max-w-sm">
                Facultad Regional Resistencia de la Universidad Tecnológica Nacional. Pioneros en la formación técnica y científica en el Chaco.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white hover:scale-110 shadow-sm transition-all"><Facebook size={20} /></a>
                <a href="#" className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-pink-600 hover:text-white hover:scale-110 shadow-sm transition-all"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white hover:scale-110 shadow-sm transition-all"><Youtube size={20} /></a>
              </div>
            </div>
            
            <div className="md:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em] mb-8">Facultad</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="hover:text-utn-blue transition-colors font-medium">Relaciones Internacionales</a></li>
                  <li><a href="#" className="hover:text-utn-blue transition-colors font-medium">Autoridades</a></li>
                  <li><a href="#" className="hover:text-utn-blue transition-colors font-medium">Ubicación</a></li>
                  <li><a href="#" className="hover:text-utn-blue transition-colors font-medium">Información</a></li>
                  <li><a href="#" className="hover:text-utn-blue transition-colors font-medium">Transparencia</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em] mb-8">Contacto</h3>
                <p className="text-sm mb-4">French 414, Resistencia<br />Chaco, Argentina</p>
                <p className="text-sm mb-2 font-bold text-gray-900">3624 432928</p>
                <p className="text-sm font-medium text-utn-blue">extuniv@frre.utn.edu.ar</p>
              </div>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em] mb-8">Nuestro Campus</h3>
              <div className="rounded-3xl overflow-hidden h-56 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.582700132908!2d-58.98159762481162!3d-27.45111301591398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0ba20d4f7%3A0x931cab3d305f0437!2sC.%20French%20414%2C%20H3500%20Resistencia%2C%20Chaco!5e0!3m2!1ses-419!2sar!4v1713911000000!5m2!1ses-419!2sar" 
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700" 
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-400">
            <div>© 2026 Universidad Tecnológica Nacional - FRRe</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gray-600 transition-colors">Términos</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
