/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "xl": "1440px",
      "lg": "1200px",
      "md": "768px",
      "sm": "480px",
    },
    extend: {
      screens: {
        "xl": "1440px",
        "lg": "1200px",
        "md": "768px",
        "sm": "480px",
      },
      colors: {
        "primary": "#f60f20",
        "secondary": "#1b206e"
      }
    },
  },
  plugins: [],
}