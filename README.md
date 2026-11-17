# Aurum Bakery — Frontend (React 19 + Vite)

Sitio web y aplicación e-commerce de **Aurum Bakery**, pastelería artesanal y taller en Providencia, Santiago de Chile. SPA construida con React, Vite, `HashRouter` y Axios, conectada al backend de microservicios **`aurum-bakery-backend`** a través de su API Gateway (`:8080`).

---

## Funcionalidades

- **Inicio (`#/inicio`):** Hero editorial con carrusel de 4 diapositivas, sección **Acerca de nosotros**, pilares del oficio artesanal, productos destacados sincronizados con el backend y llamado a eventos.
- **Catálogo interactivo híbrido (`#/catalogo`):**
  - Se conecta a `GET /api/bff/catalog-view` y fusiona los datos en vivo de PostgreSQL (precios, stock, altas y eliminaciones desde Admin) con los metadatos locales de `src/data/products.js` mediante `src/utils/catalogMapper.js`.
  - Conserva las **24 creaciones** con fotografía local, **6 categorías** (**Tortas**, **Bollería**, **Pasteles**, **Galletas**, **Panadería**, **Brunch**), skeletons minimalistas, buscador en tiempo real y modal con sabores/variedades y 3 tamaños por torta.
  - Los productos nuevos creados desde el panel Admin aparecen automáticamente en el catálogo.
- **Autenticación (`#/login`, `#/register`):**
  - Login (`POST /api/auth/login`) y registro de clientes (`POST /api/auth/register`, contraseña mínima de 6 caracteres) con persistencia de sesión JWT en `localStorage` (`AuthContext`).
  - Redirección automática según rol: `ADMIN` → `#/admin`, `CLIENT` → `#/`.
- **Panel Administrativo (`#/admin`, protegido por `ProtectedRoute` con `requiredRole="ADMIN"`):**
  - Métricas agregadas vía BFF (`GET /api/bff/admin-dashboard`): total de usuarios, total de productos y mensajes sin leer (`unreadMessagesCount`).
  - Creación y eliminación de productos (`POST /api/products`, `DELETE /api/products/{id}`).
  - Bandeja de mensajes de contacto (`GET /api/contact`), marcar como leído (`PATCH /api/contact/{id}/read`) y eliminar (`DELETE /api/contact/{id}`).
- **Eventos (`#/eventos`) y Contacto (`#/contacto`):** Calculadora interactiva de mesas dulces con cotización prellenada hacia `#/contacto` y envío directo al backend (`POST /api/contact`).
- **Carrito lateral (`CartDrawer`):** Persistencia en `localStorage` (`CartContext`), control de cantidades y selección de retiro en tienda o despacho.

---

## Conexión con el Backend (`aurum-bakery-backend`)

1. Levantar primero el backend Dockerizado en `aurum-bakery-backend`:
   ```bash
   docker compose up -d
   ```
   Esto expone el API Gateway en `http://localhost:8080` (con CORS habilitado para `http://localhost:3000`).

2. Verificar el archivo `.env` en la raíz de `Aurum-Bakery`:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

3. Levantar el frontend localmente con Vite (no requiere Docker):
   ```bash
   npm install
   npm run dev
   ```
   La aplicación queda disponible en **`http://localhost:3000`**.

> **Credenciales de prueba (Admin semilla Flyway):** `admin@tienda.cl` / `admin123`.
> Documentación detallada, bitácora de integración, guía de estudio y solicitudes HTTP explicadas disponibles en `../aurum-bakery-backend/docs/BITACORA_GUIA_ESTUDIO_HTTP.md`.

---

## Tecnologías

- React 19 + React Router DOM 7 (`HashRouter`)
- Vite 8
- Axios (interceptores JWT y manejo de `401` compatible con `HashRouter`)
- CSS personalizado (`index.css`, `App.css`)
- Vitest + Testing Library (`@testing-library/react`, `jsdom`) y ESLint

---

## Scripts disponibles

```bash
# Desarrollo en http://localhost:3000
npm run dev

# Compilación de producción
npm run build

# Previsualización del build
npm run preview

# Linter
npm run lint

# Pruebas unitarias y de componentes
npx vitest run
```

---

## Estructura del proyecto

```text
public/
└── favicon.svg                  # Isotipo vectorial de Aurum Bakery
src/
├── assets/images/               # Fotografías locales de catálogo, héroes y atelier
├── components/
│   ├── AdminRoute.jsx           # Guardia heredado (ruta admin usa ProtectedRoute)
│   ├── BrandLogo.jsx            # Isotipo BrandMark e ícono CartIcon
│   ├── CartDrawer.jsx           # Panel lateral del carrito
│   ├── Footer.jsx               # Pie de página institucional
│   ├── Header.jsx               # Navegación, sesión de usuario y acceso Admin
│   ├── MediaImage.jsx           # Carga de imágenes con skeleton y fallback
│   ├── ProductSkeleton.jsx      # Skeletons de grilla
│   └── ProtectedRoute.jsx       # Protección de rutas autenticadas y por rol
├── context/
│   ├── AuthContext.jsx          # Estado de sesión JWT, login, logout y rol
│   ├── CartContext.jsx          # Estado global del carrito en localStorage
│   └── cartContextObject.js
├── data/
│   ├── pages.js                 # Páginas públicas de navegación
│   └── products.js              # Catálogo base (metadatos ricos, sabores y tamaños)
├── hooks/
│   └── useCart.js
├── pages/
│   ├── AdminDashboardPage.jsx   # Panel administrativo (métricas, productos, mensajes)
│   ├── Catalogo.jsx             # Catálogo híbrido conectado al BFF
│   ├── Contacto.jsx             # Formulario conectado a POST /api/contact
│   ├── Eventos.jsx              # Cotizador interactivo de mesas dulces
│   ├── Inicio.jsx               # Portada y destacados sincronizados con el BFF
│   ├── LoginPage.jsx            # Inicio de sesión conectado a POST /api/auth/login
│   ├── Nosotros.jsx             # Historia del atelier
│   └── RegisterPage.jsx         # Registro conectado a POST /api/auth/register
├── services/
│   ├── api.js                   # Instancia Axios + interceptores Bearer y 401
│   ├── authService.js           # Login, registro y persistencia de sesión
│   ├── bffService.js            # /bff/catalog-view y /bff/admin-dashboard
│   ├── contactService.js        # Envío, listado, lectura y borrado de mensajes
│   ├── index.js                 # Exportaciones centralizadas
│   └── productService.js        # CRUD de /products
├── utils/
│   ├── catalogMapper.js         # Fusión híbrida API backend + catálogo visual local
│   └── formatters.js            # Formateo de moneda CLP
├── App.css
├── App.jsx                      # HashRouter y definición de rutas
├── index.css
├── main.jsx
└── setupTests.js
```
