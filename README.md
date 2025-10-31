# 🎬 Yoo2Back

Yoo2Back es un potente sistema de descarga y respaldo de contenido de YouTube con CLI y GUI funcionales, creado en Node.js. Permite obtener videos, audios, subtítulos y miniaturas sin inicio de sesión. Su interfaz Electron + Tailwind ofrece una experiencia moderna y portable, ideal para creadores y desarrolladores que buscan control y eficiencia en sus descargas.

## ✨ Características

- 🎥 **Descarga de Videos**: Videos en alta calidad con selección de resolución
- 🎵 **Extracción de Audio**: Solo audio en formato MP3
- 🖼️ **Miniaturas**: Descarga las miniaturas en máxima calidad
- 📝 **Subtítulos**: Obtén subtítulos en múltiples idiomas
- 🖥️ **Interfaz Gráfica Moderna**: GUI con Electron y Tailwind CSS
- ⌨️ **CLI Potente**: Interfaz de línea de comandos completa
- 🚫 **Sin Inicio de Sesión**: No requiere autenticación en YouTube
- ⚡ **Rápido y Eficiente**: Descargas optimizadas con barras de progreso

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/DavidValSep/Yoo2Back.git
cd Yoo2Back

# Instalar dependencias
npm install
```

## 🚀 Uso

### Interfaz Gráfica (GUI)

Ejecuta la aplicación Electron:

```bash
npm start
```

La GUI ofrece:
- Campo de entrada para URLs de YouTube
- Botones para diferentes tipos de descarga
- Información del video en tiempo real
- Barra de progreso durante las descargas
- Notificaciones de estado

### Interfaz de Línea de Comandos (CLI)

#### Obtener información del video

```bash
npm run cli info https://www.youtube.com/watch?v=VIDEO_ID
```

#### Descargar video

```bash
npm run cli video https://www.youtube.com/watch?v=VIDEO_ID
```

Con opciones personalizadas:

```bash
npm run cli video https://www.youtube.com/watch?v=VIDEO_ID -o ./mis-descargas -q highest
```

#### Descargar solo audio

```bash
npm run cli audio https://www.youtube.com/watch?v=VIDEO_ID
```

#### Descargar miniatura

```bash
npm run cli thumbnail https://www.youtube.com/watch?v=VIDEO_ID
```

#### Descargar subtítulos

```bash
npm run cli subtitles https://www.youtube.com/watch?v=VIDEO_ID -l es
```

Otros idiomas disponibles: `en`, `fr`, `de`, etc.

## 📁 Estructura del Proyecto

```
Yoo2Back/
├── src/
│   ├── index.js          # Aplicación principal Electron
│   ├── preload.js        # Script de precarga Electron
│   ├── cli.js            # Interfaz CLI
│   └── downloader.js     # Módulo de descarga principal
├── gui/
│   ├── index.html        # Interfaz gráfica
│   └── renderer.js       # Lógica del renderer
├── package.json
└── README.md
```

## 🛠️ Tecnologías

- **Node.js**: Runtime de JavaScript
- **Electron**: Framework para aplicaciones de escritorio
- **ytdl-core**: Biblioteca para descargas de YouTube
- **Commander**: Parser de comandos CLI
- **Chalk**: Estilización de terminal
- **Ora**: Spinners de carga para CLI
- **Tailwind CSS**: Framework CSS para UI moderna

## 📋 Requisitos

- Node.js 14.0 o superior
- npm 6.0 o superior

## 🎯 Casos de Uso

- **Creadores de Contenido**: Respaldo de sus propios videos
- **Desarrolladores**: Descarga de material de referencia
- **Educación**: Acceso offline a contenido educativo
- **Investigación**: Archivo de contenido para análisis

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⚠️ Aviso Legal

Este software está diseñado para uso educativo y de respaldo personal. Los usuarios son responsables de cumplir con los términos de servicio de YouTube y las leyes de derechos de autor aplicables en su jurisdicción.

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes sugerencias, por favor abre un issue en GitHub.

---

Desarrollado con ❤️ por DavidValSep
