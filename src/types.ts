/**
 * DEFINICIONES DE MODELOS (TypeScript)
 * 
 * Estos tipos definen la "forma" de los datos que viajan desde la base de datos
 * hacia los componentes de React. Ayudan a evitar errores de programación.
 */

// Representa una diapositiva del carrusel superior
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
  order: number;
}

// Representa una tarjeta de noticia en la sección de actualidad
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string; // Formato ISO para facilitar el formateo en la vista
  category: string;
  featured: boolean;
}

// Representa un botón de acceso rápido (ej: Campus Virtual)
export interface QuickLink {
  id: string;
  title: string;
  icon: string; // Nombre del icono de Lucide (ej: "BookOpen")
  url: string;
  colorClass: string; // Clase de Tailwind para el color (ej: "text-blue-500")
}

// Representa un contador estadístico (ej: "+128.000 Graduados")
export interface Statistic {
  id: string;
  label: string;
  value: string | number;
  order: number;
}

export interface CalendarActivity {
  id: string;
  date: string; // ISO format
  title: string;
  type: 'Examen' | 'Evento' | 'Académico' | 'Feriado';
  description?: string;
}

// Objeto contenedor que agrupa toda la información de la App
export interface AppData {
  banners: Banner[];
  news: NewsItem[];
  links: QuickLink[];
  stats: Statistic[];
  calendar: CalendarActivity[];
}
