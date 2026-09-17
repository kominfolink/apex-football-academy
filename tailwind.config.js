/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pitch: {
          dark: '#070B09',
          surface: '#0D1410',
          card: '#121C16',
          border: '#1A2920',
          hover: '#22362B',
        },
        neon: {
          green: '#00FF87',
          lime: '#60EFA0',
          glow: '#00FF6633',
        },
        gold: {
          trophy: '#FFD700',
          accent: '#FFA500',
          light: '#FFEAA7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Impact', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 255, 135, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 255, 135, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
