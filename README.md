# 📚 I.E. Islas del Rosario — Sitio Web Oficial

Sitio web institucional completo para la **Institución Educativa Islas del Rosario**.
Desarrollado con HTML, CSS y JavaScript puro — sin frameworks, sin dependencias de instalación.

---

## 📁 Estructura de archivos

```
islas-del-rosario/
│
├── index.html                  ← Página principal (Inicio)
│
├── pages/
│   ├── nosotros.html           ← Historia, misión, visión, logros
│   ├── sedes.html              ← Las 3 sedes con información y mapa
│   ├── equipo.html             ← Equipo docente con filtros por área
│   ├── inscripciones.html      ← Proceso, formulario y requisitos
│   └── contacto.html          ← Datos, formulario y mapa
│
├── css/
│   ├── variables.css           ← Variables, reset, utilidades, botones, animaciones
│   ├── layout.css              ← Navbar, footer y botones flotantes
│   ├── home.css                ← Estilos exclusivos de index.html
│   └── pages.css              ← Estilos de todas las subpáginas
│
├── js/
│   └── main.js                 ← Todo el JavaScript del sitio
│
└── img/
    ├── logo/
    │   └── logo.png            ← ⬅ COLOCAR EL LOGO AQUÍ
    ├── hero/
    │   ├── estudiantes-1.jpg   ← Imagen slide 1 (derecha del hero)
    │   ├── estudiantes-2.jpg   ← Imagen slide 2
    │   └── estudiantes-3.jpg   ← Imagen slide 3
    └── colegio/
        └── bienvenida.jpg      ← Foto para sección "Bienvenida"
```

---

## 🚀 Cómo usar

1. **Abrir** `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
2. No requiere servidor local ni instalaciones. Funciona abriendo el archivo directamente.

> **Recomendado**: Para producción, subir todos los archivos a un hosting web (ej: Hostinger, GoDaddy, cPanel) tal como están.

---

## 🖼️ Reemplazar imágenes

| Ruta | Qué es |
|------|--------|
| `img/logo/logo.png` | Logo del colegio |
| `img/hero/estudiantes-1.jpg` | Foto de niños — slide 1 del hero |
| `img/hero/estudiantes-2.jpg` | Foto de niños — slide 2 del hero |
| `img/hero/estudiantes-3.jpg` | Foto de niños — slide 3 del hero |
| `img/colegio/bienvenida.jpg` | Foto del colegio — sección Bienvenida |

Mientras no tengas las fotos reales, los **placeholders** se muestran automáticamente.

---

## ⚙️ Configuración de publicidad (popup)

En `js/main.js`, busca la función `initAdModal()` y modifica:

```javascript
const AD_ENABLED = true;        // ← true = activa | false = desactiva
const AD_URL     = 'https://...'; // ← URL que abre al hacer clic en el botón
const AD_DELAY   = 1200;         // ← Tiempo en ms antes de mostrar el popup
```

Para cambiar la **imagen** del popup, edita en cada HTML:
```html
<!-- Reemplaza el div .ad-modal__placeholder con una img real: -->
<img src="img/publicidad/banner.jpg" alt="Publicidad" class="ad-modal__img">
```

---

## 🗺️ Agregar mapa de Google Maps

En `pages/sedes.html` y `pages/contacto.html`, busca el comentario:
```html
<!-- Reemplazar con iframe de Google Maps real -->
```

Reemplaza el `<div class="map-placeholder">` con el iframe de Google Maps:
1. Ve a [maps.google.com](https://maps.google.com)
2. Busca la dirección del colegio
3. Haz clic en "Compartir" → "Insertar un mapa"
4. Copia el `<iframe>` y pégalo en lugar del placeholder

---

## 📞 Actualizar datos de contacto

Busca y reemplaza en todos los archivos HTML:
- `(300) 123-4567` → Teléfono real
- `info@islasdelrosario.edu.co` → Correo real
- `https://wa.me/573001234567` → Número real de WhatsApp (formato internacional)
- `https://facebook.com` → URL real de Facebook
- `https://tiktok.com` → URL real de TikTok
- `https://instagram.com` → URL real de Instagram

---

## 🎨 Cambiar colores

En `css/variables.css`, modifica las variables:
```css
--color-primary:   #00a8e8;   /* Azul principal */
--color-secondary: #007ea7;   /* Azul secundario */
```

---

## 📱 Responsive

El sitio está optimizado para:
- 📱 Móviles (desde 320px)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Escritorio (1200px+)

---

## 🔧 Archivos CSS y su función

| Archivo | Función |
|---------|---------|
| `variables.css` | Variables de color, fuentes, espaciado, botones, animaciones de scroll |
| `layout.css` | Navbar fijo, menú móvil, footer, botones flotantes WhatsApp/Subir, modal publicidad |
| `home.css` | Hero slider, estadísticas, valores, programas, galería, noticias, CTA |
| `pages.css` | Timeline, sedes, equipo docente, formularios, contacto |

---

## ✨ Características implementadas

- ✅ Navbar fijo con sombra al scroll
- ✅ Menú hamburguesa animado para móviles
- ✅ Hero slider con 3 slides, auto-avance cada 7s, dots y flechas
- ✅ Animaciones de entrada con scroll (IntersectionObserver)
- ✅ Contadores animados de estadísticas
- ✅ Burbujas flotantes de tema marítimo
- ✅ Botón flotante de WhatsApp con tooltip
- ✅ Botón "Subir" que aparece al hacer scroll
- ✅ Popup de publicidad activable/desactivable
- ✅ Filtros de equipo docente por área
- ✅ Formularios con validación básica
- ✅ Footer completo con horarios, redes, links y copyright
- ✅ 100% responsive
- ✅ Todo comentado en español
- ✅ Accesibilidad básica (ARIA labels, roles, etc.)

---

*Desarrollado con ❤️ para la I.E. Islas del Rosario — 2026*
