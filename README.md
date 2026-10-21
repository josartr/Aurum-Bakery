# Aurum Bakery

Sitio web de **Aurum Bakery**, una pastelería artesanal de alto nivel. La aplicación está construida con React + Vite y ofrece una experiencia de compra y contacto enfocada en marca premium.

## Funcionalidades

- Inicio con carrusel automático de productos destacados.
- Catálogo responsive con filtros por categoría y búsqueda.
- Modal de detalle para cada producto con información completa.
- Carrito de compras con contador, cantidad editable, eliminación y cálculo de subtotal, despacho y total.
- Feedback visual al agregar productos: mensaje emergente de confirmación en cada acción.
- Página de eventos con estimador de presupuesto para cotizaciones.
- Formulario de contacto con resumen automático de compra o cotización.
- Navegación SPA con React Router.
- Diseño responsive para escritorio, tablet y móvil.

## Tecnologías

- React 19
- React Router DOM
- Vite
- JavaScript moderno
- CSS responsive
- Google Fonts: Playfair Display y DM Sans
- Vitest + Testing Library

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para crear el bundle de producción:

```bash
npm run build
```

Para ejecutar la suite de pruebas:

```bash
npm test -- --run
```

## Estructura del proyecto

```text
src/
├── App.jsx          # Enrutamiento principal y estado global del carrito
├── App.css          # Estilos visuales completos de la app
├── index.css        # Reset global y tipografía base
├── main.jsx         # Punto de entrada de React y Router
├── components/      # Header, Footer y componentes reutilizables
├── data/            # Productos y páginas del sitio
├── pages/           # Inicio, catálogo, eventos, carrito y contacto
├── utils/           # Utilidades como formateo de moneda
└── setupTests.js    # Configuración de pruebas globales
```

## Flujo de compra

1. El usuario explora el catálogo.
2. Agrega productos desde tarjetas o modal de detalle.
3. Cada acción muestra un mensaje de confirmación: "X agregado al carrito".
4. Puede ajustar cantidades o eliminar artículos desde la vista del carrito.
5. Continúa con el proceso de compra en la página de contacto.
6. El formulario pre-carga un resumen del pedido o de la cotización.

## Próximas mejoras recomendadas

- Conectar el carrito y contacto a una API real.
- Agregar una pantalla final de confirmación de pedido.
- Implementar validación avanzada de stock.
- Reemplazar imágenes externas por recursos locales optimizados.
- Mejorar la experiencia con animaciones más elaboradas y hooks reutilizables.
