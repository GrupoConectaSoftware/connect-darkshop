# Arquitectura del proyecto

## Flujo de arranque

```text
index.html
  └── src/main.jsx
        └── src/App.jsx
              └── BrowserRouter
                    ├── /       → Homepages
                    └── *       → redirección a /
```

`src/main.jsx` crea el root de React y renderiza `App` dentro de `StrictMode`. `src/App.jsx` es el punto central de navegación. La ruta comodín evita que una URL desconocida deje la aplicación en blanco y devuelve al usuario a la página principal.

## Estructura de código

```text
src/
├── App.jsx                         # Router principal
├── main.jsx                        # Punto de entrada de React
├── css/
│   └── index.css                   # Estilos globales y responsive
└── features/
    └── users/consumer/homepages/
        ├── homepages.jsx           # Composición de la página principal
        ├── layouts/                # Elementos compartidos de la página
        │   ├── navLayout.jsx
        │   └── footerLoyout.jsx
        └── sections/               # Secciones independientes de contenido
            ├── introductionSection.jsx
            ├── ouletSection.jsx
            ├── comunitySection.jsx
            ├── categoriesSection.jsx
            ├── adventagesSection.jsx
            ├── setSection.jsx
            └── ctaSection.jsx
```

## Composición de `Homepages`

El orden narrativo de la página es intencional:

1. `NavLayout`: identidad y navegación interna por anclas.
2. `IntroductionSection`: presentación de la marca y llamada principal.
3. `OutletSection`: productos destacados.
4. `CommunitySection`: propósito y comunidad.
5. `CategoriesSection`: exploración por estilo.
6. `AdvantagesSection`: beneficios diferenciales.
7. `SetSection`: mensaje de marca.
8. `CtaSection`: llamada final a la acción.
9. `FooterLayout`: cierre de la página.

Cada sección debe mantenerse como componente independiente. Esto permite reemplazar contenido, agregar estados o conectar datos reales sin convertir `homepages.jsx` en un archivo difícil de mantener.

## Rutas

| Ruta | Componente | Uso |
|---|---|---|
| `/` | `Homepages` | Landing principal de Darkshop |
| `*` | `Navigate` | Redirige rutas no existentes a `/` |

Para una nueva vista, se debe crear su componente dentro de la feature correspondiente y registrar una ruta explícita en `src/App.jsx`.

## Estilos

Los estilos globales viven en `src/css/index.css`. Allí se definen colores de marca, tipografías, layout, tarjetas y breakpoint móvil. Los nombres de clase actuales son semánticos (`hero`, `product-grid`, `site-nav`, `cta-section`) y deben reutilizarse antes de crear estilos duplicados.
