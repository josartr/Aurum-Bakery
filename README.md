# Aurum Bakery

Sitio web de **Aurum Bakery**, una pastelería artesanal de alto nivel. Esta versión adapta el proyecto HTML original a una aplicación moderna con React y Vite.

## Funcionalidades

- Página de inicio con carrusel automático de productos destacados.
- Catálogo responsive con tarjetas y detalles de cada producto en un modal accesible.
- Página de eventos con llamada a la acción para solicitar cotizaciones.
- Formulario de contacto con validación HTML y confirmación visual.
- Header y footer reutilizables como componentes React.
- Navegación interna con hash routing, sin depender de un servidor adicional.
- Diseño responsive para escritorio, tablet y móvil.

## Tecnologías

- React
- Vite
- JavaScript moderno
- CSS responsive
- Google Fonts: Playfair Display y DM Sans

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para crear el bundle de producción:

```bash
npm run build
```

Para revisar la calidad del código:

```bash
npm run lint
```

## Estructura

```text
src/
├── App.jsx       # Componentes, páginas y navegación de la aplicación
├── App.css       # Sistema visual y estilos responsive
├── index.css     # Estilos globales y tipografía
└── main.jsx      # Punto de entrada de React
```

## Próximas mejoras recomendadas

- Reemplazar las imágenes externas por recursos optimizados en `src/assets`.
- Conectar el formulario de contacto a una API o servicio de correo.
- Modelar productos y cotizaciones desde un backend.
- Agregar pruebas de componentes y pruebas end-to-end.
- Incorporar React Router cuando la aplicación requiera URLs independientes y rutas protegidas.
