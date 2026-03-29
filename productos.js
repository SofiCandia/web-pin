// Productos por defecto (se cargan si no hay datos en localStorage)
const productosBase = [
  { id: 1, nombre: "Pin Sakura", categoria: "Anime", precio: 3200, descripcion: "Flor de cerezo esmaltada.", gradiente: "linear-gradient(135deg,#4a1520,#75202d)" },
  { id: 2, nombre: "Pin Katana", categoria: "Anime", precio: 3400, descripcion: "Katana minimal metal.", gradiente: "linear-gradient(135deg,#5b1e6c,#c048b8)" },
  { id: 3, nombre: "Pin Vinilo", categoria: "Música", precio: 3000, descripcion: "Disco retro con brillo.", gradiente: "linear-gradient(135deg,#1b3b2c,#111)" },
  { id: 4, nombre: "Pin Guitarra", categoria: "Música", precio: 3600, descripcion: "Guitarra eléctrica roja.", gradiente: "linear-gradient(135deg,#1f4d34,#0b0b0b)" },
  { id: 5, nombre: "Pin Paleta Arte", categoria: "Arte", precio: 2800, descripcion: "Paleta con toques de color.", gradiente: "linear-gradient(135deg,#ff9a8b,#ff6a88)" },
  { id: 6, nombre: "Pin Lienzo", categoria: "Arte", precio: 3500, descripcion: "Mini lienzo abstracto.", gradiente: "linear-gradient(135deg,#f6d365,#fda085)" },
  { id: 7, nombre: "Pin Carita", categoria: "Humor", precio: 2500, descripcion: "Sonrisa irónica esmaltada.", gradiente: "linear-gradient(135deg,#303030,#ffb347)" },
  { id: 8, nombre: "Pin Meme", categoria: "Humor", precio: 2700, descripcion: "Formato meme clásico.", gradiente: "linear-gradient(135deg,#2b2b2b,#e07a5f)" },
  { id: 9, nombre: "Pin Inicial", categoria: "Personalizado", precio: 3800, descripcion: "Inicial en relieve dorado.", gradiente: "linear-gradient(135deg,#6b4c2f,#c8a97e)" },
  { id: 10, nombre: "Pin Logo Propio", categoria: "Personalizado", precio: 4000, descripcion: "Tu logo en metal premium.", gradiente: "linear-gradient(135deg,#217649,#b8db61)" }
];