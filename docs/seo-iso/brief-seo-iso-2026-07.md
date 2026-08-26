# SEO ISO TecDex — Diagnóstico, keywords y encargo a Codex

Fecha: 2026-07-22
Responsable coordinación: Claude Cowork (Mario)
Ejecutor técnico propuesto: Codex (repo `webtcdx`)

---

## 1. Diagnóstico de integración de /iso (verificado, no modificar sin aprobación)

- **URL pública objetivo (canonical):** `https://tecdex.net/iso`
- **Mecanismo real:** página WordPress + Elementor (post ID 3605, plugin Rank Math activo) que contiene un widget HTML con un `<iframe src="https://isos.tecdex.net/?embedded=1">`. No es reverse proxy, no es rewrite, no es SSR ni microfrontend: es un iframe simple.
- **App embebida:** `isos.tecdex.net`, repo `Tecdex-SpA/webtcdx`, Next.js 15 App Router, single-page (`src/app/page.tsx` → `NormativeLanding`).
- **Riesgo SEO confirmado (no corregido aún):** `src/app/layout.tsx` de `webtcdx` define metadata completa y `robots: { index: true, follow: true }` para `isos.tecdex.net`, con `metadataBase: "https://tcdx.cl"` (dominio distinto a tecdex.net) y **sin `alternates.canonical`**. Esto significa que Google puede indexar `isos.tecdex.net` como página independiente y compitiendo con `https://tecdex.net/iso`, en vez de consolidar autoridad en la URL pública real. Este es el hallazgo central que debe resolver Codex (ver sección 6).
- **Confirmado:** no hay título/descr. duplicados visibles en el WordPress `/iso` (Rank Math no configurado aún con foco a nuestras keywords — pendiente de revisión detallada de Rank Math, no incluida todavía).

## 2. Estado en Soro (verificado antes de tocar nada)

- Proyecto existente: **"ISO - Tecdex"**, dominio configurado `www.tecdex.net`. Un solo proyecto — no se creó ni se creará un segundo proyecto/sitio duplicado.
- Soro **no es un auditor/crawler de páginas**: no detecta `/iso` específicamente, no analiza título/H1/canonical por URL, no da alertas de contenido débil o duplicado por página. Es una plataforma de "SEO autopilot" orientada a: aprender la marca (Brand DNA), descubrir keywords con volumen/dificultad, generar y publicar artículos de blog automáticamente en un calendario editorial, y compartir en redes sociales conectadas.
- **Auto-publish quedó pausado** (había 6 artículos ISO programados sin revisión editorial previa; se pausó para evitar publicaciones no autorizadas, cumpliendo la regla "no activar publicaciones automáticas sin autorización").
- No se contrató ningún plan/crédito adicional. No se modificó configuración general del dominio. No se realizó ninguna acción irreversible.

## 3. Palabras clave agregadas en Soro

Total en biblioteca de Soro: **60** (34 descubiertas automáticamente por Soro + 26 agregadas manualmente desde la lista priorizada/complementaria de Mario, evitando duplicar lo ya descubierto). Todas están como "keyword ideas" reversibles (no se activó nada automático, no se generó contenido todavía).

Soro no soporta agrupación ni asociación por URL en su interfaz, por lo que la agrupación se documenta aquí (no en Soro):

**Grupo 1 — Plataforma ISO:** plataforma iso chile, software iso chile, plataforma iso para empresas, sistema de gestión iso chile, software iso para pymes, demo plataforma iso, precio software iso, alternativa a consultoría iso, plataforma para mantener certificación iso, software para implementar iso 27001, plataforma iso latinoamérica, software iso latinoamérica, plataforma grc para empresas, plataforma cumplimiento normativo, software gestión iso, plataforma de gestión iso, sistema de gestión iso, plataforma sgi, plataforma iso 9001.

**Grupo 2 — ISO 27001:** implementación iso 27001, cumplimiento iso 27001, auditoría iso 27001, gestión iso 27001, plataforma iso 27001, gestión de controles iso 27001, declaración de aplicabilidad iso 27001, gestión de seguridad de la información, gestión de controles de ciberseguridad, gestión de evidencias iso 27001.

**Grupo 3 — Documentos y evidencias:** gestión de evidencias iso, control de documentos iso, control de versiones de documentos, gestión de políticas y procedimientos, centralizar documentación iso, software de gestión documental iso, evidencias de cumplimiento de seguridad, control de evidencias de auditoría.

**Grupo 4 — Auditorías y mejora continua:** preparación auditoría iso, preparación certificación iso, seguimiento de acciones correctivas, gestión de no conformidades, matriz de riesgos iso, matriz de riesgos y controles, seguimiento de hallazgos iso, seguimiento de indicadores iso, monitoreo continuo de cumplimiento, sistema integrado de gestión, automatizar gestión iso, automatización de cumplimiento normativo, recordatorios de cumplimiento, software para auditorías internas, digitalización de procesos iso, software sistema de gestión integrado.

**Grupo 5 — Chile y mercado objetivo:** sistema de gestión iso chile, plataforma iso chile, software iso chile *(se repiten con Grupo 1 intencionalmente: son la intersección producto × geografía)*.

## 4. Mapa de keywords por página (distribución obligatoria, no todo a una sola URL)

| URL objetivo | Objetivo de la página | Keyword principal | Keywords secundarias | Intención | Acción recomendada |
|---|---|---|---|---|---|
| `https://tecdex.net/iso` (hero + #top) | Página comercial principal, captar demanda de marca y producto | plataforma iso chile | software iso chile, plataforma iso para empresas, plataforma iso latinoamérica | Transaccional / comparación | Ajustar `<title>`, meta description y H1 (ver sección 5) |
| `.../iso#normas` | Mostrar cobertura normativa (9001, 27001, 42001) | gestión iso 27001 | plataforma iso 27001, implementación iso 27001, cumplimiento iso 27001, plataforma iso 9001 | Transaccional / informativa | Reforzar copy existente, agregar keywords en texto natural, sin inventar certificaciones |
| `.../iso#solucion` / `#ia-auditor` | Explicar módulos: controles, evidencias, riesgos | gestión de evidencias iso 27001 | control de documentos iso, matriz de riesgos iso, gestión de seguridad de la información | Informativa / consideración | Ajustar descripciones de módulos ya existentes (`modules` array) |
| `.../iso#como-funciona` | Proceso de onboarding | automatizar gestión iso | digitalización de procesos iso, centralizar documentación iso | Informativa | Reforzar copy de los 5 pasos existentes |
| `.../iso#planes` / `#fundadores` | Conversión, oferta fundadora | demo plataforma iso | precio software iso, alternativa a consultoría iso, plataforma para mantener certificación iso | Transaccional (alta intención) | CTA y sección planes: incorporar 2–3 keywords sin inventar precios no confirmados |
| `.../iso#faq` | Resolver objeciones, dar contexto adicional | preparación auditoría iso | preparación certificación iso, software para implementar iso 27001 | Informativa | Agregar 2 preguntas nuevas (ver sección 5) sin tocar las 4 actuales |
| Artículo de blog (Soro/WordPress, a crear) | Contenido long-tail, autoridad temática | declaración de aplicabilidad iso 27001 | gestión de controles iso 27001, control de versiones de documentos | Informativa (fondo de embudo educativo) | Redactar vía Soro (con revisión editorial antes de publicar) |
| Artículo de blog (a crear) | Contenido long-tail | seguimiento de hallazgos iso | gestión de no conformidades, seguimiento de acciones correctivas, matriz de riesgos y controles | Informativa | Redactar vía Soro (con revisión editorial) |
| Artículo de blog (a crear) | Contenido long-tail | monitoreo continuo de cumplimiento | recordatorios de cumplimiento, automatización de cumplimiento normativo, sistema integrado de gestión | Informativa | Redactar vía Soro (con revisión editorial) |
| Artículo de blog (a crear) | Contenido long-tail, ciberseguridad | gestión de controles de ciberseguridad | evidencias de cumplimiento de seguridad, gestión de seguridad de la información | Informativa | Redactar vía Soro (con revisión editorial) |

Nota: las keywords de marca/producto de alta intención se concentran en `/iso` (página comercial, sin diluir); las keywords informativas/long-tail se derivan a artículos de blog futuros (no se crean páginas nuevas automáticamente, cumpliendo la regla de Soro).

## 5. Recomendaciones editoriales concretas (para Codex, sin inventar nada no confirmado)

**Metadata actual de `isos.tecdex.net` (fuente: `src/app/layout.tsx`):**
- Title: "TCDX Compliance | Plataforma SaaS chilena para gestión normativa"
- Description: "Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos para gestión normativa con TCDX Compliance, plataforma SaaS chilena desarrollada por TECDEX."
- H1 (hero, `NormativeLanding.tsx` línea 145): "TCDX Compliance"
- Subtítulo hero: "Gestión normativa simple, trazable y asistida por IA"

**Propuesta (ajuste, no reemplazo total — mantener estilo editorial existente):**
- Title propuesto: "Plataforma ISO 27001, 9001 y 42001 en Chile | TCDX Compliance — TecDex"
- Description propuesta: "Software de gestión normativa para ISO 27001, 9001 y 42001: controles, evidencias, matriz de riesgos, auditorías y reportes ejecutivos. Plataforma SaaS chilena con onboarding asistido por TecDex."
- H1: mantener "TCDX Compliance" (marca) pero reforzar el subtítulo inmediato con keyword: "Plataforma de gestión normativa ISO 27001, 9001 y 42001, simple y trazable" (ajuste menor de la frase actual, sin inventar alcance nuevo).
- FAQ nuevas (2, respetando el tono de las 4 existentes y sin inventar funcionalidades):
  1. "¿La plataforma sirve para ISO 27001, 9001 y 42001?" → "Sí. TCDX Compliance está diseñada para ISO 9001 (calidad), ISO 27001 (seguridad de la información) e ISO 42001 (gestión de IA), permitiendo 1 o 2 normativas por cliente en etapa inicial."
  2. "¿La plataforma está disponible fuera de Chile?" → *(solo incluir si es cierto comercialmente; si no está confirmado, no agregar — queda pendiente de confirmación con Mario antes de escribirla)*.

**Reglas duras para Codex (repetir explícitamente en el encargo):** sin keyword stuffing, sin texto oculto, sin contenido duplicado, sin inventar clientes/testimonios/precios/certificaciones no confirmadas, mantener español y el estilo editorial de TecDex, sin rediseño visual no aprobado, sin romper el iframe/CSP ya implementado, sin tocar variables de entorno de producción, sin deploy directo a producción (rama + PR).

## 6. Encargo técnico para Codex

- **Repo:** `Tecdex-SpA/webtcdx`
- **Rama nueva desde `main`:** `feature/iso-seo-onpage` (no reutilizar ramas previas de otros arreglos; permite rollback simple con `git revert` o cerrando el PR sin mergear)
- **URL pública objetivo:** `https://tecdex.net/iso` (el canonical debe apuntar aquí, aunque el código viva en `isos.tecdex.net`)
- **Método de embed:** iframe desde WordPress (`/iso`), no modificar (ver sección 1)

**Cambio 1 — Canonical y metadata (`src/app/layout.tsx`):**
- Agregar `alternates: { canonical: "https://tecdex.net/iso" }` al objeto `metadata`.
- Mantener `robots: { index: true, follow: true }` (el canonical resuelve la duplicidad sin necesidad de noindex).
- Corregir `metadataBase` y `openGraph.url`: hoy apuntan a `https://tcdx.cl`, deberían apuntar a `https://tecdex.net/iso` (o, si `tcdx.cl` es un dominio de marca intencional y vigente, marcar esta decisión como **pendiente de aprobación de Mario** antes de tocarla — no asumir).
- Actualizar `title`/`description`/`openGraph`/`twitter` con los textos propuestos en la sección 5.

**Cambio 2 — Copy con keywords (`src/components/NormativeLanding.tsx`):**
- Ajustar subtítulo del hero (línea 146) según propuesta de sección 5.
- Revisar descripciones de `modules`, `standards`, `steps` para incorporar 1–2 keywords secundarias de forma natural (sin reescribir todo el array, cambios mínimos).
- Agregar las 2 preguntas de FAQ (array `faqs`, sección 5) — la segunda solo si Mario confirma el alcance geográfico.

**Cambio 3 — Datos estructurados (JSON-LD):**
- Agregar `SoftwareApplication` u `Organization` + `FAQPage` JSON-LD en `layout.tsx` o vía `<script type="application/ld+json">`, consistente con el contenido real (sin inventar ratings/reviews).

**Validación / criterios de aceptación:**
- `npm run lint` y `npm run build` sin errores (bloqueado en este entorno por permisos de sandbox; Codex debe poder ejecutarlo en su entorno).
- Verificar visualmente que `?embedded=1` sigue ocultando el header propio (fix ya aplicado en este mismo repo, rama `feature/iso-iframe-embed-csp`, pendiente de commit por bloqueo de `.git/index.lock`).
- Verificar `curl -I https://tecdex.net/iso` y `view-source` del iframe embebido para confirmar `<link rel="canonical" href="https://tecdex.net/iso">` presente tras el deploy.
- Validar JSON-LD con el Rich Results Test de Google.
- PR con descripción clara, sin merge directo a `main`/producción.

**Restricciones técnicas repetidas:** no modificar CSP/iframe existente, no modificar `.env`, no deploy directo a producción, no cambios de diseño visual mayores sin aprobación, todo en español, estilo editorial TecDex.

## 6.1. Hallazgo de velocidad — riesgo conocido, sin decisión aún (2026-07-22)

Se midió con PageSpeed Insights (Lighthouse) `isos.tecdex.net` directo vs. `https://tecdex.net/iso` (WordPress + iframe actual):

| Métrica (mobile) | isos.tecdex.net directo | tecdex.net/iso (WP + iframe) |
|---|---|---|
| Performance | 96 | **55** |
| LCP | 2.4 s | **13.8 s** (umbral "malo" de Google: >4 s) |
| FCP | 1.0 s | 4.9 s |
| TBT | 20 ms | 270 ms |
| Speed Index | 3.7 s | 5.8 s |
| SEO (Lighthouse) | 100 | 92 |
| Best Practices | 100 | 92 |

| Métrica (desktop) | isos.tecdex.net directo | tecdex.net/iso (WP + iframe) |
|---|---|---|
| Performance | 100 | 98 |

**Causa:** la página WordPress (Elementor + Rank Math + plugins) debe cargar por completo antes de que el iframe empiece a pedir `isos.tecdex.net` — dos cargas de página en serie, no en paralelo. En desktop el impacto es mínimo; en mobile es severo, y la indexación de Google es mobile-first.

**Alternativa evaluada (propuesta por Mario, no aprobada aún):** indexar `isos.tecdex.net` directamente (sin iframe/WordPress), compensando la pérdida del widget SalesIQ heredado del sitio padre con un formulario de contacto propio + un botón/CTA a WhatsApp (ya configurado para redirigir al bot de SalesIQ programado).

**Decisión tomada (2026-07-22):** no se decide aún. Se mantiene la arquitectura actual (iframe, canonical `https://tecdex.net/iso`) sin cambios. Este hallazgo queda documentado como **riesgo conocido de Core Web Vitals mobile** para retomar la decisión más adelante. No se modificó WordPress, no se tocó el encargo a Codex de la sección 6, y no se revirtió ninguno de los rules ya definidos (canonical sigue siendo `www.tecdex.net/iso`).

**Decisión revertida (2026-07-23):** Mario confirmó pasar a la alternativa evaluada arriba. Canonical y `openGraph.url` pasan a **`https://isos.tecdex.net`** (self-canonical). `tecdex.net/iso` deja de ser la URL indexada; queda como página contenedora en WordPress con canonical manual (Rank Math) apuntando a `isos.tecdex.net`, para no dejar canonicals cruzados en direcciones opuestas. Se acepta la pérdida temporal del chatbot SalesIQ heredado para las visitas que entren directo por `isos.tecdex.net`; el reemplazo (formulario + WhatsApp) queda pendiente de diseño, fuera del alcance del encargo técnico actual. Instrucciones actualizadas para Codex en `encargo-codex-iso-seo.md` sección 1, y nuevos pendientes de Mario (Rank Math manual + reemplazo del chatbot) en la sección 6 de ese mismo documento.

## 6.2. Conector WordPress de Soro vs. arquitectura real de isos.tecdex.net (verificado 2026-07-22)

Verificado en Soro → Settings → WordPress: el conector está **Connected** a `https://www.tecdex.net` (el WordPress del sitio padre), con Auto-publish **desactivado** (se confirma que sigue pausado, sin cambios desde la sesión anterior).

Soro **no tiene forma de publicar en `isos.tecdex.net`**: ese sitio es código propio (Next.js, sin WordPress ni ningún CMS), y el conector de Soro solo integra con WordPress. Esto confirma y refuerza el plan de la sección 4: los artículos de blog long-tail que Soro redacte solo pueden publicarse en `www.tecdex.net` (ej. `tecdex.net/blog/...`), nunca en `isos.tecdex.net`.

**Implicancia para la discusión de la sección 6.1 (indexar `isos.tecdex.net` directo):** si se optara por esa alternativa más adelante, `isos.tecdex.net` seguiría sin motor de blog/contenido propio — todo el contenido editorial de soporte (long-tail, autoridad temática) seguiría viviendo en `tecdex.net` (dominio distinto). Los enlaces internos desde esos artículos hacia el producto pasarían a ser **enlaces cross-domain** hacia `isos.tecdex.net`, lo que transfiere menos autoridad SEO que un enlace interno dentro del mismo dominio. Esto es un argumento adicional a favor de mantener el producto bajo `tecdex.net` (vía `/iso`) para SEO de contenido, o bien evaluar construir un blog propio dentro del código de `isos.tecdex.net` (ej. rutas MDX estáticas) si se decide indexarlo de forma independiente. Ninguna decisión tomada aún — queda como insumo para cuando se retome la sección 6.1.

## 6.3. Complejidad de dar compatibilidad Soro-plugin a isos.tecdex.net (analizado 2026-07-22)

Se revisó el código fuente público del plugin oficial `soro-seo` (WordPress.org, GPLv2) vía `https://plugins.trac.wordpress.org/export/HEAD/soro-seo/trunk/soro-seo.php`, y el repo `webtcdx` (`package.json`, estructura de `src/app`).

**Contrato técnico del plugin:** registra 4 rutas REST en el WordPress destino bajo el namespace `soro/v1`, autenticadas con un API key propio vía header `X-Soro-Key`:
- `POST /wp-json/soro/v1/publish` — recibe `title`, `content` (HTML), `status`, `slug`, `excerpt`, `category`, `meta_description`, `focus_keyword`, `featured_image_url`, `soro_article_id` (idempotencia). Internamente hace `wp_insert_post`, descarga y adjunta la imagen destacada a la librería de medios, escribe meta de Yoast/Rank Math/AIOSEO, y maneja conflictos de slug/duplicados.
- `GET /wp-json/soro/v1/verify` — healthcheck (site_name, site_url, version).
- `POST /wp-json/soro/v1/setup-indexnow` / `GET /indexnow-status` — escribe un archivo `.txt` en la raíz del sitio para IndexNow (Bing).

**Estado real de `isos.tecdex.net`:** Next.js 15 puro (`package.json` solo depende de `next`, `react`, `lucide-react`), 2 rutas estáticas (`/politica-privacidad`, `/gracias`), **sin base de datos, sin API routes, sin backend de ningún tipo**. Todo lo que WordPress da "gratis" (persistencia de posts, librería de medios, editor de borradores, meta de SEO) no existe hoy en este repo.

**Dos caminos evaluados:**

| | Opción A — Reimplementar el contrato `soro/v1/*` en Next.js | Opción B — WordPress headless solo como backend de contenido |
|---|---|---|
| Trabajo requerido | 4 API routes propias + base de datos (posts/slugs/meta) + storage externo para imágenes (el filesystem de Next.js en serverless no persiste) + servir el archivo IndexNow dinámicamente + panel propio de revisión de borradores | Instalar WordPress real (como backend, sin exponerlo como sitio visible) + plugin oficial de Soro sin modificar; Next.js solo consume `wp/v2/posts` (API pública de WP) para renderizar `/blog` con el diseño actual |
| Riesgo | Alto: contrato propietario de Soro que puede cambiar sin aviso (el changelog del plugin muestra cambios frecuentes de protocolo) | Bajo: patrón "WordPress headless + frontend Next.js" ya validado por Soro/WordPress con 10,000+ instalaciones activas del plugin |
| Estimado | ~4–7 días + infraestructura nueva (DB + storage de imágenes) | ~1–2 días de desarrollo (fetch + render en Next.js) + horas de setup del WP backend |
| Costo recurrente | Nuevo gasto mensual (DB + storage) | Hosting WP económico |

**Recomendación (no ejecutada, pendiente de decisión de Mario):** si en algún momento se decide que el blog viva bajo el dominio `isos.tecdex.net`, la Opción B es la de menor riesgo y esfuerzo — aprovecha el plugin de Soro tal cual, sin reverse-engineering de un contrato que Soro puede cambiar. No se tocó código ni infraestructura; esto queda como insumo para una futura decisión de arquitectura e inversión.

## 6.4. www vs. no-www: conector de Soro y canonical real de /iso (verificado 2026-07-22)

**Pregunta de Mario:** ¿hay que cambiar el conector de Soro de `www.tecdex.net` a `tecdex.net`?

**Verificado con fetch directo:**
- `GET https://www.tecdex.net/wp-json/soro/v1/verify` responde **200 directo, sin redirect**, con `"site_url":"https://tecdex.net"` (sin www). Esto confirma que la identidad interna real de WordPress (`get_site_url()`) ya es **no-www**, y que las rutas `/wp-json/*` no pasan por el redirect www→no-www que sí afecta a las páginas normales (ese redirect canónico de WordPress solo aplica a `template_redirect`, no a la capa REST). Conclusión: **el conector de Soro funciona correctamente hoy, sin riesgo**, aunque el dashboard de Soro muestre "Connected https://www.tecdex.net" — esa etiqueta es solo lo que se guardó al conectar, no se re-consulta en vivo. **No es necesario tocar el conector.**
- `https://www.tecdex.net/iso/` → redirect 301 → `https://tecdex.net/iso/` (confirmado, páginas normales sí redirigen).
- El `<link rel="canonical">` que Rank Math ya está emitiendo en `/iso` es `https://tecdex.net/iso/` **(sin www)**.

**Decisión tomada (2026-07-22):** Mario confirmó que el dominio canónico real del sitio es **`tecdex.net` (sin www)**. Esto coincide con lo que Rank Math ya emite en producción, por lo que no hay que tocar WordPress. Se corrigió este documento (secciones 1, 6 y 6.1) para que todas las referencias al canonical de la página ISO usen `https://tecdex.net/iso` en vez de la versión con www del brief original. El encargo a Codex de la sección 6 ya queda alineado: `alternates.canonical` debe apuntar a `https://tecdex.net/iso`.

**Hallazgo colateral (no solicitado, pero relevante):** al revisar la respuesta HTML de `/iso`, el meta title/description/OG/Twitter actuales **no tienen relación con ISO ni cumplimiento normativo** — aparecen `firewall fortinet chile`, `servidores en chile`, imagen `firewallbg.jpg`, etc. (contenido de otra página del sitio, probablemente un default heredado). No hay `meta description` visible en absoluto. Esto confirma y adelanta el pendiente de la sección 8 ("Revisión de Rank Math para /iso") — es un problema más urgente de lo estimado, ya que hoy Google podría estar viendo la página `/iso` sin ningún metadato relacionado a las keywords del proyecto.

## 6.5. Espejo de blog isos.tecdex.net/blog → tecdex.net (verificado 2026-07-22; construido y en producción — ver actualización 2026-07-24)

Se verificó la estructura real del blog de WordPress antes de dar luz verde al espejo/proxy:

- **No existe un prefijo `/blog/` en WordPress.** Los posts viven en la raíz del dominio: `https://tecdex.net/firewall-fortinet-chile-criterios-seleccion/`, etc. `https://tecdex.net/noticias/` es solo una página Elementor que lista/enlaza esos posts, no un prefijo de URL real.
- El blog existente (`/noticias`) tiene **~20 artículos activos sobre Fortinet/redes/ciberseguridad**, sin relación con ISO — es el blog general de servicios TI de TecDex, no uno dedicado a cumplimiento normativo.
- Confirmado por sitemap (`tecdex.net/sitemap_index.xml` → `post-sitemap.xml`): la estructura de permalinks de WordPress es plana (`/%postname%/`), no `/blog/%postname%/`.

**Implicancias para el espejo (antes de escribir código):**

1. **No cambiar la estructura de permalinks de WordPress** a `/blog/%postname%/` para "crear" el prefijo — rompería las URLs de los ~20 artículos ya indexados (requeriría redirects 301 masivos, riesgo de caída temporal de ranking). Se mantiene la estructura plana en WordPress.
2. El rewrite en `next.config.js` debe mapear el prefijo al slug plano, no un prefijo por otro:
   ```js
   { source: "/blog/:slug", destination: "https://tecdex.net/:slug/" }
   ```
   Nota: esto significa que técnicamente `isos.tecdex.net/blog/quienes-somos` también serviría (proxied) la página "Quiénes somos" de tecdex.net si alguien la pidiera directamente — riesgo bajo en la práctica (nadie enlaza así salvo que nosotros lo hagamos), pero hay que tenerlo presente.
3. **Falta definir una categoría de WordPress dedicada** para los artículos que publique Soro (ej. "ISO / Cumplimiento"), configurada en el plugin Soro (Settings → Soro → Post Category en WordPress) — si no, los artículos de ISO se mezclan sin distinción con el contenido de Fortinet/redes en `/noticias` y en el feed general del blog.
4. Sigue pendiente (no resuelto en esta sesión): decisión sobre el header/footer de WordPress en las páginas proxied (mismo problema de "doble identidad" visto en el iframe de `/iso`).

**Actualización 2026-07-23 — canonical cruzado automatizado:** implementado el filtro descrito arriba. Snippet PHP vía WPCode ("Canonical cruzado - posts de Soro hacia isos.tecdex.net/blog", ID 3622, activo, ubicación "Ejecutar en todas partes"), enganchado a `rank_math/frontend/canonical`, condicionado a `is_singular('post')` + meta `_soro_article_id` presente. Verificado en vivo sobre los 2 artículos ya publicados por Soro: ambos pasaron de canonical auto-referenciado (`tecdex.net/{slug}/`) a `https://isos.tecdex.net/blog/{slug}` de forma retroactiva, sin edición manual. La página `/iso` (no es un `post`, es `page`) no se ve afectada por este filtro — mantiene su canonical manual fijado por separado (ver 6.4/6.6).

**Estado (actualizado 2026-07-24): construido y en producción.** El rewrite `{ source: "/blog/:slug", destination: "https://tecdex.net/:slug/" }` está activo hoy en `next.config.js` (rama `main`) y sirviendo tráfico real — las 3 decisiones pendientes listadas arriba ya fueron resueltas en la práctica: (a) el mapeo de slugs planos quedó tal como se propuso aquí, sin cambios; (b) la categoría dedicada "ISO y Cumplimiento" se confirmó y usó en Soro/WordPress (ver 6.8); (c) las entradas proxied se sirven con el header/footer completo de WordPress (es un passthrough puro, no una plantilla headless-only — ver hallazgo de caché más abajo, que confirma que el HTML es byte-idéntico al de `tecdex.net/{slug}/`).

**Actualización 2026-07-24 — investigación de una posible tercera capa de caché en el Edge Network de Vercel:** Mario reportó que un chequeo externo anónimo detectó `isos.tecdex.net/blog/{slug}` sirviendo una versión vieja (mismo ETag de antes) después de purgar LiteSpeed Cache en WordPress, y pidió confirmar si Vercel cachea esta ruta de forma independiente al origen.

Verificación (7 requests en vivo contra producción, más una comparación de cuerpos byte a byte, sobre `isos.tecdex.net/blog/software-para-auditorias-internas`):

- `x-vercel-cache: MISS` en las 7 solicitudes consecutivas (nunca `HIT`), sin header `age` en ninguna — a diferencia de la raíz `/` (página Next.js real), que sí mostró `x-vercel-cache: HIT` con `age: 74111`. Esto confirma que Vercel distingue esta ruta de proxy y no la sirve desde su Edge Cache.
- Tiempos de respuesta de 0.4–1.0s por solicitud, consistentes con un round-trip real a WordPress (LiteSpeed en Hostinger), no con un edge cache hit (que sería de un solo dígito de milisegundos).
- El origen (WordPress) devuelve `Cache-Control: no-cache` en cada respuesta — no `public, max-age=…` ni `stale-while-revalidate` — y Vercel respeta esa directiva al no cachear nada en su Edge Network para esta ruta.
- El `ETag` y el cuerpo de `isos.tecdex.net/blog/software-para-auditorias-internas` son actualmente **byte-idénticos** al de `tecdex.net/software-para-auditorias-internas/` (verificado con `diff` sobre ambos cuerpos).

**Conclusión: no se confirmó la hipótesis de una tercera capa de caché en Vercel.** No se hizo ningún cambio en `next.config.js` — la condición del encargo original ("si confirmas que sí cachea, agrega `Cache-Control: no-store`") no se cumplió, así que agregar ese header hoy sería un cambio sin necesidad demostrada sobre un archivo compartido (headers()/rewrites() de todo el proyecto). El header `no-cache` que ya envía WordPress logra el mismo efecto en la práctica: Vercel nunca cachea esta ruta.

Explicación más probable de lo que vio el chequeo externo: no es Vercel. Candidatos más plausibles, todos del lado WordPress/Hostinger, fuera del alcance de este repo:
1. El propio checker externo (herramienta de terceros para inspeccionar headers) puede cachear su propio resultado por unos minutos — no siempre repite la solicitud contra el origen en tiempo real.
2. La purga de LiteSpeed puede no cubrir todas las capas (p. ej. un CDN/edge adicional de Hostinger tipo QUIC.cloud si está activo, o caché de object cache separado del caché de página) — valdría la pena repetir la purga y esperar 2-3 minutos antes de volver a chequear.
3. Condición de carrera: el chequeo externo pudo haberse ejecutado antes de que la purga terminara de propagarse en el origen.

**Recomendación (no ejecutada, pendiente de decisión de Mario):** si se quiere blindaje adicional independiente de lo que WordPress decida enviar en el futuro (defensa en profundidad, no porque haya evidencia de un problema hoy), se podría agregar una entrada `headers()` en `next.config.js` con `source: "/blog/:slug"` y `Cache-Control: no-store` explícito, forzando que esta ruta nunca sea cacheable por Vercel pase lo que pase con la config de WordPress. No se implementó en esta sesión por no haber evidencia que lo justifique y porque modifica un archivo de configuración compartido (`next.config.js`) sin una necesidad confirmada.

**Seguimiento 2026-07-24 (tres tareas de cierre pedidas por Mario):**

1. **Merge de PR #7** (el que corrigió esta sección y documentó la investigación de arriba) aprobado y mergeado a `main` en `02819a9`.

2. **Header defensivo `Cache-Control: no-store` agregado para `/blog/:slug`**, en `next.config.js`, rama `hardening/blog-proxy-no-store` (PR aparte, ver más abajo). Es puramente preventivo — no porque haya evidencia de que Vercel cachee hoy (ver arriba, sigue dando `MISS`), sino para que esta ruta de proxy nunca pueda quedar cacheada del lado de Vercel si en el futuro cambia algo en Vercel o en el `Cache-Control` que manda WordPress.
   **Limitación de verificación local, reportada con transparencia:** al probar el header en local (`next start`, modo producción) contra `/blog/gestion-evidencias-iso-27001-trazabilidad`, el `Cache-Control: no-store` **no apareció** en la respuesta — solo se vio el `cache-control: no-cache` que manda WordPress. Esto es consistente con una limitación conocida de Next.js: cuando `rewrites()` apunta a un destino externo, el servidor local (`next dev`/`next start`) no siempre aplica las reglas de `headers()` sobre la respuesta proxied de la misma forma que lo hace la plataforma de Vercel en producción. Como evidencia de que en producción real sí se aplican — el CSP `frame-ancestors` de la regla `"/(.*)"` (la otra entrada de `headers()` en este mismo archivo) **sí aparece hoy** en `curl` contra `isos.tecdex.net/blog/{slug}` en producción (ver verificación de arriba), algo que solo pudo haber agregado `next.config.js`, no WordPress. Por eso se esperaba que el nuevo `no-store` también se aplicara una vez deployado.

   **Confirmado 2026-07-24, post-merge y post-deploy:** PR #8 mergeado a `main` (`84d777a`) y aprobado por Mario. `curl -sI https://isos.tecdex.net/blog/gestion-evidencias-iso-27001-trazabilidad` contra producción, minutos después del merge, ya muestra `cache-control: no-store` (sobrescribiendo el `no-cache` que manda WordPress), junto con `x-vercel-cache: MISS` como antes. El punto queda cerrado: la regla sí se aplicó en la plataforma real de Vercel pese a no haberse podido reproducir en local.

3. **Reverificación del slug original que generó el hallazgo** (`gestion-evidencias-iso-27001-trazabilidad`, no el que se usó en la verificación anterior):

   | | `tecdex.net/.../` (origen) | `isos.tecdex.net/blog/...` (proxy) |
   |---|---|---|
   | ETag | `"1152-1784900136;;;"` | `"1152-1784900136;;;"` |
   | `x-litespeed-cache` | `hit` | `hit` (passthrough del origen) |
   | `cache-control` | `no-cache` | `no-cache` |
   | `x-vercel-cache` | — | `MISS` |

   El ETag viejo reportado originalmente (`996-1784848310`) **ya no aparece en ninguna de las dos URLs** — ambas coinciden hoy en `1152-1784900136`, consistente entre origen y proxy. **Esto confirma que el hallazgo queda cerrado**: el contenido está sincronizado en ambos lados, y el proxy de Vercel sigue sin cachear (`MISS`), tal como se documentó arriba. El ETag viejo probablemente correspondía a una purga de LiteSpeed que aún no había terminado de propagar en el momento del chequeo externo original (candidato 3 de la lista de arriba), no a un problema persistente de caché en Vercel ni en WordPress.

## 6.6. Qué sitio mide realmente el "Site Speed" de Soro (verificado 2026-07-23)

Duda planteada por Mario: el checker de velocidad del dashboard de Soro mostraba 46/100 — un número que no calzaba con las mediciones previas de `isos.tecdex.net` (96/100 mobile, LCP 2.4s).

**Hallazgo:** el modal de Site Speed de Soro no expone el URL exacto que testea en su interfaz (no hay campo visible ni en el DOM accesible del modal). Pero el proyecto de Soro tiene configurado como dominio raíz **`www.tecdex.net`** (visible de forma consistente en el sidebar del proyecto "ISO - Tecdex"), no `isos.tecdex.net`. Se comparó el resultado de Soro contra una medición fresca de PageSpeed Insights mobile de `https://tecdex.net/` (home, WordPress):

| Métrica | Soro (Site Speed) | PageSpeed Insights — `tecdex.net/` (home) | PageSpeed Insights — `isos.tecdex.net` (directo) |
|---|---|---|---|
| Score | 46/100 | 49/100 | 96/100 |
| Carga / LCP | 14.9s | (LCP no leído en detalle por límite de scroll, pero score consistente con rango "Poor") | 2.4s |
| Primer contenido / FCP | 5.7s | — | — |

**Conclusión:** Soro está midiendo el dominio WordPress general `tecdex.net` (probablemente el home, que es la raíz configurada del proyecto), **no** `isos.tecdex.net` ni específicamente `tecdex.net/iso`. Esto es consistente con que el conector WordPress de Soro apunta a `tecdex.net` (ver 6.2/6.4) — el campo de dominio del proyecto y el de Site Speed comparten la misma raíz. El score de 46-49/100 refleja la lentitud conocida del WordPress (Elementor+plugins), no la performance real de la app Next.js del producto ISO. Si Mario quiere que Soro reporte la velocidad real de `isos.tecdex.net`, hoy no hay forma de aislarlo dentro del mismo proyecto de Soro — quedaría como ítem pendiente (ver sección 7).

## 6.7. Formato de publicación en Facebook (decidido 2026-07-23)

Se detectó que Soro auto-comparte cada artículo en Facebook con el link puesto directamente en el cuerpo del post — patrón que Facebook penaliza en alcance orgánico (prioriza contenido que no saca al usuario de la plataforma). Soro no ofrece opción de configurar esto (el toggle "Auto-share" es todo o nada, sin control de formato).

**Decisión:** Auto-share desactivado en Soro (afecta Facebook e Instagram por igual, un solo toggle). De ahora en adelante, el formato correcto para Facebook es: imagen + texto descriptivo del artículo (sin link en el cuerpo) + el link del artículo como **primer comentario** del post.

**Corregido retroactivamente (2026-07-23)** en los 2 posts ya publicados por el auto-share antes de desactivarlo: "Gestión de evidencias ISO 27001 con trazabilidad" y "Firewall Fortinet Chile: criterios de selección" — se editó el texto del post para quitar el link, y se agregó como primer comentario "Lee el artículo completo aquí: {link}".

**Limitación de seguridad importante:** publicar contenido público (o comentar) en redes sociales es una acción que requiere confirmación explícita de Mario cada vez — no se puede dejar en piloto automático dentro de la tarea de revisión diaria, incluso con la delegación amplia ya otorgada para el resto del flujo. Mario optó por: "apaga el auto share y tú editas y publicas" — es decir, sigo preparando/publicando en Facebook, pero pidiéndole confirmación puntual en cada sesión en que corresponda, no de forma desatendida.

## 6.8. Categoría WP, interlinking, filtro de relacionados por categoría y hallazgo de caché LiteSpeed (2026-07-23)

Trabajo de continuidad SEO/marketing sobre el post "Gestión de evidencias ISO 27001 con trazabilidad" (WordPress ID 3619), a partir de un levantamiento más amplio pedido por Mario:

- **Categoría WordPress:** se confirmó que la categoría "ISO y Cumplimiento" (slug `iso-y-cumplimiento`) ya existía y ya estaba correctamente asignada solo al post ISO (no mezclada con el post de Firewall Fortinet). No fue necesario crearla de nuevo.
- **Interlinking WP → isos.tecdex.net:** se agregó un hipervínculo en el texto del post ("TCDX Compliance") apuntando a `https://isos.tecdex.net`. Pendiente el enlace inverso (isos.tecdex.net → el post del blog), que requiere un cambio en el repo `webtcdx` (Codex).
- **Filtro por categoría en widgets de contenido relacionado (Elementor, plantilla "Entradas", post ID 3337):** se detectaron **tres** widgets distintos que mostraban contenido de Fortinet (fuera de tema) en el post ISO, no solo uno:
  1. Widget "Navegación de la entrada" (anterior/siguiente) — se configuró "En el mismo término" → tipo "Entradas" → taxonomía "Categorías", para que solo navegue entre posts de la misma categoría.
  2. Widget "Entradas" (Posts) bajo el encabezado "Otros contenidos que podrían interesarte" (parte inferior del artículo) — mismo fix: Consulta → Origen "Relacionado" → Incluir por "Término" → "Categorías".
  3. Un **tercer widget "Entradas" en la barra lateral**, justo debajo de "Tabla de contenidos", que no había sido detectado en el levantamiento original y que también mostraba 6 artículos de Fortinet sin relación con ISO — mismo fix aplicado (Término → Categorías).
  Con los 3 widgets filtrados por categoría, y dado que hoy solo existe 1 post en la categoría "ISO y Cumplimiento", los tres se muestran vacíos (comportamiento esperado y correcto: no hay "fallback" a otras categorías). Se irán poblando solos a medida que se publiquen más artículos ISO.
- **Hallazgo importante — caché de página completa (LiteSpeed Cache):** al verificar el resultado en vivo como visitante anónimo (no logueado), se detectó que WordPress tiene el plugin **LiteSpeed Cache** activo (no detectado en el levantamiento previo, que solo había revisado NitroPack —inactivo— y WPCode). Este plugin cachea el HTML completo de cada página, por lo que **los cambios de canonical, del filtro WPCode y de los widgets de Elementor no llegaban a visitantes reales ni a Google hasta purgar la caché manualmente**, aunque en el editor (sesión de administrador) todo se veía correcto. Se purgó la caché completa dos veces (WP Admin → LiteSpeed Cache → Purgar todo) y se verificó con fetch anónimo que el canonical cruzado, el interlinking y los 3 widgets corregidos ya se ven bien para cualquier visitante.
  **Nota operativa para el futuro:** cualquier cambio futuro en Elementor, Rank Math o WPCode debe ir seguido de una purga de caché LiteSpeed, o el cambio no será visible para visitantes reales ni recrawleado por Google hasta que la caché expire por sí sola.
- **Pendiente sin resolver — origen de meta-keywords/og:locale hardcodeados:** se re-confirmó (después de la purga de caché, para descartar que fuera un artefacto de caché) que el post sigue emitiendo `meta-keywords`, `meta-CLASSIFICATION`, `meta-rating`, `meta-revisit-after`, `meta-copyright` y `og:locale: es_ES` con contenido genérico/antiguo de Fortinet, no relacionado a ISO. Como no es un problema de caché (persiste tras purgar), se descarta esa hipótesis. Se ha descartado como origen: Rank Math (por post y global), WPCode (solo 4 snippets, ninguno relacionado), el tema activo "Hello Elementor" (header.php/functions.php sin modificar), otro plugin SEO duplicado (solo Rank Math + PRO activos) y NitroPack (nunca conectado). Sigue pendiente de acceso a servidor (FTP/SSH/gestor de archivos) para ubicar el mu-plugin o snippet que genera estas etiquetas, o bien una decisión de Mario de simplemente ignorarlas dado que no tienen valor SEO moderno.

## 7. Pendiente de aprobación de Mario (antes de que Codex ejecute)

1. ¿Confirmar si `tcdx.cl` es un dominio de marca vigente y debe mantenerse en metadata, o si todo debe apuntar a `tecdex.net`?
2. ¿La plataforma está disponible/vendible fuera de Chile? (afecta FAQ propuesta #2 y keywords "plataforma iso latinoamérica" / "software iso latinoamérica" — hoy están en Soro como keyword idea, no publicadas).
3. Aprobar el commit/push pendiente de `next.config.js` + `NormativeLanding.tsx` (bloqueado por `.git/index.lock` local — requiere que Mario ejecute `rm /Users/mcaceres/GIT/webtcdx/.git/index.lock`).
4. Aprobar que Codex cree la rama `feature/iso-seo-onpage` y abra PR (sin merge automático).

## 8. Pendiente de la siguiente etapa (no iniciado)

- Revisión de Rank Math en WordPress para `/iso` (título/desc/H1 a nivel de la página WP, separado del repo `webtcdx`).
- Redacción de los 4 artículos de blog propuestos (sección 4) vía Soro, con revisión editorial antes de reactivar auto-publish.
- Conectar Google Search Console en Soro (opcional, no conectado aún) para medir posición real de las keywords una vez publicados los cambios.
