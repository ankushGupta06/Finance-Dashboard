/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  // Enable class-based dark mode
  darkMode: 'class',
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using the src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        // You can define custom brand colors here if needed
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      // Adding custom utilities for your 3D Card Flip
      perspective: {
        '1000': '1000px',
      },
    },
  },
  
  plugins: [
    // Custom plugin to handle the 3D card flip logic
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
      });
    }),
    // Official Tailwind animations plugin for the 'animate-in' classes in your Header
    require("tailwindcss-animate"),
  ],
};