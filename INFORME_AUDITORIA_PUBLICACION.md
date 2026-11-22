# Informe de auditoría y preparación de publicación

**Proyecto:** Electiva Profesional I — Modelos de Transformación Empresarial  
**Institución:** Universidad Simón Bolívar · Ingeniería de Sistemas  
**PAC de referencia:** PAC_Electiva profesional I - Modelos de Transformación Empresarial-V2.docx  
**Fuente OVA:** OVA-ELECTIVA P - MODELOS T.zip

## Resultado de la revisión del paquete original

- ZIP original: 302 entradas, 254 archivos, 48 entradas de directorio y 68.396.276 bytes sin comprimir; prueba de integridad correcta.
- No se encontraron rutas absolutas ni referencias de extracción inseguras.
- Se examinaron los documentos HTML y las referencias locales de recursos; se registraron tres recursos no entregados en el módulo Netflix.
- JavaScript independiente e incrustado: revisión sintáctica sin errores en los archivos examinados.
- Hojas CSS: análisis estático sin errores sintácticos detectados.
- El subproyecto LEGO incluye una versión HTML compilada y autónoma para publicación estática.
- No se identificaron claves privadas ni tokens reconocibles de servicios privados. La clave pública anon de Supabase se mantiene en su subproyecto original; debe conservarse la configuración RLS del proyecto externo.

## Nueva portada académica basada en el PAC

- Se conserva la portada informativa original como `contenidos-ova.html`; `index.html` pasa a ser la nueva presentación académica.
- Se presentan los datos del PAC: código 9901, semestre 7, 3 créditos, curso teórico electivo, 64 horas de acompañamiento directo (64 teóricas y 0 prácticas), 80 horas de trabajo independiente, 144 horas totales, modalidad presencial, español como lengua del curso y docente Álvaro Salamanca Landínez.
- Se incluye el propósito del curso, una formulación diferenciada del objetivo pedagógico de la OVA y una justificación pedagógica basada en el PAC.
- Se presentan las tres unidades y su dedicación HAD/HTI, los contenidos principales, la secuencia diagnosticar/identificar → diseñar/integrar → proponer/validar y el Proyecto Integrador.
- Se incorporó el plan de actividades de las 16 semanas según el apartado 14 del PAC; se destacan el primer parcial (semana 7), segundo parcial (semana 13) y evaluación final (semana 16).
- Se conserva el carácter teórico-práctico semanal, 4 horas por semana y escenario aula/laboratorio.

## Controles de interfaz implementados en la portada académica

- Encabezado y pie de página institucionales con navegación adaptable.
- Facebook e Instagram de Ingeniería de Sistemas: `https://www.facebook.com/IngSistemasUnisimon` y `https://www.instagram.com/ingsistemasunisimon/`, con `target="_blank"` y `rel="noopener noreferrer"` en encabezado y pie de página.
- Selector Español / English aplicado a los elementos académicos de la nueva portada; 190+ marcas de contenido con claves bilingües y almacenamiento de preferencia en `localStorage`.
- Tema claro/oscuro con almacenamiento de preferencia en `localStorage`.
- Animaciones existentes de tablero, notas flotantes, conectores y revelado por desplazamiento; se respeta `prefers-reduced-motion`.
- Filtros por unidad/evaluación, búsqueda del programa semanal, navegación móvil y barra de progreso de lectura.
- En `contenidos-ova.html` se actualizaron las redes sociales de la universidad general a las cuentas específicas de Ingeniería de Sistemas proporcionadas por el docente; los enlaces se mantienen en pestaña nueva. Se conserva el diseño y el JavaScript originales de esa página.

## Observaciones no bloqueantes

En `otros integrantes/netflix/index.html` no se recibieron tres recursos referenciados:

1. `videos/integracion-bg.webm`
2. `videos/integracion-bg.mp4`
3. `images/equipo/santiago.jpeg`

El módulo dispone de un poster para el video y una alternativa de iniciales para la fotografía. Esos recursos no se sustituyeron.

## Dependencia externa pendiente de configuración

`otros integrantes/portal-ova-main/` utiliza Supabase para autenticación y almacenamiento. Antes de probar el flujo de autenticación en el nuevo dominio, se debe autorizar la siguiente Redirect URL y revisar el Site URL en el proyecto Supabase:

`https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/otros%20integrantes/portal-ova-main/index.html`

No se dispone de acceso a la configuración del proyecto Supabase desde este paquete.

## Integridad y preservación

- Se conservan los 254 archivos originales de la OVA y sus rutas relativas.
- Los cambios deliberados se limitan a la página principal académica, sus CSS/JavaScript asociados, actualización de enlaces sociales de la antigua página de contenidos y archivos de publicación/documentación.
- No se rediseñaron ni reemplazaron los proyectos, módulos o actividades de los equipos.

## Publicación

- `index.html` está en la raíz.
- `.nojekyll` está incluido.
- `.github/workflows/deploy-pages.yml` publica desde `main` mediante GitHub Actions.
- Nombre previsto del repositorio: `OVA-Electiva-Prof-MTE`.
- URL prevista: `https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/`.

## Limitación de validación funcional

La comprobación del sitio completo en navegador no pudo completarse en este entorno por un bloqueo del navegador local. Se verificaron la integridad del ZIP, las rutas y archivos locales, el balance de llaves CSS, la sintaxis JavaScript y la existencia de los controles, traducciones y URLs sociales. La validación final en producción debe probar el cambio ES/EN, alternancia claro/oscuro, navegación móvil, proyectos y la autenticación externa de Supabase.

## Límite de la conexión de GitHub en esta sesión

El conector disponible permite consultar y escribir en repositorios existentes, pero no expone la operación de creación de repositorios. El entorno local tampoco dispone de GitHub CLI ni de una sesión git autenticada. Por tanto, el paquete quedó listo para su carga, pero el repositorio remoto no se declara creado ni la página publicada desde esta sesión.


## Conservación de encabezado, pie, redes, idioma y tema (22/11/2026)

- Se añadieron controles ES/EN a la nueva portada académica, con 192 claves de contenido traducibles y cobertura verificada en ambos diccionarios. El idioma elegido se recuerda mediante `localStorage`.
- Se incorporó el control de tema claro/oscuro, con persistencia local y estilos de contraste específicos para las secciones, tarjetas, navegación y formularios de búsqueda del plan semanal.
- El encabezado y el pie presentan los accesos oficiales de Facebook e Instagram del Programa de Ingeniería de Sistemas. Los cuatro enlaces de la portada abren en pestaña nueva con `noopener noreferrer`.
- Se actualizaron las redes sociales en la página original `contenidos-ova.html` para utilizar las cuentas de Ingeniería de Sistemas proporcionadas por el docente, conservando sus iconos y los enlaces en pestaña nueva.
- Se conservaron las animaciones CSS originales (tablero, notas, conectores y revelado al desplazarse) y se respeta `prefers-reduced-motion`.
- Verificación posterior: `node --check` pasó para los archivos JavaScript del repositorio; 192 claves i18n están presentes en español e inglés; CSS balanceado; 4 enlaces sociales en la nueva portada y 2 cuentas en la página de contenidos.
- Se compararon los 254 archivos fuente contra el directorio preparado: 253 permanecen byte a byte idénticos; el único archivo modificado en su ruta original es `index.html`, cuyo contenido original se conserva como `contenidos-ova.html` con las actualizaciones sociales y el acceso de retorno.

## Estado de creación y publicación remota

- El paquete ZIP final está preparado con `index.html` en raíz, los recursos, `.nojekyll` y `.github/workflows/deploy-pages.yml`.
- El repositorio `alvaros1705-cloud/OVA-Electiva-Prof-MTE` fue creado por el docente. El árbol remoto inicialmente contenía solo cinco archivos; para cargar la estructura completa se preparó `ACTUALIZAR-OVA-MODELOS-GITHUB.ps1`, que clona el repositorio existente, copia los 261 archivos del paquete, verifica presencia y tamaño antes del commit y envía los cambios a la rama `main` usando Git Credential Manager o GitHub CLI.
- No se declara URL de publicación activa hasta que los recursos estén en el árbol remoto y el workflow de GitHub Pages finalice satisfactoriamente.


## Aclaración de carga remota (22/11/2026)

- Repositorio de destino: `https://github.com/alvaros1705-cloud/OVA-Electiva-Prof-MTE`.
- Al comprobar el árbol remoto, solo había cinco archivos en la raíz y no estaban las carpetas de recursos.
- El paquete de publicación contiene 261 archivos: `.github/`, `css/`, `documentos/`, `images/`, `js/`, `otros integrantes/`, `pacman/` y `videos/`, además de los archivos HTML y documentación de la raíz.
- El script `ACTUALIZAR-OVA-MODELOS-GITHUB.ps1` está dirigido solo a ese repositorio existente. Comprueba los 261 archivos y tamaños antes de realizar `git push`; no usa `/MIR` y no elimina archivos remotos.
- La publicación no se considera finalizada hasta verificar el árbol remoto, el workflow `Deploy Electiva Profesional OVA` y la apertura de `index.html` desde GitHub Pages.
