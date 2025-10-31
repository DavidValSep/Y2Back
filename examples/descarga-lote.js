// Ejemplo de descarga por lotes
const Downloader = require('../src/downloader');

async function descargarMultiplesVideos() {
  const downloader = new Downloader('./descargas-lote');
  
  // Lista de URLs de videos
  const videoUrls = [
    'https://www.youtube.com/watch?v=VIDEO_ID_1',
    'https://www.youtube.com/watch?v=VIDEO_ID_2',
    'https://www.youtube.com/watch?v=VIDEO_ID_3'
  ];
  
  console.log(`Descargando ${videoUrls.length} videos...\n`);
  
  for (let i = 0; i < videoUrls.length; i++) {
    const url = videoUrls[i];
    console.log(`[${i + 1}/${videoUrls.length}] Procesando video...`);
    
    try {
      // Obtener información
      const info = await downloader.getVideoInfo(url);
      console.log(`  Título: ${info.title}`);
      
      // Descargar audio (más rápido que video completo)
      console.log('  Descargando audio...');
      const result = await downloader.downloadAudio(url, {
        onProgress: (progress) => {
          if (parseInt(progress.percentage) % 25 === 0) {
            console.log(`  Progreso: ${progress.percentage}%`);
          }
        }
      });
      
      console.log(`  ✓ Completado: ${result.path}\n`);
      
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
    }
  }
  
  console.log('Descarga por lotes completada.');
}

// Ejecutar
descargarMultiplesVideos();
