# 🤖 AI Chatbot

A modern, intelligent chatbot platform powered by Google's Gemini 2.0 Flash AI. Features a sleek, responsive interface with real-time conversations, image analysis capabilities, and emoji support.

![AI Chatbot Preview](./src/assets/c2logo3.png)

## ✨ Features

- **🧠 AI-Powered Conversations** — Powered by Google Gemini 2.0 Flash for intelligent, context-aware responses
- **🖼️ Image Analysis** — Upload and analyze images directly in the chat
- **💬 Real-time Chat** — Instant messaging with typing indicators

## 🚀 Live Demo

**[View Live Demo →](https://ai-chatbot-c2.netlify.app)**

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure & Semantics |
| **Tailwind CSS** | Utility-first styling |
| **Vanilla JavaScript** | Core functionality |
| **Google Gemini API** | AI responses |
| **Emoji Mart** | Emoji picker integration |
| **Google Material Icons** | UI icons |

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamchandanchaudhary/ai-chatbot.git
   cd ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   This will watch for CSS changes and compile Tailwind CSS automatically.

4. **Open `index.html`** in your browser or use a live server extension.

## ⚙️ Configuration

### API Key Setup

The chatbot uses Google's Gemini API. To use your own API key:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Open `src/script.js`
3. Replace the existing API key:
   ```javascript
   const API_KEY = "YOUR_API_KEY_HERE";
   ```

> ⚠️ **Security Note:** For production, store API keys in environment variables or a backend server.

## 📁 Project Structure

```
ai-chatbot/
├── index.html              # Main HTML file
├── input.css               # Tailwind entry (+ the few unclassable rules)
├── output.css              # Compiled Tailwind CSS
├── tailwind.config.js      # Tailwind config: theme tokens, keyframes, animations
├── package.json            # Project dependencies
├── readme.md               # Documentation
└── src/
    ├── script.js           # Main JavaScript logic
    ├── chandanInfo.js      # Personal info module (optional)
    └── assets/             # Images & SVG icons
        ├── botavatar.svg
        ├── botface.svg
        └── c2logo*.png
```

## 🎨 Key Features Breakdown

### Chat Interface
- Elegant header with status indicator
- Smooth message animations
- Custom scrollbar styling
- Gradient backgrounds with glassmorphism

### Message Types
- **User Messages** — Purple gradient styling with right alignment
- **Bot Messages** — Gray gradient with bot avatar and left alignment
- **Image Attachments** — Rounded preview with shadow effects

### Interactive Elements
- Animated thinking indicator (bouncing dots)
- Emoji picker with smart positioning
- Image upload with preview and cancel option
- Send button with pulse animation

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Chandan Chaudhary**

- Portfolio: [www.chandanchaudhary.in](https://www.chandanchaudhary.in)
- GitHub: [@iamchandanchaudhary](https://github.com/iamchandanchaudhary)
- LinkedIn: [Chandan Chaudhary](https://www.linkedin.com/in/chandan--chaudhary/)
- YouTube: [@c2explains](https://www.youtube.com/@c2explains)

---

<p align="center">
  Made with ❤️ by Chandan Chaudhary
</p>
