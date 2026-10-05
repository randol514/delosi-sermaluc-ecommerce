# Delosi Ecommerce

Aplicación de catálogo y detalle de productos construida con Next.js App Router como solución al reto técnico Frontend Senior de Delosi.

## Requisitos

- Node.js 20 o superior.
- npm.

## Instalación y ejecución

```bash
npm ci
```

Crea `.env.local` en la raíz del proyecto. Puedes partir de `.env.example`:

```env
FAKE_STORE_API_URL=https://fakestoreapi.com
USE_MOCK_PRODUCTS=false
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para trabajar sin depender de Fake Store API, establece `USE_MOCK_PRODUCTS=true` en `.env.local` y reinicia el servidor. La aplicación utilizará el catálogo local de demostración.

## Rutas principales

- `/`: catálogo con filtro por categoría y búsqueda por nombre.
- `/?category=electronics&q=wireless`: ejemplo de URL compartible con filtros aplicados.
- `/products/[id]`: detalle del producto y metadata dinámica.
- `/products`: redirección permanente al catálogo en `/`.

El catálogo obtiene productos y categorías en el Server Component de la página raíz. El primer filtrado también ocurre en el servidor. Los controles interactivos mantienen los valores `category` y `q` en la URL.

## Datos y resiliencia

La integración con Fake Store API se centraliza en `modules/products/api/products.ts`:

- Productos: `${FAKE_STORE_API_URL}/products`.
- Categorías: `${FAKE_STORE_API_URL}/products/categories`.
- Detalle: `${FAKE_STORE_API_URL}/products/{id}`.
- Las respuestas se revalidan cada hora y cada petición tiene un timeout de 5 segundos.
- `USE_MOCK_PRODUCTS=true` fuerza el uso del fixture local.
- Si falla la carga del catálogo por red o por una respuesta no exitosa, se usa `modules/products/data/mock-products.ts`.
- Si falla solo la carga de categorías, se derivan desde el catálogo recibido.
- Un `404` real al pedir un producto se conserva como producto inexistente. Ante una caída de API, el detalle usa el producto mock correspondiente si está disponible.

Las imágenes se renderizan con `next/image`. Los mocks usan el placeholder local `public/products/product-placeholder.svg`; las imágenes remotas permitidas se limitan a `fakestoreapi.com/img/**` en `next.config.ts`. Si una imagen falla al cargar, `ProductImage` muestra el placeholder local.

## Carrito

El estado global se gestiona con Zustand en `modules/cart/store/cart-store.ts`. Agregar un producto existente incrementa su cantidad; desde el drawer se puede quitar una línea. El Header muestra el total de unidades y el resumen calcula el total del carrito.

El middleware `persist` guarda únicamente los artículos en `localStorage` con la clave `delosi-cart`. La hidratación se inicia en cliente para evitar discrepancias con el HTML generado por el servidor; el botón de agregar permanece deshabilitado hasta que termina.

Esta persistencia es adecuada para la demostración del reto. En una tienda real, el servidor debe validar precio e inventario al confirmar una compra.

## Estructura

```text
app/                         Rutas, metadata y estados de carga/error de Next
modules/products/            API, tipos, fixture y componentes del catálogo
modules/cart/                Store, hook y componentes del carrito
shared/components/           Componentes de interfaz reutilizables
styles/                      Tokens, estilos base y Sass global
tests/                       Pruebas unitarias con Vitest
```

## Comandos

```bash
npm run dev       # Servidor local
npm run lint      # ESLint
npm test          # Pruebas unitarias
npm run build     # Build de producción y verificación de tipos
npm start         # Servidor de producción después del build
```

Las pruebas cubren las acciones principales del store (agregar, incrementar y quitar) y casos de la capa de productos (fallback ante `522` y respuesta `404`).

## Tecnologías

- Next.js 16 con App Router y React 19.
- TypeScript.
- Sass para estilos.
- Zustand para el estado y persistencia del carrito.
- Vitest para pruebas unitarias.
- Fake Store API como fuente externa de productos.
