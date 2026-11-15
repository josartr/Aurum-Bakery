# Aurum Bakery

Sitio web de **Aurum Bakery**, pastelería artesanal y taller en Providencia, Santiago de Chile. Aplicación SPA construida con React y Vite que combina catálogo interactivo, carrito persistente, sección editorial de historia del obrador y cotizador de mesas dulces para eventos.

## Funcionalidades

- **Inicio (`#/inicio`)**: Hero editorial con carrusel de 4 diapositivas, sección cálida **Acerca de nosotros**, pilares de oficio artesanal, selección de favoritos de la casa y llamado a eventos.
- **Catálogo interactivo (`#/catalogo`)**:
  - **24 productos** con fotografía de estudio local organizada en 6 categorías: **Tortas**, **Bollería**, **Pasteles**, **Galletas**, **Panadería** y **Brunch** (`Brunch Aurum` y `Brunch Americano` individuales).
  - **Skeleton screens minimalistas** (`ProductGridSkeleton`, `ProductCardSkeleton` y `MediaImage`) durante transiciones de categoría y carga de imágenes.
  - **3 tamaños adaptados por tipo de torta** (porciones y precios dinámicos según arquitectura de cada torta).
  - **Selección guiada**: al presionar **Añadir al carrito** en productos con múltiples sabores, rellenos o tamaños se abre el modal de detalle para elegir las opciones antes de agregarlos.
  - Buscador en tiempo real por nombre, categoría o relleno.
- **Acerca de nosotros (`#/nosotros`)**: Historia del obrador en Providencia, pilares de oficio, hospitalidad y materias primas nobles.
- **Eventos (`#/eventos`)**: Hero editorial, 4 categorías de celebraciones, 3 paquetes de mesas dulces (20, 50 y 100 invitados), carta de sabores (bizcochos, rellenos y coberturas), calculadora interactiva, formulario de cotización y 5 preguntas frecuentes (FAQ).
- **Contacto (`#/contacto`)**: Información de atención del atelier, validación HTML y envío prellenado de solicitudes desde Eventos.
- **Carrito lateral (`CartDrawer`)**: Estado global (`CartContext`) con persistencia en `localStorage`, control de cantidades, selección de retiro en tienda o despacho y resumen de pedido.
- **Identidad visual unificada**: Cabecera y pie de página en petróleo profundo (`#0D3B44`), superficies en alabastro (`#FAF8F4`), acentos en oro champagne (`#C9A449`), isotipo SVG propio (`BrandLogo`, `favicon.svg`) y navegación por hash routing sin servidor adicional.

## Tecnologías

- React 19
- Vite 8
- JavaScript moderno (ES Modules)
- CSS personalizado y responsive (`index.css`, `App.css`)
- Google Fonts: `Playfair Display` y `DM Sans`
- Vitest + Testing Library (`@testing-library/react`, `jsdom`) y ESLint

## Ejecutar localmente

```bash
npm install
npm run dev
```

Compilar para producción:

```bash
npm run build
```

Previsualizar el build de producción:

```bash
npm run preview
```

Revisar calidad del código (lint):

```bash
npm run lint
```

Ejecutar pruebas unitarias y de componentes:

```bash
npx vitest run
```

## Estructura

```text
public/
└── favicon.svg                # Isotipo vectorial de Aurum Bakery
src/
├── assets/
│   └── images/                # 24 fotografías de catálogo, héroes y secciones editoriales
├── components/
│   ├── BrandLogo.jsx          # Isotipo BrandMark e ícono CartIcon
│   ├── CartDrawer.jsx         # Panel lateral del carrito y confirmación de pedido
│   ├── Footer.jsx             # Pie de página institucional y navegación
│   ├── Header.jsx             # Cabecera principal y acceso al carrito
│   ├── MediaImage.jsx         # Carga de imágenes con skeleton y fallback vectorial
│   └── ProductSkeleton.jsx    # Marcadores skeleton minimalistas para la grilla
├── context/
│   ├── CartContext.jsx        # Provider y persistencia del carrito en localStorage
│   └── cartContextObject.js   # Definición del contexto del carrito
├── data/
│   ├── pages.js               # Rutas válidas de la SPA
│   └── products.js            # Catálogo completo con categorías, opciones y tamaños
├── hooks/
│   └── useCart.js             # Hook de acceso al carrito
├── pages/
│   ├── Catalogo.jsx           # Catálogo filtrable, skeletons y modal de selección
│   ├── Contacto.jsx           # Formulario de contacto y horario del atelier
│   ├── Eventos.jsx            # Paquetes de mesas dulces, sabores, cotizador y FAQ
│   ├── Inicio.jsx             # Portada, carrusel, Acerca de nosotros y destacados
│   └── Nosotros.jsx           # Página dedicada Acerca de nosotros
├── utils/
│   └── formatters.js          # Formateo de moneda CLP y utilidades
├── App.css                    # Sistema de diseño, paleta y estilos responsive
├── App.jsx                    # Enrutamiento por hash y composición principal
├── index.css                  # Tipografía, variables base y reset global
├── main.jsx                   # Punto de entrada de React
└── setupTests.js              # Configuración de Testing Library para Vitest
```

## Próximas mejoras recomendadas

- Conectar los formularios de contacto y cotización de eventos a una API o servicio de mensajería transaccional.
- Gestionar el catálogo, stock diario y pedidos desde un backend con pasarela de pagos.
- Incorporar React Router si la aplicación requiere URLs limpias en servidor o rutas privadas.
