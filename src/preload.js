const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
  downloadVideo: (url, options) => ipcRenderer.invoke('download-video', url, options),
  downloadAudio: (url, options) => ipcRenderer.invoke('download-audio', url, options),
  downloadThumbnail: (url) => ipcRenderer.invoke('download-thumbnail', url),
  downloadSubtitles: (url, options) => ipcRenderer.invoke('download-subtitles', url, options),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (event, data) => callback(data))
});
