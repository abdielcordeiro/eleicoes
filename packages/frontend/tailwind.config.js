/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          slate: '#F8FAFC',
          warm: '#FAF8F5',
        },
        pastel: {
          blue: '#E0F2FE',
          sage: '#DCFCE7',
          lavender: '#F3E8FF',
          sand: '#FEF3C7',
          rose: '#FFE4E6',
        },
        vibrant: {
          orange: '#FF6B00',
          'orange-hover': '#E05E00',
          'orange-light': '#FFF0E5',
          'orange-500': '#F97316',
        },
        slate: {
          850: '#151F32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'highlight': '0 0 0 2px #FF6B00',
      }
    },
  },
  plugins: [],
}
