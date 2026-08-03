# 🎨 ReactColorPickerDemo

**ReactColorPickerDemo es una pequeña aplicación de una sola página (SPA) hecha en React que permite elegir un color desde una lista desplegable o una fila de botones y verlo al instante en un panel de vista previa.**

Es un proyecto de demostración/aprendizaje: muestra cómo el estado del componente padre baja hacia los componentes hijos mediante props (flujo de datos unidireccional) en un código mínimo y fácil de leer, construido con [Vite](https://vitejs.dev/) y probado con [Vitest](https://vitest.dev/).

![CI](https://github.com/david071197/ReactColorPickerDemo/actions/workflows/ci.yml/badge.svg)
![Azure Static Web Apps](https://github.com/david071197/ReactColorPickerDemo/actions/workflows/azure-static-web-apps-mango-flower-00e2aa010.yml/badge.svg)
![React 18](https://img.shields.io/badge/React-18-61dafb)
![Node 22](https://img.shields.io/badge/Node.js-22-339933)

![Captura de pantalla del selector de color con la lista desplegable, los botones de color y el panel de vista previa](docs/screenshot.png)

---

## 📚 Tabla de contenidos

- [¿Para quién es esto?](#-para-quién-es-esto)
- [Requisitos](#-requisitos)
- [Inicio rápido](#-inicio-rápido)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Cómo funciona](#-cómo-funciona)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 👥 ¿Para quién es esto?

Personas que están aprendiendo React —o quienes revisan esta demo— y quieren un ejemplo funcional de composición de componentes y elevación de estado (*state lifting*) sin el ruido de una aplicación grande. No se necesita backend, base de datos ni claves de API.

---

## ✅ Requisitos

| Herramienta | Versión | Notas |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | **22 o superior** (ver [`.nvmrc`](.nvmrc)) | Vite 8 y Vitest 4 requieren Node 22+; con versiones anteriores el proyecto no arranca. |
| npm | Incluido con Node 22 | El repositorio tiene `package-lock.json`, por lo que npm es el gestor de paquetes soportado. Aquí no se usa Yarn: hacerlo ignoraría el lockfile. |

```bash
# Si usas nvm, selecciona la versión fijada en .nvmrc
nvm use
```

---

## 🚀 Inicio rápido

```bash
# 1. Clona el repositorio
git clone https://github.com/david071197/ReactColorPickerDemo.git
cd ReactColorPickerDemo

# 2. Instala las dependencias tal como están en el lockfile (usa `npm install` si necesitas cambiarlas)
npm ci

# 3. Levanta el servidor de desarrollo en http://localhost:5173
npm start
```

Luego abre <http://localhost:5173> en tu navegador.

Para revisar una compilación de producción en local:

```bash
npm run build     # genera los archivos estáticos en build/
npm run preview   # sirve build/ en un puerto local
```

---

## 🧰 Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `npm start` / `npm run dev` | Inicia el servidor de desarrollo de Vite con recarga en caliente (HMR). |
| `npm test` | Ejecuta una vez la suite de pruebas de Vitest (entorno jsdom). |
| `npm run build` | Crea el paquete optimizado de producción en `build/`. |
| `npm run preview` | Sirve el contenido de `build/` para una revisión final. |

---

## 🗂 Estructura del proyecto

```text
.
├── index.html          # HTML de entrada de Vite (carga src/main.jsx)
├── vite.config.js      # Configuración de Vite + plugin de React; la salida va a build/
├── src/
│   ├── main.jsx        # Raíz de React, monta <App />
│   ├── App.jsx         # Componentes App, ColorPicker, ColorDropdown y ColorContainer
│   ├── App.test.jsx    # Prueba de humo: renderiza la app sin errores
│   ├── App.css         # Estilos del layout, las muestras de color y la lista desplegable
│   ├── index.css       # Estilos globales base
│   └── logo.svg        # Logo de React usado en la cabecera
├── public/             # Archivos estáticos copiados tal cual (favicon, manifest, config de SWA)
├── docs/               # Imágenes usadas por la documentación
└── .github/workflows/  # CI (build, pruebas, npm audit) y despliegue a Azure Static Web Apps
```

---

## 🧩 Cómo funciona

- **`ColorPicker`** es la única fuente de verdad: guarda el color seleccionado en su estado (`"black"` por defecto).
- **`ColorDropdown`** y los botones de color son las entradas: avisan a `ColorPicker` para cambiar el estado.
- **`ColorContainer`** es un componente de presentación que recibe el color como prop y dibuja el panel de vista previa.

```jsx
// Simplificado: el estado vive en el padre y los hijos reciben props
<ColorDropdown color={this.state.color} onChange={(color) => this.setState({ color })} />
<ColorContainer color={this.state.color} />
```

Los colores se aplican con clases CSS (`color-blue`, `color-green`, …) definidas en `src/App.css`, así que agregar un color implica añadirlo a la lista `COLORS` en `src/App.jsx` y crear la clase CSS correspondiente.

---

## ☁️ Despliegue

Los push y los pull requests hacia `master` disparan dos flujos de GitHub Actions:

- [`ci.yml`](.github/workflows/ci.yml) — instala dependencias, ejecuta las pruebas, compila la app y falla si `npm audit` encuentra vulnerabilidades de severidad alta.
- [`azure-static-web-apps-mango-flower-00e2aa010.yml`](.github/workflows/azure-static-web-apps-mango-flower-00e2aa010.yml) — compila y despliega en Azure Static Web Apps, y crea un entorno de vista previa temporal para cada pull request abierto.

Las cabeceras de seguridad de producción (CSP, HSTS, `X-Frame-Options`, …) están definidas en [`public/staticwebapp.config.json`](public/staticwebapp.config.json).

---

## 🤝 Contribuir

Los issues y pull requests son bienvenidos. No existe un archivo `CONTRIBUTING.md`, así que por favor:

1. Crea una rama a partir de `master`.
2. Mantén los cambios acotados y respeta el estilo de código existente.
3. Ejecuta `npm test` y `npm run build` antes de abrir el pull request.
4. Abre el pull request contra `master` y espera el CI y el entorno de vista previa de Azure.

---

## 📄 Licencia

Este repositorio es una demo privada (`"private": true` en [`package.json`](package.json)) y por ahora **no incluye un archivo LICENSE**, por lo que no se conceden derechos de uso por defecto. Si deseas reutilizar el código, abre un issue para pedir al mantenedor que agregue una licencia explícita.

---

🇬🇧 Prefer English? Read the [English README](README.md).

_Escrito y mantenido originalmente por colaboradores y [Devin](https://app.devin.ai), con actualizaciones del equipo principal._
