import './style.css';

// Huffman Node class
class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

// Huffman compression implementation
class HuffmanCompression {
  constructor() {
    this.codes = new Map();
  }

  buildHuffmanTree(data) {
    const freq = new Map();
    for (const byte of data) {
      freq.set(byte, (freq.get(byte) || 0) + 1);
    }

    const pq = Array.from(freq.entries()).map(
      ([char, freq]) => new HuffmanNode(char, freq)
    );

    while (pq.length > 1) {
      pq.sort((a, b) => a.freq - b.freq);
      const left = pq.shift();
      const right = pq.shift();
      const parent = new HuffmanNode(null, left.freq + right.freq);
      parent.left = left;
      parent.right = right;
      pq.push(parent);
    }

    return pq[0];
  }

  generateCodes(root, code = '') {
    if (root === null) return;

    if (root.char !== null) {
      this.codes.set(root.char, code);
      return;
    }

    this.generateCodes(root.left, code + '0');
    this.generateCodes(root.right, code + '1');
  }

  compress(data) {
    const startTime = performance.now();
    const root = this.buildHuffmanTree(data);
    this.generateCodes(root, '');

    let compressed = '';
    for (const byte of data) {
      compressed += this.codes.get(byte);
    }

    const compressedData = new Uint8Array(Math.ceil(compressed.length / 8));
    for (let i = 0; i < compressed.length; i += 8) {
      const byte = compressed.substr(i, 8).padEnd(8, '0');
      compressedData[i / 8] = parseInt(byte, 2);
    }

    const endTime = performance.now();

    return {
      data: compressedData,
      originalSize: data.length,
      compressedSize: compressedData.length,
      compressionRatio: ((1 - compressedData.length / data.length) * 100).toFixed(2),
      timeTaken: (endTime - startTime).toFixed(2)
    };
  }
}

// Initialize Huffman compression
const huffman = new HuffmanCompression();
let compressedResult = null;

// UI Elements
const app = document.querySelector('#app');
app.innerHTML = `
  <nav>
    <div class="nav-content">
      <div class="logo">FileCompress</div>
      <div class="nav-links">
        <a href="#" id="about-link">About</a>
      </div>
    </div>
  </nav>
  
  <div class="container">
    <h1>File Compression using Huffman Algorithm</h1>
    
    <div class="upload-container" id="dropZone">
      <div class="upload-icon">📁</div>
      <p>Drag and drop your file here or</p>
      <input type="file" id="fileInput" hidden>
      <button class="button" id="uploadButton">Choose File</button>
    </div>

    <div class="error-message" id="errorMessage"></div>
    <div class="success-message" id="successMessage"></div>

    <div class="progress-bar" id="progressBar">
      <div class="progress-bar-fill" id="progressBarFill"></div>
    </div>

    <div class="stats-container" id="statsContainer" style="display: none;">
      <div class="stat-card">
        <h3>Original Size</h3>
        <div class="stat-value" id="originalSize">-</div>
      </div>
      <div class="stat-card">
        <h3>Compressed Size</h3>
        <div class="stat-value" id="compressedSize">-</div>
      </div>
      <div class="stat-card">
        <h3>Compression Ratio</h3>
        <div class="stat-value" id="compressionRatio">-</div>
      </div>
      <div class="stat-card">
        <h3>Time Taken</h3>
        <div class="stat-value" id="timeTaken">-</div>
      </div>
    </div>

    <button class="button" id="downloadButton" style="display: none;">
      Download Compressed File
    </button>
  </div>

  <div class="modal" id="aboutModal">
    <div class="modal-content">
       <h2>About Huffman Compression</h2>
      <p>Huffman compression is an efficient data compression algorithm that creates variable-length codes based on the frequency of characters in the data. Characters that appear more frequently are assigned shorter codes, while less frequent characters get longer codes, resulting in overall data compression.</p>
      
      <h3>How it Works</h3>
      <p>The algorithm works by building a binary tree (Huffman tree) based on character frequencies. Each leaf node represents a character and its frequency. The path from the root to a leaf determines the binary code for that character.</p>
      
      <h3>Advantages</h3>
      <ul>
        <li>Lossless compression - no data is lost during compression</li>
        <li>Efficient for text and binary data</li>
        <li>Variable-length coding optimizes space usage</li>
        <li>Fast compression and decompression</li>
      </ul>

      <h3>Supported File Formats</h3>
      <ul>
        <li>Text files (.txt)</li>
        <li>Images (.bmp, .png)</li>
        <li>Audio (.wav, .mp3)</li>
        <li>Video (.mp4)</li>
        <li>Binary files (.bin)</li>
      </ul>
      
      <button class="button" id="closeAboutModal">Close</button>
    </div>
    </div>
  </div>
`;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const progressBar = document.getElementById('progressBar');
const progressBarFill = document.getElementById('progressBarFill');
const statsContainer = document.getElementById('statsContainer');
const downloadButton = document.getElementById('downloadButton');
const aboutModal = document.getElementById('aboutModal');
const aboutLink = document.getElementById('about-link');
const closeAboutModal = document.getElementById('closeAboutModal');

// Supported file types
const supportedTypes = [
  'text/plain',
  'image/bmp',
  'image/png',
  'audio/wav',
  'audio/mp3',
  'video/mp4',
  'application/octet-stream'
];

uploadButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', handleFileSelect);

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragging');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
});

downloadButton.addEventListener('click', () => {
  if (!compressedResult) return;

  const blob = new Blob([compressedResult.data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'compressed_file.huf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Modal event listeners
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  aboutModal.classList.add('show');
  document.body.style.overflow = 'hidden';
});

closeAboutModal.addEventListener('click', () => {
  aboutModal.classList.remove('show');
  document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      showProgress(true);
      compressedResult = huffman.compress(data);
      updateStats(compressedResult);
      showSuccess('File compressed successfully!');
      downloadButton.style.display = 'block';
    } catch (error) {
      showError('Error compressing file: ' + error.message);
    } finally {
      showProgress(false);
    }
  };

  reader.onerror = () => showError('Error reading file.');
  reader.readAsArrayBuffer(file);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  successMessage.style.display = 'none';
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';
}

function showProgress(show) {
  progressBar.style.display = show ? 'block' : 'none';
  progressBarFill.style.width = show ? '100%' : '0%';
}

function updateStats(result) {
  statsContainer.style.display = 'grid';
  document.getElementById('originalSize').textContent = `${result.originalSize} bytes`;
  document.getElementById('compressedSize').textContent = `${result.compressedSize} bytes`;
  document.getElementById('compressionRatio').textContent = `${result.compressionRatio}%`;
  document.getElementById('timeTaken').textContent = `${result.timeTaken} ms`;
}
