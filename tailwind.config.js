/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#050510',
          secondary: '#0a0a1a',
          card: 'rgba(255,255,255,0.04)',
        },
        accent: {
          purple: '#7C3AED',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          pink: '#EC4899',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.3), transparent)',
        'card-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))',
        'battle-gradient': 'linear-gradient(135deg, #7C3AED, #06B6D4)',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(124,58,237,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
        'glow-amber': '0 0 30px rgba(245,158,11,0.5)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
