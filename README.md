# 📁 FileCompress

A web-based demonstration of Huffman compression algorithm for text files, built with vanilla JavaScript. This interactive tool helps users understand how text compression works by visualizing character frequencies and compression ratios.

## 🌟 Features

- **Real-time Text Analysis**: Instantly analyze uploaded text files
- **Huffman Compression**: Implements the complete Huffman coding algorithm
- **Compression Statistics**: Shows original size, compressed size, and compression ratio
- **Interactive UI**: Drag-and-drop file upload support
- **Download Support**: Download compressed file output
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Demo

Try it live: https://resplendent-mochi-33193f.netlify.app/

## 💻 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Huffman Coding Algorithm

## 🛠️ Implementation Details

The project implements the following key components:

1. **Huffman Tree Construction**: Builds an optimal prefix tree based on character frequency.
2. **Compression Algorithm**: Generates optimal variable-length codes for characters
3. **User Interface**: Responsive design with drag-and-drop support

## 📊 How It Works

1. Upload a file through the interface
2. The system checks if the file is supported
3. For text files, it:
   - Counts character frequencies
   - Builds a Huffman tree
   - Generates optimal binary codes
   - Calculates compression statistics
   - Displays detailed analysis

## 🔧 Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Vaibhav200303/FileCompressor-ex-.git
   ```

2. Open `index.html` in a web browser
   ```bash
   cd huffman-compression-demo
   # Use any local server, for example:
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` in your browser

## 📝 Usage

1. Click the upload area or drag and drop a text file
2. View the compression analysis in real-time
3. Download the compressed output if desired

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Huffman coding algorithm by David A. Huffman
- Inspired by the need for better compression algorithm visualization tools
- Thanks to all contributors and users of this demo

## 📧 Contact

Vaibhav Sharma - mailto: vs2709226@gmail.com

Project Link: https://github.com/Vaibhav200303/FileCompressor-ex-
