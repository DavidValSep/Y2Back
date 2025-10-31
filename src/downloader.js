const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

class Downloader {
  constructor(outputDir = './downloads') {
    this.outputDir = outputDir;
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async getVideoInfo(url) {
    try {
      const info = await ytdl.getInfo(url);
      return {
        title: info.videoDetails.title,
        author: info.videoDetails.author.name,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[0]?.url,
        description: info.videoDetails.description
      };
    } catch (error) {
      throw new Error(`Error obteniendo información del video: ${error.message}`);
    }
  }

  sanitizeFilename(filename) {
    return filename.replace(/[<>:"/\\|?*]/g, '_');
  }

  async downloadVideo(url, options = {}) {
    const info = await ytdl.getInfo(url);
    const title = this.sanitizeFilename(info.videoDetails.title);
    const outputPath = path.join(this.outputDir, `${title}.mp4`);

    return new Promise((resolve, reject) => {
      const videoStream = ytdl(url, {
        quality: options.quality || 'highest',
        filter: 'audioandvideo'
      });

      const writeStream = fs.createWriteStream(outputPath);

      videoStream.pipe(writeStream);

      let downloadedBytes = 0;
      videoStream.on('progress', (chunkLength, downloaded, total) => {
        downloadedBytes = downloaded;
        if (options.onProgress) {
          options.onProgress({
            downloaded,
            total,
            percentage: (downloaded / total * 100).toFixed(2)
          });
        }
      });

      writeStream.on('finish', () => {
        resolve({
          path: outputPath,
          title: info.videoDetails.title,
          size: downloadedBytes
        });
      });

      videoStream.on('error', (error) => {
        reject(new Error(`Error descargando video: ${error.message}`));
      });

      writeStream.on('error', (error) => {
        reject(new Error(`Error escribiendo archivo: ${error.message}`));
      });
    });
  }

  async downloadAudio(url, options = {}) {
    const info = await ytdl.getInfo(url);
    const title = this.sanitizeFilename(info.videoDetails.title);
    const outputPath = path.join(this.outputDir, `${title}.mp3`);

    return new Promise((resolve, reject) => {
      const audioStream = ytdl(url, {
        quality: 'highestaudio',
        filter: 'audioonly'
      });

      const writeStream = fs.createWriteStream(outputPath);

      audioStream.pipe(writeStream);

      let downloadedBytes = 0;
      audioStream.on('progress', (chunkLength, downloaded, total) => {
        downloadedBytes = downloaded;
        if (options.onProgress) {
          options.onProgress({
            downloaded,
            total,
            percentage: (downloaded / total * 100).toFixed(2)
          });
        }
      });

      writeStream.on('finish', () => {
        resolve({
          path: outputPath,
          title: info.videoDetails.title,
          size: downloadedBytes
        });
      });

      audioStream.on('error', (error) => {
        reject(new Error(`Error descargando audio: ${error.message}`));
      });

      writeStream.on('error', (error) => {
        reject(new Error(`Error escribiendo archivo: ${error.message}`));
      });
    });
  }

  async downloadThumbnail(url, options = {}) {
    const info = await ytdl.getInfo(url);
    const title = this.sanitizeFilename(info.videoDetails.title);
    const thumbnails = info.videoDetails.thumbnails;
    const thumbnailUrl = thumbnails[thumbnails.length - 1]?.url || thumbnails[0]?.url;

    if (!thumbnailUrl) {
      throw new Error('No se encontró miniatura para este video');
    }

    const outputPath = path.join(this.outputDir, `${title}_thumbnail.jpg`);

    const https = require('https');
    return new Promise((resolve, reject) => {
      https.get(thumbnailUrl, (response) => {
        const writeStream = fs.createWriteStream(outputPath);
        response.pipe(writeStream);

        writeStream.on('finish', () => {
          writeStream.close();
          resolve({
            path: outputPath,
            title: info.videoDetails.title
          });
        });

        writeStream.on('error', (error) => {
          reject(new Error(`Error escribiendo miniatura: ${error.message}`));
        });
      }).on('error', (error) => {
        reject(new Error(`Error descargando miniatura: ${error.message}`));
      });
    });
  }

  async downloadSubtitles(url, options = {}) {
    const info = await ytdl.getInfo(url);
    const title = this.sanitizeFilename(info.videoDetails.title);
    
    // Obtener subtítulos si están disponibles
    const tracks = info.player_response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    
    if (!tracks || tracks.length === 0) {
      throw new Error('No hay subtítulos disponibles para este video');
    }

    const language = options.language || 'es';
    const track = tracks.find(t => t.languageCode === language) || tracks[0];
    const subtitleUrl = track.baseUrl;

    const outputPath = path.join(this.outputDir, `${title}_${track.languageCode}.srt`);

    const https = require('https');
    return new Promise((resolve, reject) => {
      https.get(subtitleUrl, (response) => {
        const writeStream = fs.createWriteStream(outputPath);
        response.pipe(writeStream);

        writeStream.on('finish', () => {
          writeStream.close();
          resolve({
            path: outputPath,
            title: info.videoDetails.title,
            language: track.languageCode
          });
        });

        writeStream.on('error', (error) => {
          reject(new Error(`Error escribiendo subtítulos: ${error.message}`));
        });
      }).on('error', (error) => {
        reject(new Error(`Error descargando subtítulos: ${error.message}`));
      });
    });
  }
}

module.exports = Downloader;
