# Documentación de Connect Darkshop

Esta carpeta contiene la documentación técnica del proyecto. El objetivo es que cualquier persona del equipo pueda entender cómo está organizado Darkshop, levantarlo localmente y continuar construyendo nuevas vistas sin romper la arquitectura actual.

## Contenido

- [Arquitectura](./ARCHITECTURE.md): estructura de carpetas, flujo de entrada y composición de la home.
- [Guía de desarrollo](./DEVELOPMENT.md): instalación, comandos, convenciones y procedimiento para agregar funcionalidades.

## Estado actual

La aplicación está construida con React y Vite. La primera vista funcional es `Homepages`, que se monta en la ruta `/` mediante React Router. La home está compuesta por un layout de navegación, varias secciones de contenido y un footer.

## Regla de mantenimiento

Cuando se agregue una ruta, una sección relevante o una dependencia nueva, se debe actualizar la documentación correspondiente en esta carpeta.
