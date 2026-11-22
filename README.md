# Electiva Profesional I · Modelos de Transformación Empresarial

Objeto Virtual de Aprendizaje de la Universidad Simón Bolívar — Programa de Ingeniería de Sistemas.

## Página principal

La página de inicio es `index.html`. Presenta la identificación académica del curso con base en el PAC, el propósito, el objetivo pedagógico de la OVA, su justificación, las tres unidades, el programa de 16 semanas, el Proyecto Integrador y la metodología. La página original de contenidos se conserva en `contenidos-ova.html` y sus módulos continúan disponibles en las rutas originales.

## Información académica (PAC)

- Código: 9901 · Semestre: 7 · 3 créditos · curso teórico electivo.
- Acompañamiento directo: 64 horas (64 teóricas y 0 prácticas).
- Trabajo independiente: 80 horas · total: 144 horas.
- Modalidad: presencial · idioma oficial del curso: español.
- Docente: Álvaro Salamanca Landínez.
- Unidades: diagnóstico estratégico; diseño e integración de soluciones tecnológicas inteligentes; implementación, gobierno y evaluación.
- Duración: 16 semanas, con primer parcial en la semana 7, segundo parcial en la semana 13 y evaluación final en la semana 16.

## Interfaz y accesibilidad de la portada académica

- Encabezado y pie de página institucionales.
- Accesos oficiales de Facebook e Instagram de Ingeniería de Sistemas: ambos se abren en pestaña nueva.
- Selector Español / English para la portada académica; la preferencia se recuerda en `localStorage`.
- Tema claro / oscuro con preferencia persistente.
- Animaciones de la ilustración central, notas flotantes, conectores y aparición progresiva al desplazarse; se respeta `prefers-reduced-motion`.
- Navegación móvil, filtros del programa semanal, búsqueda de semanas y barra de progreso de lectura.

> La traducción ES/EN está aplicada a la nueva portada académica (`index.html`). Los proyectos de estudiantes y la página original de contenidos se conservan en español, respetando sus entregas y controles propios.

## Estructura

- `index.html`, `css/portal-academico.css`, `js/portal-academico.js`: presentación académica del curso.
- `contenidos-ova.html`: página original que reúne contenidos y proyectos.
- `css/`, `js/`, `images/`, `videos/`, `documentos/`: recursos originales y recursos de la portada.
- `otros integrantes/`: OVAs y módulos de los equipos, conservados en sus rutas.
- `pacman/`: actividad interactiva.
- `.github/workflows/deploy-pages.yml`: publicación automática desde la rama `main` mediante GitHub Pages.

## Publicación en GitHub Pages

Repositorio GitHub: `OVA-Electiva-Prof-MTE`.

Página GitHub Pages: `https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/`.

El repositorio debe conservar esta estructura con `index.html` en la raíz. GitHub Pages debe utilizar GitHub Actions como fuente de publicación. El workflow incluido despliega el sitio en cada actualización de `main`.

## Dependencias y observaciones

- `otros integrantes/portal-ova-main/` utiliza Supabase para autenticación y almacenamiento. La nueva URL pública debe agregarse a las URL de redirección permitidas en Supabase: `https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/otros%20integrantes/portal-ova-main/index.html`. También debe revisarse el Site URL del proyecto.
- En `otros integrantes/netflix/` no se entregaron dos videos de fondo (`integracion-bg.webm` y `integracion-bg.mp4`) ni la fotografía `images/equipo/santiago.jpeg`. El módulo dispone de poster y alternativa visual; esos tres recursos siguen pendientes de entrega.
- Los módulos estudiantiles originales se han conservado sin rediseño. La auditoría técnica no sustituye las pruebas funcionales de formularios, autenticación externa, audio/video y navegación en un navegador real.
- Consultar `INFORME_AUDITORIA_PUBLICACION.md` para las verificaciones y limitaciones conocidas.
