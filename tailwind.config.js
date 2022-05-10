module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#121212",
          80: "#161616",
          60: "#1A1A1A"
        },
        light: {
          100: "#FCFCFC",
          80: "#CECECE",
          60: "#A7A7A7",
          40: "#969696"
        },
        green: "#82C558"
      }
    },
  },
  plugins: [],
}

