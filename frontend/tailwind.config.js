/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96B',
          dark: '#A07B2E',
          50: '#FDF8EC',
          100: '#FAF0D0',
          200: '#F4E0A1',
          300: '#EDD071',
          400: '#E8C96B',
          500: '#C9A84C',
          600: '#A07B2E',
          700: '#7A5C1E',
          800: '#553D10',
          900: '#301F04',
        },
        forest: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          dark: '#0D2618',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#2D6A4F',
          600: '#1B4332',
          700: '#0D2618',
          800: '#052010',
          900: '#021209',
        },
        obsidian: {
          DEFAULT: '#0A0A0A',
          50: '#1A1A1A',
          100: '#141414',
          200: '#0F0F0F',
          300: '#0A0A0A',
          400: '#050505',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96B 50%, #A07B2E 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1B4332 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 40px rgba(201, 168, 76, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
