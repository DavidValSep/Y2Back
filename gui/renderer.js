// DOM Elements
const videoUrlInput = document.getElementById('videoUrl');
const getInfoBtn = document.getElementById('getInfoBtn');
const videoInfoSection = document.getElementById('videoInfo');
const progressSection = document.getElementById('progressSection');
const statusMessage = document.getElementById('statusMessage');

const downloadVideoBtn = document.getElementById('downloadVideoBtn');
const downloadAudioBtn = document.getElementById('downloadAudioBtn');
const downloadThumbnailBtn = document.getElementById('downloadThumbnailBtn');
const downloadSubtitlesBtn = document.getElementById('downloadSubtitlesBtn');

const progressBar = document.getElementById('progressBar');
const progressPercentage = document.getElementById('progressPercentage');
const progressText = document.getElementById('progressText');

let currentVideoInfo = null;

// Utility Functions
function showStatus(message, type = 'info') {
  statusMessage.classList.remove('hidden');
  const statusText = document.getElementById('statusText');
  const statusIcon = document.getElementById('statusIcon');
  
  statusText.textContent = message;
  
  if (type === 'success') {
    statusIcon.innerHTML = `
      <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
  } else if (type === 'error') {
    statusIcon.innerHTML = `
      <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
  } else {
    statusIcon.innerHTML = `
      <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
  }
  
  setTimeout(() => {
    statusMessage.classList.add('hidden');
  }, 5000);
}

function showProgress(show = true) {
  if (show) {
    progressSection.classList.remove('hidden');
  } else {
    progressSection.classList.add('hidden');
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
  }
}

function updateProgress(percentage, text = 'Descargando...') {
  progressBar.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}%`;
  progressText.textContent = text;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Event Handlers
getInfoBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();
  
  if (!url) {
    showStatus('Por favor ingresa una URL válida', 'error');
    return;
  }

  getInfoBtn.disabled = true;
  getInfoBtn.textContent = 'Cargando...';
  
  try {
    const result = await window.electronAPI.getVideoInfo(url);
    
    if (result.success) {
      currentVideoInfo = result.data;
      
      // Display video info
      document.getElementById('videoTitle').textContent = result.data.title;
      document.getElementById('videoAuthor').textContent = result.data.author;
      document.getElementById('videoDuration').textContent = formatDuration(result.data.duration);
      
      if (result.data.thumbnail) {
        document.getElementById('thumbnailImg').src = result.data.thumbnail;
        document.getElementById('videoThumbnail').classList.remove('hidden');
      }
      
      videoInfoSection.classList.remove('hidden');
      showStatus('Información del video obtenida correctamente', 'success');
    } else {
      showStatus(`Error: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    getInfoBtn.disabled = false;
    getInfoBtn.textContent = 'Info';
  }
});

downloadVideoBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();
  
  if (!url) {
    showStatus('Por favor ingresa una URL válida', 'error');
    return;
  }

  downloadVideoBtn.disabled = true;
  showProgress(true);
  updateProgress(0, 'Iniciando descarga de video...');
  
  try {
    const result = await window.electronAPI.downloadVideo(url, { quality: 'highest' });
    
    if (result.success) {
      updateProgress(100, 'Video descargado');
      showStatus(`Video descargado: ${result.data.title}`, 'success');
      setTimeout(() => showProgress(false), 2000);
    } else {
      showStatus(`Error: ${result.error}`, 'error');
      showProgress(false);
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
    showProgress(false);
  } finally {
    downloadVideoBtn.disabled = false;
  }
});

downloadAudioBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();
  
  if (!url) {
    showStatus('Por favor ingresa una URL válida', 'error');
    return;
  }

  downloadAudioBtn.disabled = true;
  showProgress(true);
  updateProgress(0, 'Iniciando descarga de audio...');
  
  try {
    const result = await window.electronAPI.downloadAudio(url, {});
    
    if (result.success) {
      updateProgress(100, 'Audio descargado');
      showStatus(`Audio descargado: ${result.data.title}`, 'success');
      setTimeout(() => showProgress(false), 2000);
    } else {
      showStatus(`Error: ${result.error}`, 'error');
      showProgress(false);
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
    showProgress(false);
  } finally {
    downloadAudioBtn.disabled = false;
  }
});

downloadThumbnailBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();
  
  if (!url) {
    showStatus('Por favor ingresa una URL válida', 'error');
    return;
  }

  downloadThumbnailBtn.disabled = true;
  
  try {
    const result = await window.electronAPI.downloadThumbnail(url);
    
    if (result.success) {
      showStatus(`Miniatura descargada: ${result.data.title}`, 'success');
    } else {
      showStatus(`Error: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    downloadThumbnailBtn.disabled = false;
  }
});

downloadSubtitlesBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();
  
  if (!url) {
    showStatus('Por favor ingresa una URL válida', 'error');
    return;
  }

  downloadSubtitlesBtn.disabled = true;
  
  try {
    const result = await window.electronAPI.downloadSubtitles(url, { language: 'es' });
    
    if (result.success) {
      showStatus(`Subtítulos descargados: ${result.data.title} (${result.data.language})`, 'success');
    } else {
      showStatus(`Error: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    downloadSubtitlesBtn.disabled = false;
  }
});

// Listen for download progress updates
window.electronAPI.onDownloadProgress((data) => {
  if (data.progress) {
    updateProgress(
      parseFloat(data.progress.percentage),
      `Descargando ${data.type}... ${data.progress.percentage}%`
    );
  }
});
