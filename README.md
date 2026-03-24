# ✨ CalcPro

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MathJS](https://img.shields.io/badge/MathJS-13.0-AD1457?logo=mathjs&logoColor=white)](https://mathjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)

> A modern, professional scientific calculator with history, themes, and robust calculation logic.

![CalcPro Demo](./public/assets/demo.webp)

🔗 **Live Demo:** https://modern-calculator-wihz.vercel.app  
💻 **Source Code:** https://github.com/KaavyaGala546/CalcPro

---

## 🚀 Overview

**CalcPro** is a sleek, high-performance calculator application. It combines a beautiful, "glassmorphism" inspired UI with powerful scientific features and a reliable computation engine.

---

## 🌟 Key Features

- ⚡ **Accurate Calculations**: Powered by [MathJS](https://mathjs.org/) for high-precision results.
- ⌨️ **Full Keyboard Support**: Fast input handling for all numeric and arithmetic keys.
- ⚗️ **Scientific Mode**: Advanced functions including `sin`, `cos`, `tan`, `log10`, `sqrt`, and more.
- 📏 **Unit Converter**: Integrated real-time conversion for Length, Weight, and Temperature.
- 💱 **Currency Converter**: Real-time exchange rates for 100+ global currencies.
- 📜 **Calculation History**: Automatically saves and persists your last 20 calculations.
- 🌓 **Dark/Light Mode**: Beautifully designed themes with persistence.
- 📱 **Fully Responsive**: Optimized with micro-interactions and touch feedback.
- 🔒 **Security Hardened**: Safe expression parsing with zero `eval()`.

---

## 🛠 Tech Stack

- **Vite** – Fast build tool and dev server
- **MathJS** – Powerful mathematical logic
- **HTML5** – Semantic structure
- **CSS3** – Modern "glass" styling & layout
- **JavaScript (ES6+)** – Modular logic

---

## 🔍 Technical Implementation

### 🧠 Robust Computation
Unlike standard calculators that use the dangerous `eval()` function, **CalcPro** utilizes the `mathjs` expression parser. This not only prevents security vulnerabilities like XSS but also allows for more complex string-based mathematical expressions.

### 💾 State Persistence
To provide a seamless user experience, we use the **Web Storage API (LocalStorage)** to:
1.  **Remember Theme Preference**: Your choice of Dark or Light mode is saved.
2.  **Maintain History**: Your past calculations are stored locally and reloaded every time you visit.

### 🎨 Design System
The UI follows **Glassmorphism** principles, using CSS backdrops, subtle gradients, and CSS variables to handle theme transitions smoothly without any page reloads.

---

## 📁 Project Structure

CalcPro/
├── public/           # Static assets (fonts, demo)
│   └── assets/
├── src/              # Source code
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── modules/      # ES Modules (Logic split)
│       └── script.js     # Entry point
├── index.html            # Root entry
├── package.json          # Dependencies
└── README.md

---

## ⚙️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KaavyaGala546/CalcPro.git
   cd CalcPro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🧠 What This Project Shows

- Expertise in **Modern JavaScript** and library integration.
- Precision in **UI/UX Design** and theme implementation.
- Focus on **Application Security** and best practices.
- Professional **State Persistence** using web APIs.

---

## 👩‍💻 Author

**Kaavya Gala**  
GitHub: [KaavyaGala546](https://github.com/KaavyaGala546)

---

## ⭐ Support

If you found this project useful, give it a **star** ⭐ — it helps!

---

## 📄 License

This project is licensed under the MIT License.

