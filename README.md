# Math TTS - Text to Speech for Mathematical Expressions

Math TTS is a cross‑platform web application designed to convert pasted text and LaTeX math input into clear, spoken audio. Whether you're reviewing complex equations or simply want an auditory representation of mathematical expressions, this tool helps you listen to math in a way that’s easy to understand.

## Overview

Math TTS combines the power of custom LaTeX parsing with granular Text-to-Speech (TTS) controls. The app not only reads regular text but also translates LaTeX commands into speech-friendly language. With advanced playback controls—including play, pause, rewind, and sentence restart—you can adjust the pace of the output to match your listening needs.

## Features

- **LaTeX and Text Input:** Easily paste or type LaTeX and text into the intuitive input area.
- **Custom LaTeX Parser:** Transform LaTeX math expressions (such as `\frac` and `\bar`) into natural, spoken language.
- **Granular Playback Controls:** Control the TTS playback with play, pause, rewind (by 5 seconds), and sentence restart functionalities.
- **Real-Time Speed Adjustment:** Change the speech rate on the fly to suit your comprehension pace.
- **Custom Pause Settings:** Fine-tune how long the app pauses at periods, commas, newlines, and spaces—ideal for clear math narration.
- **Cross-Platform Compatibility:** Initially developed on Windows, the app is built to run seamlessly on macOS and iPadOS in modern browsers.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later) and npm installed on your machine.
- A modern web browser that supports the Web Speech API (e.g., Chrome, Safari).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Zahin-Mohammad-plug/math-tts.git
   cd math-tts
   ```

2. **Install Dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Then, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to start using Math TTS.

## Usage

1. **Enter Your Input:**  
   Paste or type your text and LaTeX expressions into the main text area.

2. **Customize Settings:**  
   Click on the settings icon to add custom LaTeX mappings or adjust the pause durations for different punctuation (periods, commas, newlines, spaces).

3. **Control Playback:**  
   Use the play, pause, rewind, and sentence restart buttons to manage the TTS. Adjust the speech speed with the slider to find the perfect pace.

4. **Listen and Learn:**  
   Math TTS will read your input aloud, breaking down complex equations into a clear, spoken format.

## Future Enhancements

- **Improved LaTeX Parsing:**  
  Enhance the parser to better handle nested and complex equations.
- **Persistent Customizations:**  
  Enable saving of custom mappings and settings across sessions.
- **Extended TTS Options:**  
  Add controls for voice selection, pitch, volume, and more.
- **Native Desktop Packaging:**  
  Explore using Electron for a native app experience on macOS.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or new features. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License.

## Contact

If you have questions or suggestions, feel free to open an issue on the [GitHub repository](https://github.com/Zahin-Mohammad-plug/math-tts)

---

Enjoy Math TTS, and happy listening!
```
