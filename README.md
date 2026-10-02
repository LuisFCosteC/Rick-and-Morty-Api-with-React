# 🧪 Rick and Morty Multiverse Explorer

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com/)
[![API](https://img.shields.io/badge/API-The_Rick_and_Morty_API-97ce4c?logo=graphql&logoColor=black)](https://rickandmortyapi.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Aplicación web moderna e interactiva construida con **React** que consume la API REST de **[The Rick and Morty API](https://rickandmortyapi.com/)**. Permite explorar, buscar y filtrar personajes de todo el multiverso con una interfaz temática oscura inspirada en la serie.

---

## 🚀 Demo en Vivo

Puedes ver y probar la aplicación desplegada en:
👉 **[rick-and-morty-api-with-react.vercel.app](https://vercel.com/)** *(Actualiza este enlace con tu URL de Vercel tras desplegar)*

---

## ✨ Características Principales

* 🔍 **Búsqueda en Tiempo Real:** Filtra personajes por nombre con respuesta fluida y optimización de peticiones (debounce).
* 🏷️ **Filtros Avanzados:**
  * **Estado:** Vivo (*Alive*), Muerto (*Dead*) o Desconocido (*Unknown*).
  * **Género:** Femenino (*Female*), Masculino (*Male*), Sin género (*Genderless*) o Desconocido (*Unknown*).
* 🃏 **Tarjetas Interactivas:**
  * Indicador visual de estado con punto neón pulsante.
  * Efecto hover con elevación e iluminación.
* 📋 **Modal de Detalles del Personaje:** Consulta especie, género, cantidad de episodios, dimensión/planeta de origen y última ubicación conocida con soporte para tecla `Esc` y clic exterior.
* 📄 **Paginación Dinámica:**
  * Contador de página actual y total de páginas (`Página X de Y`).
  * Desplazamiento suave automático al inicio de página al navegar.
* 🛸 **Feedback Visual:** Spinner animado tipo portal interdimensional para estados de carga y pantalla amigable cuando no hay resultados.
* 📱 **Diseño 100% Responsivo:** Adaptado para móviles, tablets y computadoras de escritorio.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** [React 18](https://reactjs.org/) (Hooks: `useState`, `useEffect`, `useCallback`)
* **Estilos:** CSS3 personalizado con estética temática (Glows, Glassmorphism, Google Fonts *Outfit*) + [Bootstrap 5](https://getbootstrap.com/)
* **Fuente de Datos:** [The Rick and Morty API](https://rickandmortyapi.com/)
* **Despliegue:** [Vercel](https://vercel.com/)

---

## 📂 Estructura del Proyecto

```text
├── public/
│   ├── favicon.ico
│   ├── index.html        # Plantilla HTML con metadatos Open Graph y Bootstrap CDN
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── CharacterModal.js # Modal con ficha técnica del personaje
│   │   ├── Characters.js     # Cuadrícula de tarjetas de personajes
│   │   ├── Filters.js        # Buscador y selectores de estado/género
│   │   ├── Footer.js         # Pie de página y créditos
│   │   ├── Loading.js        # Spinner animado con estilo portal
│   │   ├── Navbar.js         # Barra de navegación superior
│   │   └── Pagination.js     # Controles de paginación y contador
│   ├── App.css           # Estilos personalizados, colores neón y animaciones
│   ├── App.js            # Lógica central, consumo de la API y estados globales
│   └── index.js          # Punto de entrada de React
├── vercel.json           # Configuración de rutas y reescrituras para Vercel
├── package.json          # Dependencias y scripts de ejecución
└── README.md             # Documentación del proyecto
```

---

## 💻 Instalación y Ejecución Local

Para clonar y ejecutar este proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/LuisFCosteC/Rick-and-Morty-Api-with-React.git
   ```

2. **Entrar al directorio del proyecto:**
   ```bash
   cd Rick-and-Morty-Api-with-React
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Guía de Despliegue en Vercel

### Opción 1: Despliegue desde la Web de Vercel (Recomendado)

1. Sube tus cambios a GitHub:
   ```bash
   git add .
   git commit -m "feat: interfaz moderna, filtros, buscador y modal"
   git push origin main
   ```
2. Ve a [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **Add New...** > **Project**.
4. Selecciona tu repositorio **`Rick-and-Morty-Api-with-React`** y pulsa **Import**.
5. Vercel detectará automáticamente Create React App:
   * **Framework Preset:** `Create React App`
   * **Build Command:** `npm run build`
   * **Output Directory:** `build`
6. Haz clic en **Deploy**. ¡Tu aplicación estará en línea en menos de un minuto con HTTPS automático!

### Opción 2: Despliegue usando Vercel CLI

1. Instala Vercel CLI globalmente:
   ```bash
   npm install -g vercel
   ```
2. Ejecuta el comando en la raíz del proyecto:
   ```bash
   vercel
   ```
3. Para publicar en producción:
   ```bash
   vercel --prod
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

Desarrollado por **Luis Coste**  
* GitHub: [@LuisFCosteC](https://github.com/LuisFCosteC)
