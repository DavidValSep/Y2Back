const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Downloader = require('./downloader');

let mainWindow;
let downloader;

function createWindow() {
  const windowConfig = {
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  };
  
  // Add icon if it exists
  const iconPath = path.join(__dirname, '../assets/icon.png');
  const fs = require('fs');
  if (fs.existsSync(iconPath)) {
    windowConfig.icon = iconPath;
  }
  
  mainWindow = new BrowserWindow(windowConfig);

  mainWindow.loadFile(path.join(__dirname, '../gui/index.html'));

  // Abrir DevTools en desarrollo
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  downloader = new Downloader();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-video-info', async (event, url) => {
  try {
    const info = await downloader.getVideoInfo(url);
    return { success: true, data: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('download-video', async (event, url, options) => {
  try {
    const result = await downloader.downloadVideo(url, {
      quality: options.quality,
      onProgress: (progress) => {
        mainWindow.webContents.send('download-progress', {
          type: 'video',
          progress
        });
      }
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('download-audio', async (event, url, options) => {
  try {
    const result = await downloader.downloadAudio(url, {
      onProgress: (progress) => {
        mainWindow.webContents.send('download-progress', {
          type: 'audio',
          progress
        });
      }
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('download-thumbnail', async (event, url) => {
  try {
    const result = await downloader.downloadThumbnail(url);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('download-subtitles', async (event, url, options) => {
  try {
    const result = await downloader.downloadSubtitles(url, {
      language: options.language
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
