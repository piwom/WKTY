# Wakitokys — ¿A dónde va?

Unboxing digital interactivo del segundo disco de **Wakitokys** (Buenos Aires, 2026).

## Stack
HTML + CSS + JS vanilla. Sin build step. Listo para Vercel.

## Estructura

```
.
├── index.html
├── styles.css
├── app.js
├── lyrics.js
├── vercel.json
└── assets/
    ├── img/
    │   ├── logo.png       (logo blanco)
    │   ├── cover.jpg      (tapa del disco)
    │   └── banda.jpg      (foto banda)
    └── audio/             ← agregar acá los previews
        ├── musica.mp3
        ├── china.mp3
        ├── noganoma.mp3
        ├── trance.mp3
        ├── el-dia.mp3
        ├── insomnio.mp3
        ├── cayendo.mp3
        └── hipnotizadx.mp3
```

## Audio

El player corta automáticamente a los 60 segundos con fade-out de 10s. Los archivos `.mp3` van en `assets/audio/` con los nombres que figuran en `app.js` (constante `TRACKS`).

Si todavía no tenés los previews, la página igual funciona — el visualizer hace una animación de fallback.

## Deploy en Vercel

1. Push del repo a GitHub.
2. En Vercel: **New Project → Import** el repo.
3. Framework Preset: **Other** (es estático puro).
4. Build Command: vacío. Output Directory: `./`.
5. Deploy.

`vercel.json` ya viene configurado con headers de cache para los assets.

## Local

Abrir `index.html` directo en el browser, o levantar un server simple:

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Interacciones

- **Tracklist** — carrusel horizontal swipeable. Tap en card → play. Tap en "letras" → modal con la letra.
- **Player** — barra fija abajo con visualizer reactivo (Web Audio API). Click en la barra de progreso = seek.
- **Créditos** — cards que se voltean al tap (rol → Instagram).
- **Foto banda** — parallax suave al scrollear.
- **Cursor / touch trail** — puntitos que siguen el dedo / mouse.
- **Easter egg** — tocar el logo de WKTY 5 veces, o tipear el código Konami (↑↑↓↓←→←→ b a).
- **Atajos teclado** — Espacio = play/pausa, ←/→ = track anterior/siguiente, Esc = cerrar modal.

## Branding

- **Wakitokys** © 2026 · Buenos Aires
- Producido por **Gabriel Biuso** · Distribuido por **Estudio INGA**
- Tipografías: Bebas Neue (display), Barlow Condensed (body), DM Mono (UI/labels) — cargadas desde Google Fonts.
