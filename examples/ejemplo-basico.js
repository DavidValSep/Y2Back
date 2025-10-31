// Ejemplo de uso programático de Yoo2Back
const Downloader = require('../src/downloader');

async function ejemploBasico() {
  // Crear una instancia del descargador
  const downloader = new Downloader('./mis-descargas');
  
  // URL del video de ejemplo
  const videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID';
  
  try {
    // Obtener información del video
    console.log('Obteniendo información del video...');
    const info = await downloader.getVideoInfo(videoUrl);
    console.log('Título:', info.title);
    console.log('Autor:', info.author);
    console.log('Duración:', info.duration, 'segundos');
    
    // Descargar video con callback de progreso
    console.log('\nDescargando video...');
    const videoResult = await downloader.downloadVideo(videoUrl, {
      quality: 'highest',
      onProgress: (progress) => {
        console.log(`Progreso: ${progress.percentage}%`);
      }
    });
    console.log('Video descargado en:', videoResult.path);
    
    // Descargar solo audio
    console.log('\nDescargando audio...');
    const audioResult = await downloader.downloadAudio(videoUrl, {
      onProgress: (progress) => {
        console.log(`Progreso: ${progress.percentage}%`);
      }
    });
    console.log('Audio descargado en:', audioResult.path);
    
    // Descargar miniatura
    console.log('\nDescargando miniatura...');
    const thumbnailResult = await downloader.downloadThumbnail(videoUrl);
    console.log('Miniatura descargada en:', thumbnailResult.path);
    
    // Intentar descargar subtítulos en español
    console.log('\nDescargando subtítulos...');
    try {
      const subtitlesResult = await downloader.downloadSubtitles(videoUrl, {
        language: 'es'
      });
      console.log('Subtítulos descargados en:', subtitlesResult.path);
    } catch (error) {
      console.log('No hay subtítulos disponibles:', error.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Ejecutar el ejemplo
ejemploBasico();
