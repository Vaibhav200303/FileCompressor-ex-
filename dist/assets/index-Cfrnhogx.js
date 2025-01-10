(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();class p{constructor(e,o){this.char=e,this.freq=o,this.left=null,this.right=null}}class w{constructor(){this.codes=new Map}buildHuffmanTree(e){const o=new Map;for(const s of e)o.set(s,(o.get(s)||0)+1);const i=Array.from(o.entries()).map(([s,n])=>new p(s,n));for(;i.length>1;){i.sort((a,u)=>a.freq-u.freq);const s=i.shift(),n=i.shift(),r=new p(null,s.freq+n.freq);r.left=s,r.right=n,i.push(r)}return i[0]}generateCodes(e,o=""){if(e!==null){if(e.char!==null){this.codes.set(e.char,o);return}this.generateCodes(e.left,o+"0"),this.generateCodes(e.right,o+"1")}}compress(e){const o=performance.now(),i=this.buildHuffmanTree(e);this.generateCodes(i,"");let s="";for(const a of e)s+=this.codes.get(a);const n=new Uint8Array(Math.ceil(s.length/8));for(let a=0;a<s.length;a+=8){const u=s.substr(a,8).padEnd(8,"0");n[a/8]=parseInt(u,2)}const r=performance.now();return{data:n,originalSize:e.length,compressedSize:n.length,compressionRatio:((1-n.length/e.length)*100).toFixed(2),timeTaken:(r-o).toFixed(2)}}}const E=new w;let d=null;const B=document.querySelector("#app");B.innerHTML=`
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
`;const l=document.getElementById("dropZone"),v=document.getElementById("fileInput"),L=document.getElementById("uploadButton"),m=document.getElementById("errorMessage"),f=document.getElementById("successMessage"),C=document.getElementById("progressBar"),I=document.getElementById("progressBarFill"),k=document.getElementById("statsContainer"),y=document.getElementById("downloadButton"),c=document.getElementById("aboutModal"),F=document.getElementById("about-link"),M=document.getElementById("closeAboutModal");L.addEventListener("click",()=>v.click());v.addEventListener("change",S);l.addEventListener("dragover",t=>{t.preventDefault(),l.classList.add("dragging")});l.addEventListener("dragleave",()=>{l.classList.remove("dragging")});l.addEventListener("drop",t=>{t.preventDefault(),l.classList.remove("dragging");const e=t.dataTransfer.files[0];e&&b(e)});y.addEventListener("click",()=>{if(!d)return;const t=new Blob([d.data],{type:"application/octet-stream"}),e=URL.createObjectURL(t),o=document.createElement("a");o.href=e,o.download="compressed_file.huf",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(e)});F.addEventListener("click",t=>{t.preventDefault(),c.classList.add("show"),document.body.style.overflow="hidden"});M.addEventListener("click",()=>{c.classList.remove("show"),document.body.style.overflow=""});window.addEventListener("click",t=>{t.target===c&&(c.classList.remove("show"),document.body.style.overflow="")});function S(t){const e=t.target.files[0];e&&b(e)}function b(t){const e=new FileReader;e.onload=async o=>{try{const i=new Uint8Array(o.target.result);h(!0),d=E.compress(i),q(d),T("File compressed successfully!"),y.style.display="block"}catch(i){g("Error compressing file: "+i.message)}finally{h(!1)}},e.onerror=()=>g("Error reading file."),e.readAsArrayBuffer(t)}function g(t){m.textContent=t,m.style.display="block",f.style.display="none"}function T(t){f.textContent=t,f.style.display="block",m.style.display="none"}function h(t){C.style.display=t?"block":"none",I.style.width=t?"100%":"0%"}function q(t){k.style.display="grid",document.getElementById("originalSize").textContent=`${t.originalSize} bytes`,document.getElementById("compressedSize").textContent=`${t.compressedSize} bytes`,document.getElementById("compressionRatio").textContent=`${t.compressionRatio}%`,document.getElementById("timeTaken").textContent=`${t.timeTaken} ms`}
