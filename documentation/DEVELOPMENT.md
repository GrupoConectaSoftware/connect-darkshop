# Guía de desarrollo

## Requisitos

- Node.js instalado.
- npm disponible en la terminal.

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

## Comandos principales

```bash
# Servidor de desarrollo con recarga automática
npm run dev

# Validación de producción
npm run build

# Revisión de reglas ESLint
npm run lint

# Previsualización del build generado
npm run preview
```

En Windows, si PowerShell bloquea `npm.ps1`, se pueden usar `npm.cmd run dev`, `npm.cmd run build` y los demás comandos con el mismo formato.

## Cómo agregar una nueva sección a la home

1. Crear un componente dentro de `src/features/users/consumer/homepages/sections/`.
2. Exportarlo como `default`.
3. Importarlo en `homepages.jsx`.
4. Insertarlo en el orden narrativo adecuado.
5. Agregar estilos en `src/css/index.css` solamente si no existe una clase reutilizable.
6. Ejecutar `npm run lint` y `npm run build`.

Ejemplo mínimo:

```jsx
export default function NewSection() {
  return <section className="section new-section">Contenido</section>
}
```

## Cómo agregar una ruta

En `src/App.jsx` se agrega una ruta dentro de `Routes`:

```jsx
<Route path="/catalogo" element={<Catalog />} />
```

Las rutas deben usar nombres claros y consistentes. Los enlaces entre páginas deben usar `Link` de `react-router-dom`; los enlaces hacia secciones de la misma página pueden usar anclas como `#coleccion`.

## Convenciones

- Componentes en PascalCase.
- Un componente principal por archivo.
- Imports relativos y rutas que respeten mayúsculas/minúsculas.
- Mantener la lógica de navegación en `App.jsx`.
- Mantener la composición de la home en `homepages.jsx`.
- Evitar concentrar estilos inline cuando el estilo sea reutilizable.
- Antes de entregar cambios: ejecutar lint y build.

## Dependencias actuales importantes

- `react`: componentes de interfaz.
- `react-dom`: montaje de React en el navegador.
- `react-router-dom`: navegación y rutas.
- `vite`: servidor y empaquetado.
- `lucide-react`: iconos disponibles para futuras vistas.
- `tailwindcss`: soporte de utilidades, integrado mediante Vite.
