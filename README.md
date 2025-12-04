# eCommerce Final - Entrega

Proyecto de ejemplo que cumple los requisitos de la entrega final del curso.

## Requisitos implementados (resumen)
- Carrito usando Context API (add, remove, clear).
- Autenticación simulada con AuthContext y localStorage. Rutas protegidas.
- CRUD de productos usando json-server (simula MockAPI).
- Validaciones en formulario (nombre obligatorio, precio > 0, descripción >= 10).
- Modal de confirmación antes de eliminar.
- Bootstrap + styled-components para diseño y responsividad.
- React Icons, React Toastify para interactividad y notificaciones.
- React Helmet para título/meta.
- Búsqueda en catálogo y paginación.
- README con instrucciones.

## Instalación y ejecución

1. Clonar o descomprimir el zip.
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar mock API (json-server) en el puerto 4000:
```bash
npm run mockapi
```
Esto servirá `http://localhost:4000/products` y por rutas definidas también `http://localhost:4000/api/products`.

4. En otra terminal iniciar la app:
```bash
npm run dev
```

5. Abrir `http://localhost:5173` (o URL que indique Vite).

**Notas:**
- Login simulado: cualquier email y password sirven (se guarda en localStorage).
- Para producción reemplazar json-server por MockAPI o backend real.
